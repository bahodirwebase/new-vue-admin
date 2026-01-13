<template>
  <div class="email-app">
    <div class="email-layout">
      <n-card class="email-sidebar" :bordered="false">
        <div class="sidebar-top">
          <n-button type="primary" block @click="openCompose">
            <template #icon>
              <n-icon :component="CreateOutline" />
            </template>
            Compose
          </n-button>
          <n-input
            v-model:value="searchQuery"
            placeholder="Search mail"
            clearable
            class="search-input"
          >
            <template #prefix>
              <n-icon :component="SearchOutline" />
            </template>
          </n-input>
        </div>

        <div class="sidebar-section">
          <n-menu
            :options="menuOptions"
            :value="activeFolder"
            @update:value="handleMenuChange"
            :collapsed="false"
            :collapsed-width="64"
            :collapsed-icon-size="22"
          />
        </div>

        <div class="sidebar-section">
          <div class="section-title">Labels</div>
          <n-space vertical size="8">
            <n-checkbox
              v-for="label in labels"
              :key="label.key"
              :checked="selectedLabels.has(label.key)"
              @update:checked="setLabelChecked(label.key, $event)"
              size="small"
            >
              <template #default>
                <n-space align="center" :size="8">
                  <n-avatar :size="8" :style="{ background: label.color }" />
                  <span class="nav-label">{{ label.label }}</span>
                </n-space>
              </template>
            </n-checkbox>
          </n-space>
        </div>
      </n-card>

      <main class="email-main">
        <n-card class="email-list" :bordered="false">
          <template #header>
            <div class="list-header">
              <div class="list-title">{{ activeFolderTitle }}</div>
              <div class="list-meta">{{ filteredEmails.length }} mails</div>
            </div>
          </template>

          <div class="list-body">
            <n-virtual-list
              :items="filteredEmails"
              :item-size="120"
              :height="600"
              itemResizable
            >
              <template #default="{ item }">
                <n-card
                  :class="['mail-item', { active: selectedEmail?.id === item.id, unread: !item.read }]"
                  hoverable
                  @click="selectEmail(item)"
                  size="small"
                >
                  <div class="mail-top">
                    <div class="mail-from">
                      <n-avatar :size="24" round>
                        {{ item.from.charAt(0) }}
                      </n-avatar>
                      <span>{{ item.from }}</span>
                    </div>
                    <div class="mail-time">{{ formatTime(item.date) }}</div>
                  </div>
                  <div class="mail-subject">{{ item.subject }}</div>
                  <div class="mail-preview">{{ item.preview }}</div>
                  <div v-if="item.labels.length" class="mail-labels">
                    <n-tag
                      v-for="lk in item.labels"
                      :key="lk"
                      size="small"
                      :style="{ background: labelColor(lk), color: 'white' }"
                    >
                      {{ labelTitle(lk) }}
                    </n-tag>
                  </div>
                </n-card>
              </template>
            </n-virtual-list>

            <n-empty v-if="filteredEmails.length === 0" description="No emails found">
              <template #extra>
                <n-text depth="3">Try changing folder, labels, or search query.</n-text>
              </template>
            </n-empty>
          </div>
        </n-card>

        <n-card class="email-preview" :class="{ empty: !selectedEmail }" :bordered="false">
          <n-empty v-if="!selectedEmail" description="Select an email">
            <template #extra>
              <n-text depth="3">Choose an email from the list to read it here.</n-text>
            </template>
          </n-empty>

          <div v-else class="preview-content">
            <div class="preview-header">
              <div class="preview-subject">{{ selectedEmail.subject }}</div>
              <n-space>
                <n-button size="small" @click="markUnread">
                  <template #icon>
                    <n-icon :component="MailUnreadOutline" />
                  </template>
                  Mark unread
                </n-button>
                <n-button size="small" type="error" @click="deleteMail">
                  <template #icon>
                    <n-icon :component="TrashOutline" />
                  </template>
                  Trash
                </n-button>
              </n-space>
            </div>

            <n-descriptions :column="1" bordered size="small">
              <n-descriptions-item label="From">
                <n-space align="center">
                  <n-avatar :size="20" round>
                    {{ selectedEmail.from.charAt(0) }}
                  </n-avatar>
                  <span>{{ selectedEmail.from }}</span>
                </n-space>
              </n-descriptions-item>
              <n-descriptions-item label="To">{{ selectedEmail.to }}</n-descriptions-item>
              <n-descriptions-item label="Date">{{ formatDateTime(selectedEmail.date) }}</n-descriptions-item>
            </n-descriptions>

            <div class="preview-body">
              <n-scrollbar style="max-height: 400px;">
                <div class="preview-text">{{ selectedEmail.body }}</div>
              </n-scrollbar>
            </div>
          </div>
        </n-card>
      </main>
    </div>

    <n-modal v-model:show="composeOpen" preset="card" title="Compose" :style="{ width: '720px', maxWidth: '95vw' }">
      <div class="compose-form">
        <n-form>
          <n-form-item :show-label="false">
            <n-input v-model:value="compose.to" placeholder="To" clearable>
              <template #prefix>
                <n-icon :component="PersonOutline" />
              </template>
            </n-input>
          </n-form-item>
          <n-form-item :show-label="false">
            <n-input v-model:value="compose.subject" placeholder="Subject" clearable>
              <template #prefix>
                <n-icon :component="DocumentTextOutline" />
              </template>
            </n-input>
          </n-form-item>
          <n-form-item :show-label="false">
            <n-input
              v-model:value="compose.body"
              type="textarea"
              placeholder="Message"
              :autosize="{ minRows: 8, maxRows: 14 }"
            />
          </n-form-item>
        </n-form>
        <div class="compose-actions">
          <n-space>
            <n-button type="primary" @click="sendCompose">
              <template #icon>
                <n-icon :component="SendOutline" />
              </template>
              Send
            </n-button>
            <n-button @click="composeOpen = false">Cancel</n-button>
          </n-space>
        </div>
      </div>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, h } from 'vue'
