<!-- index.vue -->
<template>
  <div class="email-app">
    <div class="app-container">
      <!-- Sidebar -->
      <div
        class="sidebar-wrapper"
        :class="{ 'mobile-open': sidebarOpen }"
      >
        <EmailSidebar
          @compose-click="openComposer"
          @folder-select="handleFolderSelect"
          @label-select="handleLabelSelect"
          @toggle-sidebar="sidebarOpen = !sidebarOpen"
        />
      </div>

      <!-- Main Content -->
      <div class="main-content">
        <!-- Header -->
        <div class="app-header">
          <div class="header-left">
            <n-button
              v-if="isMobile"
              text
              type="primary"
              circle
              @click="sidebarOpen = !sidebarOpen"
            >
              <template #icon>
                <n-icon>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                  </svg>
                </n-icon>
              </template>
            </n-button>

            <!-- Search -->
            <div class="search-bar">
              <n-input
                v-model:value="searchQuery"
                type="text"
                placeholder="Search emails..."
                clearable
                @update:value="handleSearch"
              >
                <template #prefix>
                  <n-icon>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                    </svg>
                  </n-icon>
                </template>
              </n-input>
            </div>
          </div>

          <!-- Header Actions -->
          <div class="header-right">
            <n-button text type="primary" circle>
              <template #icon>
                <n-icon>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                </n-icon>
              </template>
            </n-button>
          </div>
        </div>

        <!-- Email List and Detail -->
        <div class="content-wrapper">
          <!-- Email List -->
          <div class="email-list-container">
            <div class="list-header">
              <h2>{{ currentFolderName }}</h2>
              <div class="list-controls">
                <n-checkbox
                  v-model:checked="selectAll"
                  @update:checked="handleSelectAll"
                />
                <n-button text type="primary" size="small">
                  <template #icon>
                    <n-icon>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                      </svg>
                    </n-icon>
                  </template>
                </n-button>
              </div>
            </div>

            <!-- Loading State -->
            <n-spin v-if="loading" />

            <!-- Empty State -->
            <div v-else-if="paginatedEmails.length === 0" class="empty-state">
              <n-icon class="empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke-width="2"/>
                </svg>
              </n-icon>
              <p>No emails found</p>
            </div>

            <!-- Email List -->
            <div v-else class="emails-list">
              <EmailListItem
                v-for="email in paginatedEmails"
                :key="email.id"
                :email="email"
                :is-selected="selectedEmails.includes(email.id)"
                @select-change="(checked) => handleSelectEmail(email.id, checked)"
                @click="selectEmail(email)"
                @star-toggle="toggleStar(email.id)"
              />
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="pagination">
              <n-pagination
                v-model:page="currentPage"
                :page-count="totalPages"
                :page-size="ITEMS_PER_PAGE"
              />
            </div>
          </div>

          <!-- Email Detail -->
          <div class="email-detail-container">
            <EmailDetail
              :email="selectedEmail"
              @back="selectedEmail = undefined"
              @star-toggle="toggleStar(selectedEmail?.id || '')"
              @delete="deleteEmail(selectedEmail?.id || '')"
              @archive="archiveEmail(selectedEmail?.id || '')"
              @action="handleDetailAction"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Email Composer Modal -->
    <EmailComposer
      :visible="composerVisible"
      @update:visible="composerVisible = $event"
      @send="handleEmailSent"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { NButton, NIcon, NInput, NCheckbox, NSpin, NPagination, useMessage } from 'naive-ui';
import EmailSidebar from './widgets/EmailSidebar.vue';
import EmailListItem from './widgets/EmailListItem.vue';
import EmailDetail from './widgets/EmailDetail.vue';
import EmailComposer from './widgets/EmailComposer.vue';
import { useEmailFetch } from './composables/useEmailFetch';
import { ITEMS_PER_PAGE } from './constants';
import type { Email } from './types';

const {
  emails,
  paginatedEmails,
  loading,
  currentPage,
  totalPages,
  fetchEmails,
  search,
  markAsRead,
  toggleStar,
  deleteEmail: deleteEmailFromList,
} = useEmailFetch();

const message = useMessage();
const isMobile = ref(window.innerWidth < 768);
const sidebarOpen = ref(false);
const composerVisible = ref(false);
const selectedEmail = ref<Email | undefined>();
const selectedEmails = ref<string[]>([]);
const selectAll = ref(false);
const searchQuery = ref('');
const currentFolder = ref('inbox');
const currentLabel = ref<string | null>(null);

// Responsive handling
if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 768;
    if (window.innerWidth >= 768) {
      sidebarOpen.value = false;
    }
  });
}

const currentFolderName = computed(() => {
  const folderName: Record<string, string> = {
    inbox: 'Inbox',
    starred: 'Starred',
    sent: 'Sent',
    drafts: 'Drafts',
    spam: 'Spam',
    trash: 'Trash',
  };
  return folderName[currentFolder.value] || 'Inbox';
});

const handleSearch = (query: string) => {
  search(query);
  currentPage.value = 1;
};

