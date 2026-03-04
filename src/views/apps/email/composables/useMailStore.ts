import { ref, computed } from 'vue'
import type { Email, Folder } from '../types'
import { MOCK_EMAILS, FOLDERS, LABELS, ITEMS_PER_PAGE } from '../constants'

function cloneEmails(): Email[] {
  return MOCK_EMAILS.map(e => ({ ...e, timestamp: new Date(e.timestamp) }))
}

export function useMailStore() {
  const emails       = ref<Email[]>(cloneEmails())
  const loading      = ref(false)
  const currentFolder = ref('inbox')
  const currentLabel  = ref<string | null>(null)
  const selectedEmail = ref<Email | null>(null)
  const selectedIds   = ref<Set<string>>(new Set())
  const searchQuery   = ref('')
  const currentPage   = ref(1)

  // ── Filtered list ──────────────────────────────────────────────────────────
  const folderEmails = computed<Email[]>(() => {
    if (currentLabel.value) {
      return emails.value.filter(e => !e.deleted && e.labels.includes(currentLabel.value!))
    }
    switch (currentFolder.value) {
      case 'inbox':   return emails.value.filter(e => e.folder === 'inbox'  && !e.archived && !e.deleted)
      case 'starred': return emails.value.filter(e => e.starred && !e.deleted)
      case 'sent':    return emails.value.filter(e => e.folder === 'sent'   && !e.deleted)
      case 'drafts':  return emails.value.filter(e => e.draft  && !e.deleted)
      case 'spam':    return emails.value.filter(e => e.folder === 'spam'   && !e.deleted)
      case 'trash':   return emails.value.filter(e => e.deleted)
      default:        return emails.value.filter(e => e.folder === currentFolder.value && !e.deleted)
    }
  })

  const filteredEmails = computed<Email[]>(() => {
    let list = folderEmails.value
    const q = searchQuery.value.trim().toLowerCase()
    if (q) {
      list = list.filter(e =>
        e.subject.toLowerCase().includes(q) ||
        e.from.name.toLowerCase().includes(q) ||
        e.from.email.toLowerCase().includes(q) ||
        e.body.toLowerCase().includes(q)
      )
    }
    return list.slice().sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  })

  const paginatedEmails = computed<Email[]>(() => {
    const start = (currentPage.value - 1) * ITEMS_PER_PAGE
    return filteredEmails.value.slice(start, start + ITEMS_PER_PAGE)
  })

  const totalPages = computed(() => Math.ceil(filteredEmails.value.length / ITEMS_PER_PAGE))

  // ── Folders with live counts ───────────────────────────────────────────────
  const foldersWithCount = computed<Folder[]>(() =>
    FOLDERS.map(f => {
      const list =
        f.id === 'inbox'   ? emails.value.filter(e => e.folder === 'inbox'  && !e.archived && !e.deleted) :
        f.id === 'starred' ? emails.value.filter(e => e.starred && !e.deleted) :
        f.id === 'sent'    ? emails.value.filter(e => e.folder === 'sent'   && !e.deleted) :
        f.id === 'drafts'  ? emails.value.filter(e => e.draft  && !e.deleted) :
        f.id === 'spam'    ? emails.value.filter(e => e.folder === 'spam'   && !e.deleted) :
        f.id === 'trash'   ? emails.value.filter(e => e.deleted) :
        []
      return {
        ...f,
        total:  list.length,
        unread: list.filter(e => !e.read).length,
      }
    })
  )

  const labels = computed(() => LABELS)

  // ── Getters ────────────────────────────────────────────────────────────────
  const allSelected = computed(() =>
    paginatedEmails.value.length > 0 &&
    paginatedEmails.value.every(e => selectedIds.value.has(e.id))
  )

  // ── Actions ────────────────────────────────────────────────────────────────
  function selectFolder(id: string) {
    currentFolder.value = id
    currentLabel.value  = null
    selectedEmail.value = null
    selectedIds.value   = new Set()
    currentPage.value   = 1
    searchQuery.value   = ''
  }

  function selectLabel(id: string) {
    currentLabel.value  = id
    selectedEmail.value = null
    selectedIds.value   = new Set()
    currentPage.value   = 1
  }

  function openEmail(email: Email) {
    selectedEmail.value = email
    if (!email.read) markRead(email.id, true)
  }

  function closeEmail() {
    selectedEmail.value = null
  }

  function toggleCheck(id: string) {
    const s = new Set(selectedIds.value)
    s.has(id) ? s.delete(id) : s.add(id)
    selectedIds.value = s
  }

  function checkAll() {
    if (allSelected.value) {
      selectedIds.value = new Set()
    } else {
      selectedIds.value = new Set(paginatedEmails.value.map(e => e.id))
    }
  }

  function clearSelection() {
    selectedIds.value = new Set()
  }

  function markRead(id: string, read: boolean) {
    const e = emails.value.find(e => e.id === id)
    if (e) e.read = read
  }

  function toggleStar(id: string) {
    const e = emails.value.find(e => e.id === id)
    if (e) e.starred = !e.starred
  }

  function moveToTrash(id: string) {
    const e = emails.value.find(e => e.id === id)
    if (!e) return
    if (e.deleted) {
      emails.value = emails.value.filter(x => x.id !== id)
    } else {
      e.deleted = true
      e.folder  = 'trash'
    }
    if (selectedEmail.value?.id === id) selectedEmail.value = null
  }

  function archive(id: string) {
    const e = emails.value.find(e => e.id === id)
    if (e) { e.archived = true; e.folder = 'archive' }
    if (selectedEmail.value?.id === id) selectedEmail.value = null
  }

  function bulkTrash()   { selectedIds.value.forEach(id => moveToTrash(id)); clearSelection() }
  function bulkArchive() { selectedIds.value.forEach(id => archive(id));     clearSelection() }
  function bulkRead(read: boolean) { selectedIds.value.forEach(id => markRead(id, read)); clearSelection() }

  function search(q: string) {
    searchQuery.value = q
    currentPage.value = 1
  }

  function setPage(p: number) {
    currentPage.value = p
  }

  return {
    // state
    loading, currentFolder, currentLabel, selectedEmail, selectedIds,
    searchQuery, currentPage,
    // computed
    filteredEmails, paginatedEmails, totalPages, foldersWithCount, labels, allSelected,
    // actions
    selectFolder, selectLabel, openEmail, closeEmail,
    toggleCheck, checkAll, clearSelection,
    markRead, toggleStar, moveToTrash, archive,
    bulkTrash, bulkArchive, bulkRead,
    search, setPage,
  }
}
