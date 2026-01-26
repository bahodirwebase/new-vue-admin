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
        @click="minimizeSidebar"
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
        <n-button v-if="!isMobile" quaternary circle @click="toggleFullscreen" class="fullscreen-toggle">
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

        
        <Notification />
        <Account />
        
      </n-space>
    </div>
  </n-layout-header>
</template>

<script setup lang="ts">
import { h } from 'vue'
import type { DropdownOption } from 'naive-ui'
import {
  MenuOutline,
  MailOutline,
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
import { useBreakpoints } from '@/composables'
import { useFullscreen } from '@/composables'
import { NIcon } from 'naive-ui'

import Account from './components/Account.vue'
import Notification from './components/Notification.vue'


const themeStore = useThemeStore()
const { isMobile } = useBreakpoints()

const { isFullscreen, toggleFullscreen } = useFullscreen()

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

const minimizeSidebar = () => {
  themeStore.setMiniSidebar(!themeStore.isMiniSidebar)
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
/* Responsive adjustments */
@media (max-width: 768px) {
  .app-header {
    padding: 0 16px;
  }
  
  .header-left {
    min-width: 0;
  }
}

@media (max-width: 480px) {
  .app-header {
    padding: 0 12px;
  }
}
</style>
