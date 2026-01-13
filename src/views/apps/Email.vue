<template>
  <div class="email-app">
    <div class="email-layout">
      <aside class="email-sidebar">
        <div class="sidebar-top">
          <n-button type="primary" block @click="openCompose">Compose</n-button>
          <n-input
            v-model:value="searchQuery"
            placeholder="Search mail"
            clearable
            class="search-input"
          />
        </div>

        <div class="sidebar-section">
          <button
            v-for="item in folders"
            :key="item.key"
            class="nav-item"
            :class="{ active: activeFolder === item.key }"
            type="button"
            @click="activeFolder = item.key"
          >
            <span class="nav-label">{{ item.label }}</span>
            <span v-if="item.count" class="nav-count">{{ item.count }}</span>
          </button>
        </div>

        <div class="sidebar-section">
          <div class="section-title">Labels</div>
          <div
            v-for="label in labels"
            :key="label.key"
            class="label-item"
          >
            <n-checkbox
              :checked="selectedLabels.has(label.key)"
              @update:checked="setLabelChecked(label.key, $event)"
            >
              <span class="label-row">
                <span class="label-dot" :style="{ background: label.color }"></span>
                <span class="nav-label">{{ label.label }}</span>
              </span>
            </n-checkbox>
          </div>
        </div>
      </aside>

      <main class="email-main">
        <div class="email-list">
          <div class="list-header">
            <div class="list-title">{{ activeFolderTitle }}</div>
            <div class="list-meta">{{ filteredEmails.length }} mails</div>
          </div>

          <div class="list-body">
            <button
              v-for="mail in filteredEmails"
              :key="mail.id"
              class="mail-item"
              :class="{ active: selectedEmail?.id === mail.id, unread: !mail.read }"
              type="button"
              @click="selectEmail(mail)"
            >
              <div class="mail-top">
                <div class="mail-from">{{ mail.from }}</div>
                <div class="mail-time">{{ formatTime(mail.date) }}</div>
              </div>
              <div class="mail-subject">{{ mail.subject }}</div>
              <div class="mail-preview">{{ mail.preview }}</div>
              <div v-if="mail.labels.length" class="mail-labels">
                <span
                  v-for="lk in mail.labels"
                  :key="lk"
                  class="mail-label"
                  :style="{ background: labelColor(lk) }"
                >
                  {{ labelTitle(lk) }}
                </span>
              </div>
            </button>

            <div v-if="filteredEmails.length === 0" class="empty-list">
              <div class="empty-title">No emails found</div>
              <div class="empty-text">Try changing folder, labels, or search query.</div>
            </div>
          </div>
        </div>

        <section class="email-preview" :class="{ empty: !selectedEmail }">
          <div v-if="!selectedEmail" class="preview-empty">
            <div class="empty-title">Select an email</div>
            <div class="empty-text">Choose an email from the list to read it here.</div>
          </div>

          <div v-else class="preview-content">
            <div class="preview-header">
              <div class="preview-subject">{{ selectedEmail.subject }}</div>
              <div class="preview-actions">
                <n-button size="small" @click="markUnread">Mark unread</n-button>
                <n-button size="small" @click="deleteMail">Trash</n-button>
              </div>
            </div>

            <div class="preview-meta">
              <div class="meta-row">
                <span class="meta-key">From</span>
                <span class="meta-val">{{ selectedEmail.from }}</span>
              </div>
              <div class="meta-row">
                <span class="meta-key">To</span>
                <span class="meta-val">{{ selectedEmail.to }}</span>
              </div>
              <div class="meta-row">
                <span class="meta-key">Date</span>
                <span class="meta-val">{{ formatDateTime(selectedEmail.date) }}</span>
              </div>
            </div>

            <div class="preview-body">
              <div class="preview-text">{{ selectedEmail.body }}</div>
            </div>
          </div>
        </section>
      </main>
    </div>

    <n-modal v-model:show="composeOpen" preset="card" title="Compose" :style="{ width: '720px', maxWidth: '95vw' }">
      <div class="compose-form">
        <n-input v-model:value="compose.to" placeholder="To" />
        <n-input v-model:value="compose.subject" placeholder="Subject" />
        <n-input v-model:value="compose.body" type="textarea" placeholder="Message" :autosize="{ minRows: 8, maxRows: 14 }" />
        <div class="compose-actions">
          <n-button type="primary" @click="sendCompose">Send</n-button>
          <n-button @click="composeOpen = false">Cancel</n-button>
        </div>
      </div>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

type FolderKey = 'inbox' | 'sent' | 'draft' | 'spam' | 'trash'

type LabelKey = 'personal' | 'company' | 'important' | 'private'

type Email = {
  id: number
  folder: FolderKey
  from: string
  to: string
  subject: string
  preview: string
  body: string
  date: number
  read: boolean
  labels: LabelKey[]
}

const folders = [
  { key: 'inbox' as const, label: 'Inbox', count: 4 },
  { key: 'sent' as const, label: 'Sent', count: 0 },
  { key: 'draft' as const, label: 'Draft', count: 2 },
  { key: 'spam' as const, label: 'Spam', count: 1 },
  { key: 'trash' as const, label: 'Trash', count: 0 }
]

