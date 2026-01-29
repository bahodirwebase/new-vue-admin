<script setup lang="ts">
import {
  StarOutline,
  Star,
  AttachOutline,
} from '@vicons/ionicons5'

import type { Email } from '../store'

interface Props {
  emails: Email[]
  selectedEmails: number[]
  selectedEmail: Email | null
}

interface Emits {
  (e: 'select-email', emailId: number): void
  (e: 'toggle-selection', emailId: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  
  if (diffInHours < 24) {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  } else if (diffInHours < 24 * 7) {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short' 
    })
  } else {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return '#f5222d'
    case 'normal': return '#1890ff'
    case 'low': return '#52c41a'
    default: return '#d9d9d9'
  }
}

const toggleStar = (email: Email, event: Event) => {
  event.stopPropagation()
  email.isStarred = !email.isStarred
}

const selectEmail = (emailId: number) => {
  emit('select-email', emailId)
}

const toggleSelection = (emailId: number, event: Event) => {
  event.stopPropagation()
  emit('toggle-selection', emailId)
}

const isSelected = (emailId: number) => {
  return props.selectedEmails.includes(emailId)
}

const isEmailSelected = (emailId: number) => {
  return props.selectedEmail?.id === emailId
}
</script>

<template>
  <div class="email-list">
    <div
      v-for="email in emails"
      :key="email.id"
      class="email-item"
      :class="{
        'selected': isEmailSelected(email.id),
        'unread': !email.isRead,
        'bulk-selected': isSelected(email.id)
      }"
      @click="selectEmail(email.id)"
    >
      <!-- Checkbox for bulk selection -->
      <div class="email-checkbox" @click="toggleSelection(email.id, $event)">
        <n-checkbox
          :checked="isSelected(email.id)"
          @update:checked="toggleSelection(email.id, $event)"
        />
      </div>

      <!-- Star -->
      <div class="email-star" @click="toggleStar(email, $event)">
        <n-icon
          :component="email.isStarred ? Star : StarOutline"
          :color="email.isStarred ? '#fadb14' : 'var(--n-text-color-3)'"
          size="18"
        />
      </div>

      <!-- Sender Avatar & Info -->
      <div class="email-sender">
        <n-avatar
          :src="email.from.avatar"
          :fallback="email.from.name.charAt(0)"
          round
          :size="32"
        />
        <div class="sender-info">
          <div class="sender-name" :class="{ 'unread': !email.isRead }">
            {{ email.from.name }}
          </div>
          <div class="email-subject" :class="{ 'unread': !email.isRead }">
            {{ email.subject }}
          </div>
          <div class="email-preview">
            {{ email.preview }}
          </div>
        </div>
      </div>

      <!-- Email Meta -->
      <div class="email-meta">
        <!-- Priority Indicator -->
        <div
          class="priority-indicator"
          :style="{ backgroundColor: getPriorityColor(email.priority) }"
          v-if="email.priority === 'high'"
        ></div>

        <!-- Attachments -->
        <n-icon
          v-if="email.attachments && email.attachments.length > 0"
          :component="AttachOutline"
          size="16"
          color="var(--n-text-color-3)"
        />

        <!-- Time -->
        <div class="email-time">
          {{ formatDate(email.timestamp) }}
        </div>

        <!-- Labels -->
        <div class="email-labels" v-if="email.labels && email.labels.length">
          <n-tag
            v-for="label in email.labels.slice(0, 2)"
            :key="label"
            size="small"
            type="info"
            round
          >
            {{ label }}
          </n-tag>
          <n-tag
            v-if="email.labels.length > 2"
            size="small"
            type="default"
            round
          >
            +{{ email.labels.length - 2 }}
          </n-tag>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="emails.length === 0" class="empty-state">
      <n-empty description="No emails found" />
    </div>
  </div>
</template>

<style scoped>
/* Using external SCSS file */
</style>
