<template>
  <div
    class="mail-item"
    :class="{ unread: !email.read, selected: isSelected, checked: isChecked }"
    @click="$emit('click')"
  >
    <!-- Checkbox zone -->
    <div class="item-check" @click.stop>
      <n-checkbox
        :checked="isChecked"
        @update:checked="$emit('toggle-check')"
      />
    </div>

    <!-- Star -->
    <button
      class="item-star"
      :class="{ starred: email.starred }"
      @click.stop="$emit('toggle-star')"
      aria-label="Toggle star"
    >
      <n-icon :component="email.starred ? Star : StarOutline" size="16" />
    </button>

    <!-- Avatar -->
    <div class="item-avatar">
      <n-avatar round size="small" :src="email.from.avatar" :fallback-src="fallbackAvatar" :img-props="{ alt: email.from.name }">
        {{ initials(email.from.name) }}
      </n-avatar>
    </div>

    <!-- Content -->
    <div class="item-content">
      <div class="item-top">
        <span class="item-sender">{{ email.from.name }}</span>
        <span class="item-time">{{ relativeTime(email.timestamp) }}</span>
      </div>
      <div class="item-middle">
        <span class="item-subject">{{ email.subject }}</span>
        <span v-if="email.attachments.length" class="item-attach">
          <n-icon :component="AttachOutline" size="13" />
        </span>
      </div>
      <div class="item-bottom">
        <span class="item-preview">{{ preview(email.body) }}</span>
        <div class="item-labels">
          <span
            v-for="lid in email.labels.slice(0, 2)"
            :key="lid"
            class="item-label"
            :style="{ background: `color-mix(in srgb, ${labelColor(lid)} 13%, transparent)`, color: labelColor(lid) }"
          >{{ labelName(lid) }}</span>
        </div>
      </div>
    </div>

    <!-- Priority dot -->
    <div v-if="email.priority === 'high'" class="item-priority" />
  </div>
</template>

<script setup lang="ts">
import { NCheckbox, NIcon, NAvatar } from 'naive-ui'
import { Star, StarOutline, AttachOutline } from '@vicons/ionicons5'
import type { Email } from '../types'
import { LABELS } from '../constants'

const props = defineProps<{
  email: Email
  isSelected: boolean
  isChecked: boolean
}>()

defineEmits<{
  click: []
  'toggle-check': []
  'toggle-star': []
}>()

const fallbackAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${props.email.from.name}`

function initials(name: string) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

function preview(body: string) {
  return body.replace(/\n/g, ' ').trim().slice(0, 90)
}

function relativeTime(date: Date): string {
  const diff = Date.now() - date.getTime()
  const mins  = Math.floor(diff / 60_000)
  const hours = Math.floor(diff / 3_600_000)
  const days  = Math.floor(diff / 86_400_000)
  if (mins < 1)    return 'just now'
  if (mins < 60)   return `${mins}m`
  if (hours < 24)  return `${hours}h`
  if (days === 1)  return 'Yesterday'
  if (days < 7)    return date.toLocaleDateString('en', { weekday: 'short' })
  return date.toLocaleDateString('en', { month: 'short', day: 'numeric' })
}

function labelColor(id: string) {
  return LABELS.find(l => l.id === id)?.color ?? '#888'
}

function labelName(id: string) {
  return LABELS.find(l => l.id === id)?.name ?? id
}
</script>

<style scoped lang="scss">
.mail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  cursor: pointer;
  border-bottom: 1px solid var(--border-color);
  transition: background 0.12s;
  position: relative;

  &:hover { background: var(--bg-tertiary); }
  &.selected { background: rgba(var(--primary-color-rgb, 99, 102, 241), 0.08); }
  &.checked  { background: rgba(var(--primary-color-rgb, 99, 102, 241), 0.06); }

  /* Bold when unread */
  &.unread {
    .item-sender  { font-weight: 700; color: var(--text-color); }
    .item-subject { font-weight: 600; color: var(--text-color); }
    &::before {
      content: '';
      position: absolute;
      left: 0; top: 0; bottom: 0;
      width: 3px;
      background: var(--primary-color);
      border-radius: 0 2px 2px 0;
    }
  }
}

/* ── Check ── */
.item-check {
  flex-shrink: 0;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Star ── */
.item-star {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 4px;
  color: var(--text-color-3);
  transition: color 0.15s, background 0.15s;

  &:hover { color: #f59e0b; background: rgba(245, 158, 11, 0.1); }
  &.starred { color: #f59e0b; }
}

/* ── Avatar ── */
.item-avatar { flex-shrink: 0; }

/* ── Content ── */
.item-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.item-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.item-sender {
  font-size: 13.5px;
  color: var(--text-color-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.item-time {
  font-size: 11.5px;
  color: var(--text-color-3);
  white-space: nowrap;
  flex-shrink: 0;
}

.item-middle {
  display: flex;
  align-items: center;
  gap: 5px;
}

.item-subject {
  font-size: 13px;
  color: var(--text-color-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.item-attach {
  color: var(--text-color-3);
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.item-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.item-preview {
  font-size: 12px;
  color: var(--text-color-3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.item-labels {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.item-label {
  font-size: 10px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 10px;
  text-transform: capitalize;
  white-space: nowrap;
}

/* ── Priority dot ── */
.item-priority {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ef4444;
  flex-shrink: 0;
}
</style>
