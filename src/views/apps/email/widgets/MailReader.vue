<template>
  <!-- Empty / placeholder state -->
  <div v-if="!email" class="reader-placeholder">
    <n-icon :component="MailOutline" size="64" class="ph-icon" />
    <p class="ph-title">Select a message</p>
    <p class="ph-sub">Choose an email from the list to read it here</p>
  </div>

  <!-- Email detail -->
  <div v-else class="mail-reader">
    <!-- Toolbar -->
    <div class="reader-toolbar">
      <div class="toolbar-left">
        <n-tooltip trigger="hover" placement="bottom">
          <template #trigger>
            <n-button text size="small" @click="$emit('back')">
              <template #icon><n-icon :component="ArrowBackOutline" size="18" /></template>
            </n-button>
          </template>
          Back to list
        </n-tooltip>
      </div>
      <div class="toolbar-actions">
        <n-tooltip trigger="hover" placement="bottom">
          <template #trigger>
            <n-button text size="small" @click="$emit('archive', email.id)">
              <template #icon><n-icon :component="ArchiveOutline" size="18" /></template>
            </n-button>
          </template>
          Archive
        </n-tooltip>
        <n-tooltip trigger="hover" placement="bottom">
          <template #trigger>
            <n-button text size="small" @click="$emit('toggle-star', email.id)">
              <template #icon>
                <n-icon :component="email.starred ? Star : StarOutline" size="18"
                  :style="{ color: email.starred ? '#f59e0b' : undefined }" />
              </template>
            </n-button>
          </template>
          {{ email.starred ? 'Unstar' : 'Star' }}
        </n-tooltip>
        <n-tooltip trigger="hover" placement="bottom">
          <template #trigger>
            <n-button text size="small" @click="$emit('mark-read', email.id, !email.read)">
              <template #icon>
                <n-icon :component="email.read ? MailUnreadOutline : MailOpenOutline" size="18" />
              </template>
            </n-button>
          </template>
          Mark as {{ email.read ? 'unread' : 'read' }}
        </n-tooltip>
        <n-tooltip trigger="hover" placement="bottom">
          <template #trigger>
            <n-button text size="small" @click="$emit('delete', email.id)">
              <template #icon><n-icon :component="TrashOutline" size="18" /></template>
            </n-button>
          </template>
          Delete
        </n-tooltip>

        <n-dropdown :options="moreOptions" placement="bottom-end" @select="onMoreAction">
          <n-button text size="small">
            <template #icon><n-icon :component="EllipsisHorizontalOutline" size="18" /></template>
          </n-button>
        </n-dropdown>
      </div>
    </div>

    <!-- Scrollable body -->
    <div class="reader-body">
      <!-- Subject -->
      <div class="reader-subject-row">
        <h1 class="reader-subject">{{ email.subject }}</h1>
        <span v-if="email.priority === 'high'" class="priority-chip high">High</span>
        <span v-if="email.priority === 'low'"  class="priority-chip low">Low</span>
      </div>

      <!-- Labels -->
      <div v-if="email.labels.length" class="reader-labels">
        <span
          v-for="lid in email.labels"
          :key="lid"
          class="reader-label"
          :style="{ background: labelColor(lid) + '22', color: labelColor(lid) }"
        >{{ labelName(lid) }}</span>
      </div>

      <!-- Sender card -->
      <div class="sender-card">
        <n-avatar
          round
          :size="40"
          :src="email.from.avatar"
          :fallback-src="`https://api.dicebear.com/7.x/initials/svg?seed=${email.from.name}`"
          class="sender-avatar"
        />
        <div class="sender-info">
          <div class="sender-top">
            <span class="sender-name">{{ email.from.name }}</span>
            <span class="sender-time">{{ formatDate(email.timestamp) }}</span>
          </div>
          <div class="sender-addr">
            <span class="addr-label">From:</span>
            <span class="addr-value">{{ email.from.email }}</span>
          </div>
          <div class="sender-addr">
            <span class="addr-label">To:</span>
            <span class="addr-value">{{ email.to.map(r => r.email).join(', ') }}</span>
          </div>
          <div v-if="email.cc?.length" class="sender-addr">
            <span class="addr-label">CC:</span>
            <span class="addr-value">{{ email.cc.map(r => r.email).join(', ') }}</span>
          </div>
        </div>
      </div>

      <!-- Body -->
      <div class="reader-text" v-html="parsedBody" />

      <!-- Attachments -->
      <div v-if="email.attachments.length" class="reader-attachments">
        <p class="attach-title">
          <n-icon :component="AttachOutline" size="15" />
          Attachments ({{ email.attachments.length }})
        </p>
        <div class="attach-list">
          <div
            v-for="att in email.attachments"
            :key="att.id"
            class="attach-card"
          >
            <div class="attach-icon" :class="fileClass(att.mimeType)">
              <n-icon :component="DocumentOutline" size="20" />
            </div>
            <div class="attach-info">
              <span class="attach-name">{{ att.name }}</span>
              <span class="attach-size">{{ formatSize(att.size) }}</span>
            </div>
            <n-button size="tiny" type="primary" ghost>Download</n-button>
          </div>
        </div>
      </div>

      <!-- Reply bar -->
      <div class="reader-reply-bar">
        <n-button type="primary" @click="$emit('reply')">
          <template #icon><n-icon :component="ArrowUndoOutline" /></template>
          Reply
        </n-button>
        <n-button @click="$emit('forward')">
          <template #icon><n-icon :component="ArrowRedoOutline" /></template>
          Forward
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NButton, NIcon, NAvatar, NTooltip, NDropdown } from 'naive-ui'
import {
  MailOutline, ArrowBackOutline, ArchiveOutline, Star, StarOutline,
  TrashOutline, EllipsisHorizontalOutline, AttachOutline, DocumentOutline,
  ArrowUndoOutline, ArrowRedoOutline, MailOpenOutline, MailUnreadOutline,
} from '@vicons/ionicons5'
import type { Email } from '../types'
import { LABELS } from '../constants'

