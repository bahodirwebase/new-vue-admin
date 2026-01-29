<script setup lang="ts">
import { computed } from 'vue'
import {
  MailOutline,
  SendOutline,
  TrashOutline,
  StarOutline,
  CreateOutline,
} from '@vicons/ionicons5'

import { useEmailStore } from '../store'

const emailStore = useEmailStore()

const folders = [
  { key: 'inbox', label: 'Inbox', icon: MailOutline },
  { key: 'sent', label: 'Sent', icon: SendOutline },
  { key: 'drafts', label: 'Drafts', icon: CreateOutline },
  { key: 'trash', label: 'Trash', icon: TrashOutline },
]

const labels = [
  { key: 'important', label: 'Important', color: '#f5222d' },
  { key: 'work', label: 'Work', color: '#1890ff' },
  { key: 'personal', label: 'Personal', color: '#52c41a' },
  { key: 'marketing', label: 'Marketing', color: '#722ed1' },
  { key: 'urgent', label: 'Urgent', color: '#fa8c16' },
]

const folderCounts = computed(() => {
  const counts: Record<string, number> = {
    inbox: emailStore.unreadCount,
    sent: 0,
    drafts: 0,
    trash: 0,
  }
  
  emailStore.emails.forEach(email => {
    if (email.folder === 'sent') counts.sent++
    if (email.folder === 'drafts') counts.drafts++
    if (email.folder === 'trash') counts.trash++
  })
  
  return counts
})

const starredCount = computed(() => emailStore.starredEmails.length)

const selectFolder = (folderKey: string) => {
  emailStore.setCurrentFolder(folderKey)
}

const selectStarred = () => {
  emailStore.showStarred()
}
</script>

<template>
  <n-card class="email-sidebar-card" >
    <!-- Compose Button -->
    <div class="compose-section">
      <n-button type="primary" size="large" block @click="$emit('compose')">
        <template #icon>
          <n-icon>
            <CreateOutline />
          </n-icon>
        </template>
        Compose
      </n-button>
    </div>

    <!-- Scrollable Content -->
    <div class="sidebar-content">
      <!-- Folders -->
      <div class="folders-section">
        <div class="section-content">
          <h4 class="section-title">Folders</h4>
          <div class="folder-list">
            <div
              v-for="folder in folders"
              :key="folder.key"
              class="folder-item"
              :class="{ active: emailStore.currentFolder === folder.key }"
              @click="selectFolder(folder.key)"
            >
              <n-icon :component="folder.icon" />
              <span class="folder-label">{{ folder.label }}</span>
              <n-badge
                v-if="folderCounts[folder.key] > 0"
                :value="folderCounts[folder.key]"
                :max="99"
                class="folder-badge"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Starred -->
      <div class="starred-section">
        <div class="section-content">
          <div class="folder-item" @click="selectStarred">
            <n-icon>
              <StarOutline />
            </n-icon>
            <span class="folder-label">Starred</span>
            <n-badge
              v-if="starredCount > 0"
              :value="starredCount"
              :max="99"
              class="folder-badge"
            />
          </div>
        </div>
      </div>

      <!-- Labels -->
      <div class="labels-section">
        <div class="section-content">
          <h4 class="section-title">Labels</h4>
          <div class="label-list">
            <div
              v-for="label in labels"
              :key="label.key"
              class="label-item"
            >
              <span class="label-dot" :style="{ backgroundColor: label.color }"></span>
              <span class="label-name">{{ label.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Storage Info -->
      <div class="storage-section">
        <div class="section-content">
          <h4 class="section-title">Storage</h4>
          <div class="storage-info">
            <div class="storage-bar">
              <div class="storage-used" style="width: 35%"></div>
            </div>
            <div class="storage-text">
              <span>3.5 GB of 10 GB used</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </n-card>
</template>

<style scoped>
/* Using external SCSS file */
</style>
