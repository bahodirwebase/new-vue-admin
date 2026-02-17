<script setup lang="ts">
import { NButton, NIcon, NDropdown, NAvatar } from 'naive-ui';
import type { Email } from '../types';
import { useEmailUtils } from '../composables/useEmailUtils';
import CustomTag from '@/components/custom/CustomTag.vue';

interface Props {
  email?: Email;
}

interface Emits {
  (e: 'back'): void;
  (e: 'star-toggle'): void;
  (e: 'delete'): void;
  (e: 'archive'): void;
  (e: 'action', value: string): void;
}

defineProps<Props>();
const emits = defineEmits<Emits>();
const { formatDateTime, formatFileSize, parseEmailBody } = useEmailUtils();

const moreOptions = [
  { label: 'Reply', key: 'reply' },
  { label: 'Reply All', key: 'reply-all' },
  { label: 'Forward', key: 'forward' },
  { type: 'divider', key: 'd1' },
  { label: 'Mark as Spam', key: 'spam' },
  { label: 'Unsubscribe', key: 'unsubscribe' },
];

const handleBack = () => {
  emits('back');
};

const handleStar = () => {
  emits('star-toggle');
};

const handleDelete = () => {
  emits('delete');
};

const handleArchive = () => {
  emits('archive');
};

const handleMoreAction = (key: string | number) => {
  emits('action', key as string);
};
</script>
<!-- widgets/EmailDetail.vue -->
<template>
  <div class="email-detail">
    <div v-if="email" class="detail-container">
      <!-- Header -->
      <div class="detail-header">
        <div class="header-top">
          <button class="back-button" @click="handleBack">← Back</button>
          <div class="header-actions">
            <n-button text type="primary" @click="handleArchive">
              <template #icon>
                <n-icon>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M4 6h16V4H4v2zm16 2H4v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8zm-8 12H6v-6h6v6zm8-6h-2v-2h2v2z" />
                  </svg>
                </n-icon>
              </template>
            </n-button>
            <n-button text type="primary" @click="handleStar">
              <template #icon>
                <n-icon v-if="email.starred">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </n-icon>
                <n-icon v-else>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                      stroke-width="2" />
                  </svg>
                </n-icon>
              </template>
            </n-button>
            <n-button text type="primary" @click="handleDelete">
              <template #icon>
                <n-icon>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-9l-1 1H5v2h14V4z" />
                  </svg>
                </n-icon>
              </template>
            </n-button>
            <n-dropdown :options="moreOptions" placement="bottom-end" @select="handleMoreAction">
              <n-button text type="primary">
                <template #icon>
                  <n-icon>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path
                        d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                  </n-icon>
                </template>
              </n-button>
            </n-dropdown>
          </div>
        </div>
      </div>

      <!-- Email Info -->
      <div class="detail-sender">
        <div class="sender-header">
          <n-avatar :src="email.from.avatar"
            :fallback-src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${email.from.name}`" round :size="48" />
          <div class="sender-info">
            <h3>{{ email.from.name }}</h3>
            <p class="sender-email">{{ email.from.email }}</p>
            <p class="send-time">{{ formatDateTime(email.timestamp) }}</p>
          </div>
          <CustomTag v-if="email.priority !== 'normal'" :type="email.priority === 'high' ? 'error' : 'success'">
            {{ email.priority.charAt(0).toUpperCase() + email.priority.slice(1) }} Priority
          </CustomTag>
        </div>

        <!-- Recipients -->
        <div v-if="email.to.length || email.cc?.length || email.bcc?.length" class="recipients">
          <details>
            <summary>
              To: <strong>{{email.to.map(r => r.email).join(', ')}}</strong>
              <span v-if="email.cc?.length"> + {{ email.cc.length }} more</span>
            </summary>
            <div class="recipients-expanded">
              <div v-if="email.cc?.length" class="recipient-group">
                <strong>CC:</strong>
                <span>{{email.cc.map(r => r.email).join(', ')}}</span>
              </div>
              <div v-if="email.bcc?.length" class="recipient-group">
                <strong>BCC:</strong>
                <span>{{email.bcc.map(r => r.email).join(', ')}}</span>
              </div>
            </div>
          </details>
        </div>
      </div>

      <!-- Subject -->
      <div class="detail-subject">
        <h2>{{ email.subject }}</h2>
      </div>

      <!-- Body -->
      <div class="detail-body">
        <div v-html="parseEmailBody(email.body)"></div>
      </div>

      <!-- Attachments -->
      <div v-if="email.attachments.length" class="detail-attachments">
        <h4>Attachments</h4>
        <div class="attachment-list">
          <div v-for="attachment in email.attachments" :key="attachment.id" class="attachment-item">
            <n-icon class="attachment-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </n-icon>
            <div class="attachment-info">
              <span class="attachment-name">{{ attachment.name }}</span>
              <span class="attachment-size">{{ formatFileSize(attachment.size) }}</span>
            </div>
            <n-button text type="primary">Download</n-button>
          </div>
        </div>
      </div>

      <!-- Labels -->
      <div v-if="email.labels.length" class="detail-labels">
        <CustomTag v-for="label in email.labels" :key="label" type="info" round>
          {{ label }}
        </CustomTag>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="email-detail-empty">
      <div class="empty-state">
        <n-icon class="empty-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke-width="2" />
          </svg>
        </n-icon>
        <p>No email selected</p>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.email-detail {
  flex: 1;
  display: flex;
  background: var(--bg-primary);
  border-radius: 8px;
  overflow-y: auto;
  margin: 8px;
  border: 1px solid var(--border-color);

  .detail-container {
    width: 100%;
    padding: 24px;
  }

  .detail-header {
    margin-bottom: 24px;

    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .back-button {
        background: none;
        border: none;
        font-size: 14px;
        color: var(--primary-color);
        cursor: pointer;
        padding: 0;

        &:hover {
          text-decoration: underline;
        }
      }

      .header-actions {
        display: flex;
        gap: 8px;
      }
    }
  }

  .detail-sender {
    margin-bottom: 24px;

    .sender-header {
      display: flex;
      align-items: flex-start;
      gap: 16px;

      .sender-info {
        flex: 1;

        h3 {
          margin: 0 0 4px;
          font-size: 16px;
          color: var(--text-color-1);
        }

        .sender-email {
          margin: 0;
          font-size: 13px;
          color: var(--text-color-3);
        }

        .send-time {
          margin: 4px 0 0;
          font-size: 12px;
          color: var(--text-color-3);
        }
      }
    }

    .recipients {
      margin-top: 12px;

      details {
        cursor: pointer;

        summary {
          font-size: 13px;
          color: var(--text-color-2);
          padding: 8px 0;

          &:hover {
            background-color: var(--bg-tertiary);
          }
        }

        &[open] summary {
          margin-bottom: 8px;
        }
      }

      .recipients-expanded {
        background-color: var(--bg-tertiary);
        border-left: 2px solid var(--primary-color);
        padding: 8px 12px;
        border-radius: 4px;
      }

      .recipient-group {
        display: flex;
        gap: 8px;
        font-size: 13px;
        margin-bottom: 4px;

        &:last-child {
          margin-bottom: 0;
        }

        strong {
          color: var(--text-color-2);
        }

        span {
          color: var(--text-color-3);
          flex: 1;
          word-break: break-all;
        }
      }
    }
  }

  .detail-subject {
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border-color);

    h2 {
      margin: 0;
      font-size: 24px;
      color: var(--text-color-1);
    }
  }

  .detail-body {
    margin-bottom: 24px;
    font-size: 14px;
    line-height: 1.6;
    color: var(--text-color-1);

    :deep(a) {
      color: var(--primary-color);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    :deep(br) {
      line-height: 1.8;
    }
  }

  .detail-attachments {
    margin-bottom: 24px;
    padding: 16px;
    background-color: var(--bg-tertiary);
    border-radius: 8px;

    h4 {
      margin: 0 0 12px;
      font-size: 14px;
      font-weight: 600;
      color: var(--text-color-1);
    }

    .attachment-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .attachment-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px;
      background: var(--bg-primary);
      border-radius: 4px;
      border: 1px solid var(--border-color);

      .attachment-icon {
        flex-shrink: 0;
        color: var(--primary-color);
        font-size: 20px;
      }

      .attachment-info {
        flex: 1;
        min-width: 0;

        .attachment-name {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-color-1);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .attachment-size {
          display: block;
          font-size: 12px;
          color: var(--text-color-3);
          margin-top: 2px;
        }
      }
    }
  }

  .detail-labels {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .email-detail-empty {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .empty-state {
      text-align: center;
      padding: 48px 24px;

      .empty-icon {
        font-size: 64px;
        color: var(--text-color-3);
        margin-bottom: 16px;
      }

      p {
        margin: 0;
        color: var(--text-color-3);
        font-size: 16px;
      }
    }
  }
}

@media (max-width: 768px) {
  .email-detail {
    margin: 4px;

    .detail-container {
      padding: 16px;
    }

    .detail-subject h2 {
      font-size: 18px;
    }

    .detail-body {
      font-size: 13px;
    }
  }
}
</style>
