<!-- widgets/EmailListItem.vue -->
<template>
  <div
    class="email-list-item"
    :class="{ 'unread': !email.read, 'selected': isSelected }"
    @click="handleClick"
  >
    <!-- Checkbox -->
    <div class="email-item-checkbox">
      <n-checkbox
        :checked="isSelected"
        @update:checked="handleSelectChange"
        @click.stop
      />
    </div>

    <!-- Avatar -->
    <div class="email-item-avatar">
      <n-avatar
        :src="email.from.avatar"
        :fallback-src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${email.from.name}`"
        round
        :size="40"
      />
    </div>

    <!-- Email Info -->
    <div class="email-item-content">
      <div class="email-item-header">
        <span class="sender-name">{{ email.from.name }}</span>
        <span class="timestamp">{{ formatTime(email.timestamp) }}</span>
      </div>
      <div class="email-item-preview">
        <span v-if="!email.read" class="unread-indicator">●</span>
        <span class="subject">{{ email.subject }}</span>
        <span v-if="email.attachments.length" class="attachment-indicator">📎</span>
      </div>
      <div class="email-item-labels">
        <n-tag
          v-for="label in email.labels"
          :key="label"
          :type="getLabelType(label)"
          size="small"
          round
        >
          {{ label }}
        </n-tag>
      </div>
    </div>

    <!-- Actions -->
    <div class="email-item-actions">
      <n-button
        text
        type="primary"
        @click.stop="handleStar"
      >
        <template #icon>
          <n-icon v-if="email.starred">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </n-icon>
          <n-icon v-else>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke-width="2"/>
            </svg>
          </n-icon>
        </template>
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NCheckbox, NAvatar, NTag, NButton, NIcon } from 'naive-ui';
import type { Email } from '../types';
import { useEmailUtils } from '../composables/useEmailUtils';

interface Props {
  email: Email;
  isSelected?: boolean;
}

interface Emits {
  (e: 'select-change', value: boolean): void;
  (e: 'click'): void;
  (e: 'star-toggle'): void;
}

const props = withDefaults(defineProps<Props>(), {
  isSelected: false,
});

const emits = defineEmits<Emits>();
const { formatRelativeTime } = useEmailUtils();

const formatTime = (date: Date) => {
  return formatRelativeTime(date);
};

const handleClick = () => {
  emits('click');
};

const handleSelectChange = (value: boolean) => {
  emits('select-change', value);
};

const handleStar = () => {
  emits('star-toggle');
};

const getLabelType = (label: string) => {
  const labelTypes: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
    work: 'info',
    personal: 'success',
    urgent: 'error',
    'follow-up': 'warning',
  };
  return labelTypes[label] || 'default';
};
</script>

<style scoped lang="scss">
.email-list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--bg-secondary);
  }

  &.unread {
    background-color: var(--bg-tertiary);
    font-weight: 500;
  }

  &.selected {
    background-color: var(--bg-tertiary);
  }

  .email-item-checkbox {
    flex-shrink: 0;
  }

  .email-item-avatar {
    flex-shrink: 0;
  }

  .email-item-content {
    flex: 1;
    min-width: 0;
  }

  .email-item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;

    .sender-name {
      font-weight: 600;
      color: #000;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .timestamp {
      font-size: 12px;
      color: #999;
      flex-shrink: 0;
      margin-left: 8px;
    }
  }

  .email-item-preview {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 6px;
    font-size: 13px;
    color: #666;

    .unread-indicator {
      color: #1890ff;
      font-size: 8px;
    }

    .subject {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .attachment-indicator {
      flex-shrink: 0;
    }
  }

  .email-item-labels {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .email-item-actions {
    flex-shrink: 0;
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:hover .email-item-actions {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .email-list-item {
    gap: 8px;
    padding: 8px 12px;

    .email-item-actions {
      opacity: 1;
    }

    .timestamp {
      font-size: 11px;
    }
  }
}
</style>