const handleFolderSelect = (folderId: string) => {
  currentFolder.value = folderId;
  currentLabel.value = null;
  selectedEmail.value = undefined;
  selectedEmails.value = [];
  selectAll.value = false;
  fetchEmails(folderId);
};

const handleLabelSelect = (labelId: string) => {
  currentLabel.value = labelId;
  selectedEmail.value = undefined;
  selectedEmails.value = [];
  selectAll.value = false;
};

const selectEmail = (email: Email) => {
  selectedEmail.value = email;
  if (!email.read) {
    markAsRead(email.id);
  }
  if (isMobile.value) {
    sidebarOpen.value = false;
  }
};

const handleSelectEmail = (emailId: string, checked: boolean) => {
  if (checked) {
    selectedEmails.value.push(emailId);
  } else {
    selectedEmails.value = selectedEmails.value.filter((id) => id !== emailId);
  }
};

const handleSelectAll = (checked: boolean) => {
  if (checked) {
    selectedEmails.value = paginatedEmails.value.map((e) => e.id);
  } else {
    selectedEmails.value = [];
  }
};

const toggleStarEmail = (emailId: string) => {
  toggleStar(emailId);
  if (selectedEmail.value?.id === emailId) {
    selectedEmail.value = emails.value.find((e) => e.id === emailId);
  }
};

const deleteEmailConfirm = (emailId: string) => {
  message.info('Email moved to trash', {
    closable: true,
  });
  deleteEmailFromList(emailId);
  if (selectedEmail.value?.id === emailId) {
    selectedEmail.value = undefined;
  }
};

const archiveEmail = (emailId: string) => {
  message.info('Email archived', {
    closable: true,
  });
  deleteEmailFromList(emailId);
  if (selectedEmail.value?.id === emailId) {
    selectedEmail.value = undefined;
  }
};

const handleDetailAction = (action: string) => {
  if (!selectedEmail.value) return;

  switch (action) {
    case 'reply':
      composerVisible.value = true;
      break;
    case 'reply-all':
      composerVisible.value = true;
      break;
    case 'forward':
      composerVisible.value = true;
      break;
    case 'spam':
      message.warning('Email marked as spam');
      break;
    case 'unsubscribe':
      message.info('Unsubscribe request sent');
      break;
  }
};

const openComposer = () => {
  composerVisible.value = true;
};

const handleEmailSent = () => {
  message.success('Email sent successfully!');
  fetchEmails(currentFolder.value);
};

onMounted(() => {
  fetchEmails(currentFolder.value);
});
</script>

<style scoped lang="scss">
.email-app {
  width: 100%;
  height: 100vh;
  background: var(--bg-primary);
  display: flex;
  overflow: hidden;

  .app-container {
    width: 100%;
    display: flex;
    overflow: hidden;
  }

  .sidebar-wrapper {
    width: 280px;
    background: var(--bg-primary);
    border-right: 1px solid var(--border-color);
    overflow-y: auto;

    @media (max-width: 768px) {
      position: fixed;
      left: 0;
      top: 0;
      height: 100vh;
      z-index: 999;
      transform: translateX(-100%);
      transition: transform 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

      &.mobile-open {
        transform: translateX(0);
      }
    }
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .app-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: var(--bg-primary);
      border-bottom: 1px solid var(--border-color);
      gap: 12px;

      .header-left {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
        min-width: 0;

        .search-bar {
          flex: 1;
          max-width: 400px;

          @media (max-width: 768px) {
            max-width: 100%;
          }
        }
      }

      .header-right {
        display: flex;
        gap: 8px;
      }
    }

    .content-wrapper {
      flex: 1;
      display: flex;
      gap: 0;
      overflow: hidden;

      @media (max-width: 1024px) {
        flex-direction: column;
      }
    }

    .email-list-container {
      width: 380px;
      display: flex;
      flex-direction: column;
      border-right: 1px solid var(--border-color);
      background: var(--bg-primary);
      overflow: hidden;

      @media (max-width: 1024px) {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid var(--border-color);
        flex-basis: 40%;
      }

      @media (max-width: 768px) {
        flex-basis: 50%;
      }

      .list-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        border-bottom: 1px solid var(--border-color);

        h2 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #000;
        }

        .list-controls {
          display: flex;
          gap: 8px;
        }
      }

      .empty-state {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 32px 16px;

        .empty-icon {
          font-size: 48px;
          color: #ccc;
          margin-bottom: 12px;
        }

        p {
          margin: 0;
          color: #999;
          font-size: 14px;
        }
      }

      .emails-list {
        flex: 1;
        overflow-y: auto;
      }

      .pagination {
        padding: 12px;
        border-top: 1px solid var(--border-color);
        display: flex;
        justify-content: center;
      }
    }

    .email-detail-container {
      flex: 1;
      background: var(--bg-primary);
      overflow: hidden;

      @media (max-width: 1024px) {
        display: none;

        &.active {
          display: flex;
        }
      }

      @media (max-width: 768px) {
        display: none;
      }
    }
  }
}

@media (max-width: 768px) {
  .email-app {
    :deep(.n-input__input-el) {
      font-size: 16px;
    }
  }
}
</style>
