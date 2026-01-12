<template>
  <n-layout-header class="app-header" :inverted="themeStore.isDark">
    <div class="header-left">
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
      <n-breadcrumb v-else>
        <n-breadcrumb-item>
          <router-link to="/dashboard">Home</router-link>
        </n-breadcrumb-item>
        <n-breadcrumb-item>
          {{ currentPageTitle }}
        </n-breadcrumb-item>
      </n-breadcrumb>
    </div>

    <div class="header-right">
      <n-space :size="isMobile ? 8 : 16">
        <n-popover trigger="hover" placement="bottom-end">
          <template #trigger>
            <n-button quaternary circle>
              <template #icon>
                <n-icon :component="NotificationsOutline" :size="20" />
              </template>
            </n-button>
          </template>
          <div class="notification-dropdown">
            <div class="notification-item">
              <div class="notification-content">
                <div class="notification-title">New message</div>
                <div class="notification-text">You have a new message</div>
              </div>
            </div>
          </div>
        </n-popover>

        <n-popover trigger="click" placement="bottom-end">
          <template #trigger>
            <n-button quaternary>
              <template #icon>
                <n-icon :component="SettingsOutline" :size="20" />
              </template>
              <span class="theme-text" v-if="isDesktop">Theme Settings</span>
            </n-button>
          </template>
          <div class="theme-settings">
            <n-space vertical :size="12">
              <n-switch :value="themeStore.isDark" @update:value="themeStore.setDark">
                <template #checked>Dark Mode</template>
                <template #unchecked>Light Mode</template>
              </n-switch>
              <n-switch :value="themeStore.isBoxed" @update:value="themeStore.setBoxed">
                <template #checked>Boxed Layout</template>
                <template #unchecked>Full Width</template>
              </n-switch>
              <n-switch :value="themeStore.isMiniSidebar" @update:value="themeStore.setMiniSidebar">
                <template #checked>Mini Sidebar</template>
                <template #unchecked>Full Sidebar</template>
              </n-switch>
              <n-switch :value="themeStore.isBordered" @update:value="themeStore.setBordered">
                <template #checked>Bordered Theme</template>
                <template #unchecked>Shadow Theme</template>
              </n-switch>
            </n-space>
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
import { computed, h, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import type { DropdownOption } from 'naive-ui'
import {
  NotificationsOutline,
  SettingsOutline,
  PersonCircleOutline,
  LogOutOutline,
  MenuOutline
} from '@vicons/ionicons5'
import { useThemeStore } from '@/stores/theme'
import { NIcon } from 'naive-ui'

const route = useRoute()
const themeStore = useThemeStore()

const windowWidth = ref(window.innerWidth)

const isMobile = computed(() => windowWidth.value < 768)
const isDesktop = computed(() => windowWidth.value >= 768)

const emit = defineEmits<{
  toggleSidebar: []
}>()

const toggleSidebar = () => {
  emit('toggleSidebar')
}

onMounted(() => {
  const handleResize = () => {
    windowWidth.value = window.innerWidth
  }
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', () => {})
})

const currentPageTitle = computed(() => {
  return route.meta?.title || 'Dashboard'
})

const userMenuOptions: DropdownOption[] = [
  {
    label: 'Profile',
    key: 'profile'
  },
  {
    label: 'Settings',
    key: 'settings'
  },
  {
    type: 'divider'
  },
  {
    label: 'Logout',
    key: 'logout',
    icon: () => h(NIcon, { component: LogOutOutline })
  }
]
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

.theme-text {
  margin-left: 8px;
}

.theme-settings {
  padding: 8px;
  min-width: 200px;
  max-width: 90vw;
}

.notification-dropdown {
  padding: 8px;
  min-width: 300px;
  max-width: 90vw;
}

.notification-item {
  padding: 12px;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.notification-item:hover {
  background-color: var(--bg-tertiary);
}

.notification-title {
  font-weight: 600;
  margin-bottom: 4px;
  color: var(--text-primary);
}

.notification-text {
  font-size: 13px;
  color: var(--text-secondary);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .app-header {
    padding: 0 16px;
  }
  
  .header-left {
    min-width: 0;
  }
  
  .theme-settings {
    min-width: 180px;
  }
  
  .notification-dropdown {
    min-width: 250px;
  }
}

@media (max-width: 480px) {
  .app-header {
    padding: 0 12px;
  }
  
  .theme-settings {
    min-width: 160px;
  }
  
  .notification-dropdown {
    min-width: 200px;
  }
}
</style>
