<!-- widgets/EmailSidebar.vue -->
<template>
  <div class="email-sidebar">
    <!-- Logo -->
    <div class="sidebar-header">
      <n-button
        v-if="isMobile"
        text
        type="primary"
        :icon-placement="'left'"
        @click="toggleSidebar"
      >
        <template #icon>
          <n-icon>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </n-icon>
        </template>
      </n-button>
      <h2>MailBox</h2>
    </div>

    <!-- Compose Button -->
    <n-button
      block
      type="primary"
      size="large"
      class="compose-button"
      @click="handleCompose"
    >
      <template #icon>
        <n-icon>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
            <path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        </n-icon>
      </template>
      Compose
    </n-button>

    <!-- Folders -->
    <div class="folders-section">
      <h3 class="section-title">Folders</h3>
      <n-menu
        :value="selectedFolder"
        :options="folderOptions"
        :collapsed="false"
        @update:value="handleFolderSelect"
      />
    </div>

    <!-- Labels -->
    <div class="labels-section">
      <div class="labels-header">
        <h3 class="section-title">Labels</h3>
        <n-button text type="primary" size="small">
          <template #icon>
            <n-icon>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </n-icon>
          </template>
        </n-button>
      </div>
      <div class="labels-list">
        <div
          v-for="label in labels"
          :key="label.id"
          class="label-item"
          :class="{ 'active': selectedLabel === label.id }"
          @click="handleLabelSelect(label.id)"
        >
          <div class="label-color" :style="{ backgroundColor: label.color }"></div>
          <span class="label-name">{{ label.name }}</span>
        </div>
      </div>
    </div>

    <!-- Account Settings -->
    <div class="sidebar-footer">
      <n-dropdown
        :options="accountOptions"
        placement="top-start"
        @select="handleAccountAction"
      >
        <div class="account-info">
          <n-avatar
            round
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
          />
          <div class="account-details">
            <p class="account-name">Your Name</p>
            <p class="account-email">user@example.com</p>
          </div>
        </div>
      </n-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { NButton, NIcon, NMenu, NDropdown, NAvatar } from 'naive-ui';
import type { Folder } from '../types';
import { DEFAULT_FOLDERS, EMAIL_LABELS } from '../constants';

interface Emits {
  (e: 'compose-click'): void;
  (e: 'folder-select', value: string): void;
  (e: 'label-select', value: string): void;
  (e: 'account-action', value: string): void;
  (e: 'toggle-sidebar'): void;
}

const emits = defineEmits<Emits>();

const selectedFolder = ref('inbox');
const selectedLabel = ref<string | null>(null);
const isMobile = ref(window.innerWidth < 768);
const sidebarOpen = ref(true);

const labels = EMAIL_LABELS;

const folderOptions = computed(() => {
  return DEFAULT_FOLDERS.map((folder) => ({
    label: () => {
      return `${folder.name} ${folder.unreadCount > 0 ? `(${folder.unreadCount})` : ''}`;
    },
    key: folder.id,
    icon: () => {
      const icons: Record<string, string> = {
        inbox: '📥',
        starred: '⭐',
        sent: '📤',
        drafts: '📝',
        spam: '⚠️',
        trash: '🗑️',
      };
      return icons[folder.id] || '📧';
    },
  }));
});

const accountOptions = [
  { label: 'Profile', key: 'profile' },
  { label: 'Settings', key: 'settings' },
  { label: 'Help', key: 'help' },
  { type: 'divider', key: 'd1' },
  { label: 'Logout', key: 'logout' },
];

const handleCompose = () => {
  emits('compose-click');
};

const handleFolderSelect = (key: string | number) => {
  selectedFolder.value = key as string;
  selectedLabel.value = null;
  emits('folder-select', key as string);
};

const handleLabelSelect = (labelId: string) => {
  if (selectedLabel.value === labelId) {
    selectedLabel.value = null;
  } else {
    selectedLabel.value = labelId;
    emits('label-select', labelId);
  }
};

const handleAccountAction = (key: string | number) => {
  emits('account-action', key as string);
};

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
  emits('toggle-sidebar');
};

// Responsive handling
if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 768;
  });
}
</script>

<style scoped lang="scss">
.email-sidebar {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--bg-primary);
  border-right: 1px solid var(--border-color);
  padding: 12px;

  .sidebar-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;

    h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      color: var(--text-color-1);
    }
  }

  .compose-button {
    margin-bottom: 16px;
  }

  .folders-section {
    margin-bottom: 16px;
  }

  .section-title {
    margin: 0 0 8px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--text-color-3);
    padding: 0 8px;
  }

  .labels-section {
    margin-bottom: 16px;

    .labels-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .labels-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
  }

  .label-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: var(--bg-tertiary);
    }

    &.active {
      background-color: var(--primary-color);
      color: white;
    }

    .label-color {
      width: 12px;
      height: 12px;
      border-radius: 2px;
      flex-shrink: 0;
    }

    .label-name {
      font-size: 13px;
      flex: 1;
    }
  }

  .sidebar-footer {
    margin-top: auto;
    padding-top: 12px;
    border-top: 1px solid var(--border-color);

    .account-info {
      display: flex;
      gap: 8px;
      align-items: center;
      padding: 8px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background-color: #f5f5f5;
      }

      .account-details {
        flex: 1;
        min-width: 0;

        p {
          margin: 0;
          font-size: 13px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .account-name {
          font-weight: 600;
          color: var(--text-color-1);
        }

        .account-email {
          color: var(--text-color-3);
          font-size: 12px;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .email-sidebar {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    width: 280px;
    height: 100vh;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
}
</style>