const props = defineProps<{ email?: Email | null }>()

const emit = defineEmits<{
  back: []
  'toggle-star': [id: string]
  delete: [id: string]
  archive: [id: string]
  'mark-read': [id: string, read: boolean]
  reply: []
  forward: []
}>()

const moreOptions = [
  { label: 'Reply all',     key: 'reply-all' },
  { label: 'Mark as spam',  key: 'spam'      },
  { label: 'Print',         key: 'print'     },
]

function onMoreAction(key: string) {
  if (key === 'print') window.print()
}

function labelColor(id: string) { return LABELS.find(l => l.id === id)?.color ?? '#888' }
function labelName(id: string)  { return LABELS.find(l => l.id === id)?.name  ?? id     }

function formatDate(date: Date): string {
  return date.toLocaleString('en', {
    weekday: 'short', month: 'short', day: 'numeric',
    year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

function formatSize(bytes: number): string {
  if (bytes < 1024)       return `${bytes} B`
  if (bytes < 1048576)    return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1048576).toFixed(1)} MB`
}

function fileClass(mime: string) {
  if (mime.includes('pdf'))   return 'type-pdf'
  if (mime.includes('image')) return 'type-img'
  if (mime.includes('sheet') || mime.includes('excel')) return 'type-xls'
  return 'type-doc'
}

const parsedBody = computed(() => {
  if (!props.email) return ''
  const escaped = props.email.body
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>')
  // linkify URLs
  return escaped.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener" class="mail-link">$1</a>'
  )
})
</script>

<style scoped lang="scss">
/* ── Placeholder ── */
.reader-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: 40px;
  background: var(--bg-primary);
}

.ph-icon { color: var(--text-color-3); margin-bottom: 20px; opacity: 0.5; }

.ph-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--text-color-2);
  margin: 0 0 8px;
}

.ph-sub {
  font-size: 13px;
  color: var(--text-color-3);
  margin: 0;
}

/* ── Reader ── */
.mail-reader {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--bg-primary);
  overflow: hidden;
}

/* ── Toolbar ── */
.reader-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-secondary);
  flex-shrink: 0;
}

.toolbar-left, .toolbar-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* ── Scrollable body ── */
.reader-body {
  flex: 1;
  overflow-y: auto;
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 4px; }
}

/* ── Subject ── */
.reader-subject-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  flex-wrap: wrap;
}

.reader-subject {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
  margin: 0;
  flex: 1;
  line-height: 1.3;
}

.priority-chip {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-shrink: 0;
  margin-top: 4px;

  &.high { background: #fee2e2; color: #ef4444; }
  &.low  { background: #d1fae5; color: #10b981; }
}

/* ── Labels ── */
.reader-labels {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.reader-label {
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 12px;
  text-transform: capitalize;
}

/* ── Sender card ── */
.sender-card {
  display: flex;
  gap: 14px;
  padding: 16px;
  border-radius: 12px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
}

.sender-avatar { flex-shrink: 0; }

.sender-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sender-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.sender-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-color);
}

.sender-time {
  font-size: 12px;
  color: var(--text-color-3);
  white-space: nowrap;
}

.sender-addr {
  display: flex;
  gap: 6px;
  font-size: 13px;
}

.addr-label { color: var(--text-color-3); font-weight: 600; flex-shrink: 0; }
.addr-value { color: var(--text-color-2); }

/* ── Body text ── */
.reader-text {
  font-size: 14.5px;
  line-height: 1.75;
  color: var(--text-color-2);
  white-space: pre-wrap;
  word-break: break-word;

  :deep(.mail-link) {
    color: var(--primary-color);
    text-decoration: underline;
    word-break: break-all;
  }
}

/* ── Attachments ── */
.reader-attachments {
  padding: 16px;
  border-radius: 12px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
}

.attach-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color-2);
  margin: 0 0 12px;
}

.attach-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.attach-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
}

.attach-icon {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #fff;

  &.type-pdf { background: #ef4444; }
  &.type-img { background: #10b981; }
  &.type-xls { background: #22c55e; }
  &.type-doc { background: #3b82f6; }
}

.attach-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.attach-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.attach-size { font-size: 12px; color: var(--text-color-3); }

/* ── Reply bar ── */
.reader-reply-bar {
  display: flex;
  gap: 10px;
  padding: 4px 0 8px;
  border-top: 1px solid var(--border-color);
  margin-top: 4px;
}
</style>