import { useMessage } from 'naive-ui'
import { 
  CreateOutline,
  SearchOutline,
  MailOutline,
  SendOutline,
  DocumentTextOutline,
  PersonOutline,
  TrashOutline,
  MailUnreadOutline,
  PaperPlaneOutline,
  DocumentOutline,
  WarningOutline,
  TrashBinOutline
} from '@vicons/ionicons5'

const message = useMessage()

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

const menuOptions = computed(() => [
  {
    label: 'Inbox',
    key: 'inbox',
    icon: () => h(MailOutline),
    props: {
      badge: folders.find(f => f.key === 'inbox')?.count || 0
    }
  },
  {
    label: 'Sent',
    key: 'sent',
    icon: () => h(PaperPlaneOutline),
    props: {
      badge: folders.find(f => f.key === 'sent')?.count || 0
    }
  },
  {
    label: 'Draft',
    key: 'draft',
    icon: () => h(DocumentOutline),
    props: {
      badge: folders.find(f => f.key === 'draft')?.count || 0
    }
  },
  {
    label: 'Spam',
    key: 'spam',
    icon: () => h(WarningOutline),
    props: {
      badge: folders.find(f => f.key === 'spam')?.count || 0
    }
  },
  {
    label: 'Trash',
    key: 'trash',
    icon: () => h(TrashBinOutline),
    props: {
      badge: folders.find(f => f.key === 'trash')?.count || 0
    }
  }
])

const handleMenuChange = (key: string) => {
  activeFolder.value = key as FolderKey
}

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
  if (!compose.to.trim() || !compose.subject.trim()) {
    message.warning('Please fill in recipient and subject')
    return
  }

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
  message.success('Email sent successfully (demo)')
}

const markUnread = () => {
  if (!selectedEmail.value) return
  selectedEmail.value.read = false
  message.info('Email marked as unread')
}

const deleteMail = () => {
  if (!selectedEmail.value) return
  selectedEmail.value.folder = 'trash'
  message.warning('Email moved to trash')
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
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  gap: 8px;
}

.section-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-top: 8px;
}

.nav-label {
  font-weight: 600;
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
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.list-header {
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
  text-align: left;
  cursor: pointer;
  border-bottom: 1px solid var(--border-color);
  transition: all 0.2s ease;
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
  align-items: center;
}

.mail-from {
  display: flex;
  align-items: center;
  gap: 8px;
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

.email-preview {
  flex: 1;
  overflow: hidden;
  display: flex;
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