const labels = [
  { key: 'personal' as const, label: 'Personal', color: '#10b981' },
  { key: 'company' as const, label: 'Company', color: '#3b82f6' },
  { key: 'important' as const, label: 'Important', color: '#f59e0b' },
  { key: 'private' as const, label: 'Private', color: '#ec4899' }
]

const emailSeed: Email[] = [
  {
    id: 1,
    folder: 'inbox',
    from: 'HR Team',
    to: 'you@company.com',
    subject: 'Welcome to the team',
    preview: 'Here are the next steps for your onboarding...',
    body: 'Welcome to the team!\n\nHere are the next steps for your onboarding:\n1) Fill out the forms\n2) Setup your workstation\n3) Join the intro call\n\nThanks!',
    date: Date.now() - 1000 * 60 * 25,
    read: false,
    labels: ['company', 'important']
  },
  {
    id: 2,
    folder: 'inbox',
    from: 'Personal Bank',
    to: 'you@company.com',
    subject: 'Monthly statement ready',
    preview: 'Your monthly statement is available to download.',
    body: 'Your monthly statement is ready.\n\nPlease login to download it securely.',
    date: Date.now() - 1000 * 60 * 60 * 3,
    read: true,
    labels: ['personal', 'private']
  },
  {
    id: 3,
    folder: 'draft',
    from: 'you@company.com',
    to: 'team@company.com',
    subject: 'Sprint update (draft)',
    preview: 'Draft: today we finished the UI polish...',
    body: 'Draft message.\n\nToday we finished the UI polish and fixed remaining issues.',
    date: Date.now() - 1000 * 60 * 60 * 20,
    read: true,
    labels: ['company']
  },
  {
    id: 4,
    folder: 'inbox',
    from: 'Security',
    to: 'you@company.com',
    subject: 'Password reset required',
    preview: 'Your password will expire soon. Please reset it.',
    body: 'Your password will expire soon.\n\nPlease reset it today to avoid losing access.',
    date: Date.now() - 1000 * 60 * 60 * 6,
    read: false,
    labels: ['important']
  },
  {
    id: 5,
    folder: 'spam',
    from: 'Lottery Winner',
    to: 'you@company.com',
    subject: 'You won $10,000,000',
    preview: 'Claim your prize now...',
    body: 'This is spam.',
    date: Date.now() - 1000 * 60 * 60 * 30,
    read: false,
    labels: []
  }
]

const activeFolder = ref<FolderKey>('inbox')
const searchQuery = ref('')
const selectedLabels = ref(new Set<LabelKey>())
const emails = ref<Email[]>([...emailSeed])
const selectedEmail = ref<Email | null>(emails.value.find(e => e.folder === 'inbox') ?? null)

const activeFolderTitle = computed(() => {
  const item = folders.find(f => f.key === activeFolder.value)
  return item?.label ?? 'Inbox'
})

const filteredEmails = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  const labelsFilter = selectedLabels.value

  return emails.value
    .filter(m => m.folder === activeFolder.value)
    .filter(m => {
      if (!q) return true
      return (
        m.from.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.preview.toLowerCase().includes(q)
      )
    })
    .filter(m => {
      if (labelsFilter.size === 0) return true
      return m.labels.some(l => labelsFilter.has(l))
    })
    .sort((a, b) => b.date - a.date)
})

const selectEmail = (mail: Email) => {
  selectedEmail.value = mail
  mail.read = true
}

const setLabelChecked = (key: LabelKey, checked: boolean) => {
  const next = new Set(selectedLabels.value)
  if (checked) next.add(key)
  else next.delete(key)
  selectedLabels.value = next
}

const labelTitle = (key: LabelKey) => {
  return labels.find(l => l.key === key)?.label ?? key
}

const labelColor = (key: LabelKey) => {
  return labels.find(l => l.key === key)?.color ?? 'var(--border-color)'
}

const formatTime = (timestamp: number) => {
  const d = new Date(timestamp)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const formatDateTime = (timestamp: number) => {
  const d = new Date(timestamp)
  return d.toLocaleString()
}

const composeOpen = ref(false)
const compose = reactive({
  to: '',
  subject: '',
  body: ''
})

const openCompose = () => {
  compose.to = ''
  compose.subject = ''
  compose.body = ''
  composeOpen.value = true
}

const sendCompose = () => {
  if (!compose.to.trim() || !compose.subject.trim()) return

  const newMail: Email = {
    id: Date.now(),
    folder: 'sent',
    from: 'you@company.com',
    to: compose.to.trim(),
    subject: compose.subject.trim(),
    preview: compose.body.trim().slice(0, 60) || '—',
    body: compose.body.trim() || '—',
    date: Date.now(),
    read: true,
    labels: []
  }

  emails.value.unshift(newMail)
  activeFolder.value = 'sent'
  selectedEmail.value = newMail
  composeOpen.value = false
}

const markUnread = () => {
  if (!selectedEmail.value) return
  selectedEmail.value.read = false
}

const deleteMail = () => {
  if (!selectedEmail.value) return
  selectedEmail.value.folder = 'trash'
  selectedEmail.value = filteredEmails.value[0] ?? null
}
</script>

<style scoped>
.email-app {
  height: 100vh;
  background: var(--bg-secondary);
  font-family: var(--font-primary);
}

.email-layout {
  height: 100%;
  display: flex;
  padding: 16px;
  gap: 16px;
}

.email-sidebar {
  width: 280px;
  flex-shrink: 0;
  background: var(--bg-primary);
  border-radius: 14px;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
}

.shadow-theme .email-sidebar {
  border: none;
  box-shadow: var(--shadow-md);
}

.bordered-theme .email-sidebar {
  box-shadow: none;
}

.sidebar-top {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.search-input {
  width: 100%;
}

.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.section-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-top: 6px;
}

.nav-item,
.label-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--text-primary);
  font-family: inherit;
  cursor: pointer;
  text-align: left;
}

