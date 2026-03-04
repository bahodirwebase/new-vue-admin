<template>
  <aside class="mail-sidebar">
    <!-- Logo + compose -->
    <div class="sidebar-header">
      <div class="sidebar-logo">
        <div class="logo-icon">
          <n-icon :component="MailOutline" size="20" />
        </div>
        <span class="logo-text">Inbox</span>
      </div>
      <n-button
        type="primary"
        class="compose-btn"
        @click="$emit('compose')"
      >
        <template #icon><n-icon :component="CreateOutline" /></template>
        Compose
      </n-button>
    </div>

    <!-- Folders -->
    <nav class="sidebar-nav">
      <p class="nav-label">Mailbox</p>
      <button
        v-for="folder in folders"
        :key="folder.id"
        class="nav-item"
        :class="{ active: activeFolder === folder.id && !activeLabel }"
        @click="$emit('folder-select', folder.id)"
      >
        <n-icon :component="folderIcon(folder.icon)" class="nav-icon" size="18" />
        <span class="nav-name">{{ folder.name }}</span>
        <span v-if="folder.unread > 0" class="nav-badge">{{ folder.unread }}</span>
        <span v-else-if="folder.total > 0" class="nav-count">{{ folder.total }}</span>
      </button>
    </nav>

    <!-- Labels -->
    <nav class="sidebar-nav">
      <p class="nav-label">Labels</p>
      <button
        v-for="label in labels"
        :key="label.id"
        class="nav-item"
        :class="{ active: activeLabel === label.id }"
        @click="$emit('label-select', label.id)"
      >
        <span class="label-dot" :style="{ background: label.color }" />
        <span class="nav-name">{{ label.name }}</span>
      </button>
    </nav>

    <!-- Footer / account -->
    <div class="sidebar-footer">
      <div class="account-card">
        <n-avatar
          round
          size="small"
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=me"
          class="account-avatar"
        />
        <div class="account-info">
          <span class="account-name">Me</span>
          <span class="account-email">me@example.com</span>
        </div>
        <n-icon :component="EllipsisHorizontalOutline" size="18" class="account-more" />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { NButton, NIcon, NAvatar } from 'naive-ui'
import {
  MailOutline, CreateOutline, EllipsisHorizontalOutline,
  MailOpenOutline, StarOutline, SendOutline, DocumentOutline,
  WarningOutline, TrashOutline,
} from '@vicons/ionicons5'
import type { Component } from 'vue'
import type { Folder, Label } from '../types'

defineProps<{
  folders: Folder[]
  labels: Label[]
  activeFolder: string
  activeLabel: string | null
}>()

defineEmits<{
  compose: []
  'folder-select': [id: string]
  'label-select': [id: string]
}>()

const iconMap: Record<string, Component> = {
  MailOpenOutline, StarOutline, SendOutline, DocumentOutline,
  WarningOutline, TrashOutline,
}

function folderIcon(name: string): Component {
  return iconMap[name] ?? MailOpenOutline
}
</script>

<style scoped lang="scss">
.mail-sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  overflow-y: auto;
  overflow-x: hidden;
  user-select: none;
}

/* ── Header ── */
.sidebar-header {
  padding: 16px 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 4px;
}

.logo-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
}

.logo-text {
  font-size: 17px;
  font-weight: 700;
  color: var(--text-color);
  letter-spacing: -0.3px;
}

.compose-btn {
  width: 100%;
  border-radius: 10px;
  font-weight: 600;
}

/* ── Nav ── */
.sidebar-nav {
  padding: 8px 8px 4px;
}

.nav-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--text-color-3);
  padding: 4px 8px 6px;
  margin: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 10px;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  color: var(--text-color-2);
  font-size: 14px;
  transition: background 0.15s, color 0.15s;
  text-align: left;
  margin-bottom: 2px;

  &:hover {
    background: var(--bg-tertiary);
    color: var(--text-color);
  }

  &.active {
    background: rgba(var(--primary-color-rgb, 99, 102, 241), 0.12);
    color: var(--primary-color);
    font-weight: 600;

    .nav-icon { color: var(--primary-color); }
  }
}

.nav-icon {
  flex-shrink: 0;
  color: var(--text-color-3);
  transition: color 0.15s;
}

.nav-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.nav-badge {
  font-size: 11px;
  font-weight: 700;
  background: var(--primary-color);
  color: #fff;
  border-radius: 10px;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
}

.nav-count {
  font-size: 12px;
  color: var(--text-color-3);
}

/* ── Label dot ── */
.label-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-left: 4px;
}

/* ── Footer ── */
.sidebar-footer {
  margin-top: auto;
  padding: 12px;
  border-top: 1px solid var(--border-color);
}

.account-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.15s;

  &:hover { background: var(--bg-tertiary); }
}

.account-avatar { flex-shrink: 0; }

.account-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.account-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.account-email {
  font-size: 11px;
  color: var(--text-color-3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.account-more {
  color: var(--text-color-3);
  flex-shrink: 0;
}
</style>
