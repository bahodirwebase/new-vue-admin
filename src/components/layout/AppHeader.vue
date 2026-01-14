<template>
  <n-layout-header class="app-header" :inverted="themeStore.isDark">
    <div class="header-left">
      <!-- Sidebar Toggle (Mobile) -->
      <n-button 
        v-if="isMobile" 
        quaternary 
        circle 
        @click="toggleSidebar"
        class="hamburger-menu"
      >
        <template #icon>
          <n-icon :component="MenuOutline" :size="20" />
        </template>
      </n-button>
      
      <!-- Sidebar Toggle (Desktop) -->
      <n-button 
        v-if="!isMobile" 
        quaternary 
        circle 
        @click="toggleSidebar"
        class="sidebar-toggle"
      >
        <template #icon>
          <n-icon :component="themeStore.isMiniSidebar ? ChevronForwardOutline : ChevronBackOutline" :size="20" />
        </template>
      </n-button>
    </div>

    <div class="header-right">
      <n-space :size="isMobile ? 8 : 16">
        <!-- Dark/Light Mode Toggle -->
        <n-button quaternary circle @click="toggleTheme" class="theme-toggle">
          <template #icon>
            <n-icon :component="themeStore.isDark ? SunnyOutline : MoonOutline" :size="20" />
          </template>
        </n-button>

        <!-- Fullscreen Toggle -->
        <n-button quaternary circle @click="toggleFullscreen" class="fullscreen-toggle">
          <template #icon>
            <n-icon v-if="!isFullscreen" :component="ExpandOutline" :size="20" />
            <n-icon v-else :component="ContractOutline" :size="20" />
          </template>
        </n-button>

        <!-- Language Selector -->
        <n-dropdown :options="languageOptions" placement="bottom-end">
          <n-button quaternary circle class="language-toggle">
            <template #icon>
              <n-icon :component="LanguageOutline" :size="20" />
            </template>
          </n-button>
        </n-dropdown>

        <!-- Apps Launcher -->
        <n-dropdown :options="appsOptions" placement="bottom-end">
          <n-button quaternary circle class="apps-toggle">
            <template #icon>
              <n-icon :component="AppsOutline" :size="20" />
            </template>
          </n-button>
        </n-dropdown>

        <n-popover trigger="hover" placement="bottom-end">
          <template #trigger>
            <n-button quaternary circle class="notification-button">
              <template #icon>
                <n-icon :component="NotificationsOutline" :size="20" />
              </template>
              <n-badge :value="unreadCount" :max="99" class="notification-badge" />
            </n-button>
          </template>
          <div class="notification-dropdown">
            <div class="notification-header">
              <span class="notification-title">Notifications</span>
              <n-button text size="small" @click="markAllAsRead">Mark all as read</n-button>
            </div>
            <div class="notification-list">
              <div 
                v-for="notification in notifications" 
                :key="notification.id"
                class="notification-item"
                :class="{ 'unread': !notification.read }"
                @click="markAsRead(notification.id)"
              >
                <div class="notification-avatar">
                  <n-avatar round :size="40" :style="{ backgroundColor: notification.color }">
                    <n-icon :component="notification.icon" :size="20" style="color: white;" />
                  </n-avatar>
                </div>
                <div class="notification-content">
                  <div class="notification-message">{{ notification.message }}</div>
                  <div class="notification-time">{{ notification.time }}</div>
                </div>
                <div v-if="!notification.read" class="notification-dot"></div>
              </div>
            </div>
            <div class="notification-footer">
              <n-button text block>View all notifications</n-button>
            </div>
          </div>
        </n-popover>

        <n-dropdown :options="userMenuOptions" placement="bottom-end">
          <n-avatar round :size="32" style="cursor: pointer">
            <n-icon :component="PersonCircleOutline" :size="24" />
          </n-avatar>
        </n-dropdown>
      </n-space>
    </div>
  </n-layout-header>
</template>

<script setup lang="ts">
import { computed, h, ref, markRaw, onMounted, onUnmounted } from 'vue'
import type { DropdownOption } from 'naive-ui'
import {
  NotificationsOutline,
  PersonCircleOutline,
  LogOutOutline,
  MenuOutline,
  MailOutline,
  BagOutline,
  CheckmarkCircleOutline,
  AlertCircleOutline,
  ChatbubbleOutline,
  GridOutline,
  HelpCircleOutline,
  WalletOutline,
  LockClosedOutline,
  CogOutline,
  SunnyOutline,
  MoonOutline,
  ExpandOutline,
  ContractOutline,
  LanguageOutline,
  AppsOutline,
  DocumentTextOutline,
  AnalyticsOutline,
  ChevronForwardOutline,
  ChevronBackOutline
} from '@vicons/ionicons5'
import { useThemeStore } from '@/stores/theme'
import { NIcon } from 'naive-ui'

const themeStore = useThemeStore()

const windowWidth = ref(window.innerWidth)
const isFullscreen = ref(false)

const isMobile = computed(() => windowWidth.value < 768)

const emit = defineEmits<{
  toggleSidebar: []
}>()

const toggleSidebar = () => {
  themeStore.setMiniSidebar(!themeStore.isMiniSidebar)
  emit('toggleSidebar')
}

const toggleTheme = () => {
  themeStore.setDark(!themeStore.isDark)
}


const languageOptions: DropdownOption[] = [
  {
    label: 'English',
    key: 'en'
  },
  {
    label: 'Russian',
    key: 'ru'
  },
  {
    label: 'Uzbek',
    key: 'uz'
  }
]