.nav-item:hover,
.label-item:hover {
  background: var(--bg-tertiary);
}

.nav-item.active {
  background: rgba(99, 102, 241, 0.12);
  border-color: rgba(99, 102, 241, 0.2);
}

.nav-label {
  font-weight: 600;
}

.nav-count {
  font-size: 12px;
  color: var(--text-secondary);
}

.label-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  flex-shrink: 0;
}

.label-row {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.label-item :deep(.n-checkbox) {
  width: 100%;
}

.label-item :deep(.n-checkbox__label) {
  font-family: inherit;
}

.selected-indicator {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--primary-color);
  flex-shrink: 0;
}

.email-main {
  flex: 1;
  display: flex;
  gap: 16px;
  overflow: hidden;
}

.email-list {
  width: 380px;
  flex-shrink: 0;
  background: var(--bg-primary);
  border-radius: 14px;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.shadow-theme .email-list {
  border: none;
  box-shadow: var(--shadow-md);
}

.bordered-theme .email-list {
  box-shadow: none;
}

.list-header {
  padding: 14px 16px;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-primary);
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.list-title {
  font-size: 16px;
  font-weight: 800;
  color: var(--text-primary);
}

.list-meta {
  font-size: 12px;
  color: var(--text-secondary);
}

.list-body {
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.mail-item {
  border: none;
  background: transparent;
  padding: 12px 16px;
  text-align: left;
  cursor: pointer;
  border-bottom: 1px solid var(--border-color);
}

.mail-item:hover {
  background: var(--bg-tertiary);
}

.mail-item.active {
  background: rgba(99, 102, 241, 0.10);
}

.mail-item.unread .mail-from,
.mail-item.unread .mail-subject {
  font-weight: 800;
}

.mail-top {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.mail-from {
  color: var(--text-primary);
  font-weight: 700;
}

.mail-time {
  font-size: 12px;
  color: var(--text-secondary);
}

.mail-subject {
  margin-top: 4px;
  color: var(--text-primary);
}

.mail-preview {
  margin-top: 2px;
  font-size: 13px;
  color: var(--text-secondary);
  overflow: hidden;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.mail-labels {
  margin-top: 8px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.mail-label {
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 999px;
  color: #ffffff;
}

.empty-list {
  padding: 28px 18px;
}

.empty-title {
  font-weight: 800;
  color: var(--text-primary);
}

.empty-text {
  margin-top: 6px;
  color: var(--text-secondary);
  font-size: 13px;
}

.email-preview {
  flex: 1;
  background: var(--bg-primary);
  border-radius: 14px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  display: flex;
}

.shadow-theme .email-preview {
  border: none;
  box-shadow: var(--shadow-md);
}

.bordered-theme .email-preview {
  box-shadow: none;
}

.preview-empty {
  margin: auto;
  padding: 16px;
  text-align: center;
  max-width: 380px;
}

.preview-content {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.preview-header {
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.preview-subject {
  font-size: 18px;
  font-weight: 900;
  color: var(--text-primary);
}

.preview-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.preview-meta {
  padding: 14px 16px;
  border-bottom: 1px solid var(--border-color);
  display: grid;
  gap: 6px;
}

.meta-row {
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 10px;
  align-items: center;
}

.meta-key {
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 700;
}

.meta-val {
  color: var(--text-primary);
  font-weight: 600;
}

.preview-body {
  padding: 16px;
  overflow: auto;
}

.preview-text {
  white-space: pre-wrap;
  color: var(--text-primary);
  line-height: 1.6;
}

.compose-form {
  display: grid;
  gap: 12px;
}

.compose-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

@media (max-width: 1024px) {
  .email-list {
    width: 340px;
  }
}

@media (max-width: 768px) {
  .email-app {
    height: calc(100vh - 8px);
  }

  .email-layout {
    flex-direction: column;
    padding: 12px;
    gap: 12px;
  }

  .email-sidebar {
    width: 100%;
  }

  .email-main {
    flex-direction: column;
    overflow: auto;
  }

  .email-list {
    width: 100%;
  }

  .email-preview {
    min-height: 320px;
  }
}
</style>
