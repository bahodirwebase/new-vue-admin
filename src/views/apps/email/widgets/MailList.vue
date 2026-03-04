<template>
  <div class="mail-list">
    <!-- Search bar -->
    <div class="list-search">
      <n-input
        v-model:value="localSearch"
        placeholder="Search emails..."
        clearable
        @update:value="$emit('search', $event)"
      >
        <template #prefix>
          <n-icon :component="SearchOutline" />
        </template>
      </n-input>
    </div>

    <!-- Toolbar -->
    <div class="list-toolbar">
      <div class="toolbar-left">
        <n-checkbox
          :checked="allSelected && emails.length > 0"
          :indeterminate="someSelected && !allSelected"
          @update:checked="$emit('check-all')"
        />
        <transition name="fade-actions">
          <div v-if="checkedCount > 0" class="bulk-actions">
            <n-tooltip trigger="hover" placement="bottom">
              <template #trigger>
                <n-button text size="small" @click="$emit('bulk-read', true)">
                  <n-icon :component="MailOpenOutline" size="17" />
                </n-button>
              </template>
              Mark read
            </n-tooltip>
            <n-tooltip trigger="hover" placement="bottom">
              <template #trigger>
                <n-button text size="small" @click="$emit('bulk-read', false)">
                  <n-icon :component="MailUnreadOutline" size="17" />
                </n-button>
              </template>
              Mark unread
            </n-tooltip>
            <n-tooltip trigger="hover" placement="bottom">
              <template #trigger>
                <n-button text size="small" @click="$emit('bulk-archive')">
                  <n-icon :component="ArchiveOutline" size="17" />
                </n-button>
              </template>
              Archive
            </n-tooltip>
            <n-tooltip trigger="hover" placement="bottom">
              <template #trigger>
                <n-button text size="small" @click="$emit('bulk-delete')">
                  <n-icon :component="TrashOutline" size="17" />
                </n-button>
              </template>
              Delete
            </n-tooltip>
            <span class="bulk-count">{{ checkedCount }} selected</span>
          </div>
        </transition>
      </div>
      <span class="toolbar-info">{{ emails.length }} messages</span>
    </div>

    <!-- Loading skeleton -->
    <div v-if="loading" class="list-skeleton">
      <div v-for="i in 6" :key="i" class="skeleton-item">
        <div class="sk sk-avatar" />
        <div class="sk-lines">
          <div class="sk sk-line sk-short" />
          <div class="sk sk-line sk-long" />
          <div class="sk sk-line sk-medium" />
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="emails.length === 0" class="list-empty">
      <n-icon :component="MailOutline" size="52" class="empty-icon" />
      <p class="empty-title">{{ emptyTitle }}</p>
      <p class="empty-sub">{{ emptySubtitle }}</p>
    </div>

    <!-- Email list -->
    <div v-else class="list-items">
      <MailListItem
        v-for="email in emails"
        :key="email.id"
        :email="email"
        :is-selected="selectedId === email.id"
        :is-checked="checkedIds.has(email.id)"
        @click="$emit('select', email)"
        @toggle-check="$emit('toggle-check', email.id)"
        @toggle-star="$emit('star', email.id)"
      />
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="list-pagination">
      <n-pagination
        :page="currentPage"
        :page-count="totalPages"
        :page-slot="5"
        simple
        @update:page="$emit('page-change', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { NInput, NIcon, NCheckbox, NButton, NTooltip, NPagination } from 'naive-ui'
import {
  SearchOutline, MailOutline, TrashOutline, ArchiveOutline,
  MailOpenOutline, MailUnreadOutline,
} from '@vicons/ionicons5'
import MailListItem from './MailListItem.vue'
import type { Email } from '../types'

const props = defineProps<{
  emails: Email[]
  loading: boolean
  selectedId?: string
  checkedIds: Set<string>
  allSelected: boolean
  currentFolder: string
  totalPages: number
  currentPage: number
}>()

defineEmits<{
  select: [email: Email]
  'toggle-check': [id: string]
  'check-all': []
  search: [q: string]
  star: [id: string]
  'bulk-delete': []
  'bulk-archive': []
  'bulk-read': [read: boolean]
  'page-change': [page: number]
}>()

const localSearch = ref('')

const checkedCount = computed(() => props.checkedIds.size)
const someSelected = computed(() => checkedCount.value > 0)

const emptyTitle = computed(() => {
  if (localSearch.value.trim()) return 'No results found'
  const map: Record<string, string> = {
    inbox: 'Your inbox is empty', starred: 'No starred messages',
    sent: 'No sent messages', drafts: 'No drafts', spam: 'No spam', trash: 'Trash is empty',
  }
  return map[props.currentFolder] ?? 'No messages'
})

const emptySubtitle = computed(() =>
  localSearch.value.trim() ? 'Try different search terms' : 'Enjoy the peace and quiet!'
)
</script>

<style scoped lang="scss">
.mail-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--bg-primary);
  border-right: 1px solid var(--border-color);
  overflow: hidden;
}

/* ── Search ── */
.list-search {
  padding: 12px 12px 8px;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-secondary);
}

/* ── Toolbar ── */
.list-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-secondary);
  min-height: 42px;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bulk-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.bulk-count {
  font-size: 12px;
  color: var(--text-color-3);
  margin-left: 4px;
}

.toolbar-info {
  font-size: 12px;
  color: var(--text-color-3);
}

/* ── Items ── */
.list-items {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 4px; }
}

/* ── Loading skeleton ── */
.list-skeleton {
  flex: 1;
  padding: 8px 0;
}

.skeleton-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--border-color);
}

.sk {
  background: var(--bg-tertiary);
  border-radius: 4px;
  animation: shimmer 1.4s ease-in-out infinite;
}

.sk-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  flex-shrink: 0;
}

.sk-lines {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.sk-line { height: 12px; }
.sk-short  { width: 40%; }
.sk-long   { width: 80%; }
.sk-medium { width: 60%; }

@keyframes shimmer {
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 1; }
}

/* ── Empty state ── */
.list-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
}

.empty-icon { color: var(--text-color-3); margin-bottom: 16px; }

.empty-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color-2);
  margin: 0 0 6px;
}

.empty-sub {
  font-size: 13px;
  color: var(--text-color-3);
  margin: 0;
}

/* ── Pagination ── */
.list-pagination {
  display: flex;
  justify-content: center;
  padding: 12px;
  border-top: 1px solid var(--border-color);
  background: var(--bg-secondary);
}

/* Transition */
.fade-actions-enter-active,
.fade-actions-leave-active { transition: opacity 0.15s, transform 0.15s; }
.fade-actions-enter-from,
.fade-actions-leave-to     { opacity: 0; transform: translateX(-6px); }
</style>
