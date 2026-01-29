<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  StarOutline,
  Star,
  ArchiveOutline,
  TrashOutline,
  SendOutline,
  AttachOutline,
  PrintOutline,
} from '@vicons/ionicons5'

import type { Email } from '../store'

interface Props {
  email: Email
}

interface Emits {
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const showReplyBox = ref(false)
const replyContent = ref('')
const showDropdown = ref(false)

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const toggleStar = () => {
  props.email.isStarred = !props.email.isStarred
}

const archiveEmail = () => {
  props.email.isArchived = true
  emit('close')
}

const deleteEmail = () => {
  props.email.folder = 'trash'
  emit('close')
}

const replyEmail = () => {
  showReplyBox.value = true
}

const sendReply = () => {
  // Simulate sending reply
  console.log('Sending reply:', replyContent.value)
  replyContent.value = ''
  showReplyBox.value = false
}

const printEmail = () => {
  window.print()
}

const downloadAttachment = (attachment: any) => {
  // Simulate download
  console.log('Downloading:', attachment.name)
}

const priorityColor = computed(() => {
  switch (props.email.priority) {
    case 'high': return '#f5222d'
    case 'normal': return '#1890ff'
    case 'low': return '#52c41a'
    default: return '#d9d9d9'
  }
})
</script>

<template>
  <div class="email-content">
    <!-- Email Header -->
    <div class="email-header">
      <div class="header-left">
        <div class="email-subject">
          {{ email.subject }}
        </div>
      </div>

      <div class="header-right">
        <n-space>
          <n-button quaternary @click="toggleStar">
            <template #icon>
              <n-icon
                :component="email.isStarred ? Star : StarOutline"
                :color="email.isStarred ? '#fadb14' : 'var(--n-text-color-3)'"
              />
            </template>
          </n-button>
          
          <n-button quaternary @click="archiveEmail">
            <template #icon>
              <n-icon>
                <ArchiveOutline />
              </n-icon>
            </template>
          </n-button>
          
          <n-button quaternary @click="deleteEmail">
            <template #icon>
              <n-icon>
                <TrashOutline />
              </n-icon>
            </template>
          </n-button>
          
          <n-dropdown
            v-model:show="showDropdown"
            :options="[
              { label: 'Print', key: 'print', icon: PrintOutline },
              { label: 'Mark as unread', key: 'unread' },
              { label: 'Add label', key: 'label' },
            ]"
            @select="(key: string) => key === 'print' ? printEmail() : null"
          >
            <n-button quaternary>
              <template #icon>
                <span>⋯</span>
              </template>
            </n-button>
          </n-dropdown>
        </n-space>
      </div>
    </div>

    <!-- Email Body -->
    <div class="email-body">
      <!-- Sender Info -->
      <div class="sender-section">
        <div class="sender-info">
          <n-avatar
            :src="email.from.avatar"
            :fallback="email.from.name.charAt(0)"
            round
            :size="48"
          />
          <div class="sender-details">
            <div class="sender-name">{{ email.from.name }}</div>
            <div class="sender-email">{{ email.from.email }}</div>
            <div class="email-date">To {{ email.to.map(t => t.name).join(', ') }} • {{ formatDate(email.timestamp) }}</div>
          </div>
        </div>
        
        <div class="email-meta">
          <div class="priority-badge" :style="{ backgroundColor: priorityColor }">
            {{ email.priority.toUpperCase() }}
          </div>
          <div class="email-labels" v-if="email.labels && email.labels.length">
            <n-tag
              v-for="label in email.labels"
              :key="label"
              size="small"
              type="info"
              round
            >
              {{ label }}
            </n-tag>
          </div>
        </div>
      </div>

      <!-- Email Content -->
      <div class="email-text">
        <div class="email-content-text" v-html="email.content.replace(/\n/g, '<br>')"></div>
      </div>

      <!-- Attachments -->
      <div class="attachments-section" v-if="email.attachments && email.attachments.length">
        <h4 class="section-title">
          <n-icon :component="AttachOutline" />
          Attachments ({{ email.attachments.length }})
        </h4>
        <div class="attachments-list">
          <div
            v-for="attachment in email.attachments"
            :key="attachment.name"
            class="attachment-item"
            @click="downloadAttachment(attachment)"
          >
            <div class="attachment-icon">
              <n-icon size="24">
                <AttachOutline />
              </n-icon>
            </div>
            <div class="attachment-info">
              <div class="attachment-name">{{ attachment.name }}</div>
              <div class="attachment-size">{{ formatFileSize(attachment.size) }}</div>
            </div>
            <n-button quaternary size="small">
              Download
            </n-button>
          </div>
        </div>
      </div>
    </div>

    <!-- Reply Section -->
    <div class="reply-section" v-if="showReplyBox">
      <div class="reply-header">
        <h4>Reply to {{ email.from.name }}</h4>
        <n-button quaternary size="small" @click="showReplyBox = false">
          Cancel
        </n-button>
      </div>
      
      <div class="reply-form">
        <n-input
          v-model:value="replyContent"
          type="textarea"
          placeholder="Type your reply..."
          :autosize="{ minRows: 4, maxRows: 8 }"
        />
        
        <div class="reply-actions">
          <n-space>
            <n-button @click="showReplyBox = false">
              Cancel
            </n-button>
            <n-button type="primary" @click="sendReply">
              <template #icon>
                <n-icon>
                  <SendOutline />
                </n-icon>
              </template>
              Send Reply
            </n-button>
          </n-space>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="quick-actions" v-if="!showReplyBox">
      <n-space>
        <n-button @click="replyEmail">
          <template #icon>
            <n-icon>
              <SendOutline />
            </n-icon>
          </template>
          Reply
        </n-button>
        
        <n-button>
          Forward
        </n-button>
      </n-space>
    </div>
  </div>
</template>

<style scoped>
/* Using external SCSS file */
</style>