const appsOptions: DropdownOption[] = [
  {
    label: 'Email',
    key: 'email',
    icon: () => h(NIcon, { component: MailOutline })
  },
  {
    label: 'Documents',
    key: 'documents',
    icon: () => h(NIcon, { component: DocumentTextOutline })
  },
  {
    label: 'Analytics',
    key: 'analytics',
    icon: () => h(NIcon, { component: AnalyticsOutline })
  }
]

const updateFullscreenState = () => {
  isFullscreen.value = !!document.fullscreenElement
}

onMounted(() => {
  updateFullscreenState()
  document.addEventListener('fullscreenchange', updateFullscreenState)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', updateFullscreenState)
})

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
    // Toggle sidebar when exiting fullscreen
    emit('toggleSidebar')
  }
}

const userMenuOptions: DropdownOption[] = [
  {
    label: 'Welcome Admin!',
    key: 'welcome',
    props: {
      style: {
        fontWeight: '700',
        fontSize: '14px',
        color: 'var(--primary-color)',
        padding: '0px 12px',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderRadius: '6px',
        margin: '4px 8px',
        textAlign: 'center'
      }
    }
  },
  {
    label: 'Profile',
    key: 'profile',
    icon: () => h(NIcon, { component: PersonCircleOutline })
  },
  {
    label: 'Messages',
    key: 'messages',
    icon: () => h(NIcon, { component: ChatbubbleOutline })
  },
  {
    label: 'Taskboard',
    key: 'taskboard',
    icon: () => h(NIcon, { component: GridOutline })
  },
  {
    label: 'Help',
    key: 'help',
    icon: () => h(NIcon, { component: HelpCircleOutline })
  },
  {
    label: 'Balance : $5971.67',
    key: 'balance',
    icon: () => h(NIcon, { component: WalletOutline, style: 'color: var(--color-success)' }),
    props: {
      style: {
        fontWeight: '600',
        color: 'var(--color-success)'
      }
    }
  },
  {
    type: 'divider'
  },
  {
    label: 'Settings',
    key: 'new-settings',
    icon: () => h(NIcon, { component: CogOutline })
  },
  {
    label: 'Lock screen',
    key: 'lock-screen',
    icon: () => h(NIcon, { component: LockClosedOutline })
  },
  {
    label: 'Logout',
    key: 'logout',
    icon: () => h(NIcon, { component: LogOutOutline })
  }
]

// Notification data and functions
const notifications = ref([
  {
    id: 1,
    message: 'New order received from John Doe',
    time: '2 minutes ago',
    read: false,
    icon: markRaw(BagOutline),
    color: '#3b82f6'
  },
  {
    id: 2,
    message: 'You have a new message from support',
    time: '15 minutes ago',
    read: false,
    icon: markRaw(MailOutline),
    color: '#10b981'
  },
  {
    id: 3,
    message: 'Your order #12345 has been shipped',
    time: '1 hour ago',
    read: true,
    icon: markRaw(CheckmarkCircleOutline),
    color: '#f59e0b'
  },
  {
    id: 4,
    message: 'System maintenance scheduled for tonight',
    time: '3 hours ago',
    read: true,
    icon: markRaw(AlertCircleOutline),
    color: '#ef4444'
  }
])

const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length
})

const markAsRead = (id: number) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) {
    notification.read = true
  }
}

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true)
}
</script>

<style scoped>
.app-header {
  height: 64px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-primary);
  position: sticky;
  top: 0;
  z-index: 99;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.header-left {
  display: flex;
  align-items: center;
  min-width: 0;
  flex: 1;
}

.header-right {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.notification-button {
  position: relative;
}

.theme-toggle,
.fullscreen-toggle,
.language-toggle,
.apps-toggle {
  transition: all 0.3s ease;
}

.theme-toggle:hover,
.fullscreen-toggle:hover,
.language-toggle:hover,
.apps-toggle:hover {
  transform: scale(1.1);
  background-color: var(--bg-tertiary);
}

.notification-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  z-index: 1;
}

.notification-dropdown {
  padding: 0;
  min-width: 350px;
  max-width: 90vw;
  max-height: 400px;
  overflow: hidden;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-secondary);
}

.notification-title {
  font-weight: 600;
  color: var(--text-primary);
}

.notification-list {
  max-height: 300px;
  overflow-y: auto;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition: background-color 0.2s;
  position: relative;
}

.notification-item:hover {
  background-color: var(--bg-tertiary);
}

.notification-item.unread {
  background-color: var(--bg-primary);
}

.notification-avatar {
  margin-right: 12px;
  flex-shrink: 0;
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-message {
  font-size: 14px;
  color: var(--text-primary);
  margin-bottom: 4px;
  line-height: 1.4;
}

.notification-time {
  font-size: 12px;
  color: var(--text-secondary);
}

.notification-dot {
  width: 8px;
  height: 8px;
  background-color: #3b82f6;
  border-radius: 50%;
  position: absolute;
  top: 16px;
  right: 12px;
}

.notification-footer {
  padding: 8px 16px;
  border-top: 1px solid var(--border-color);
  background-color: var(--bg-secondary);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .app-header {
    padding: 0 16px;
  }
  
  .header-left {
    min-width: 0;
  }
  
  .notification-dropdown {
    min-width: 300px;
  }
}

@media (max-width: 480px) {
  .app-header {
    padding: 0 12px;
  }
  
  .notification-dropdown {
    min-width: 280px;
  }
}
</style>
