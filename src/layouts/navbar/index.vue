<template>
    <n-layout-header class="app-header" :inverted="themeStore.isDark">
        <div class="header-left">
            <!-- Sidebar Toggle (Mobile) -->
            <n-button v-if="isMobile" quaternary circle @click="toggleSidebar" class="hamburger-menu">
                <template #icon>
                    <n-icon :component="MenuOutline" :size="20" />
                </template>
            </n-button>

            <!-- Sidebar Toggle (Desktop) -->
            <n-button v-if="!isMobile" quaternary circle @click="minimizeSidebar" class="sidebar-toggle">
                <template #icon>
                    <n-icon :component="themeStore.isMiniSidebar ? ChevronForwardOutline : ChevronBackOutline"
                        :size="20" />
                </template>
            </n-button>
        </div>

        <div class="header-right">
            <n-space :size="isMobile ? 8 : 16">
                <ThemeSwitcher class="nav-item" />
                <FullScreen v-if="!isMobile" class="nav-item" />
                <Language class="nav-item" />
                <Apps v-if="!isMobile" class="nav-item" />
                <Notification class="nav-item" />
                <Account class="nav-item" />
            </n-space>
        </div>
    </n-layout-header>
</template>

<script setup lang="ts">
import {
    MenuOutline,
    ChevronForwardOutline,
    ChevronBackOutline
} from '@vicons/ionicons5'
import { useThemeStore } from '@/stores/theme'
import { useBreakpoints } from '@/composables'
import { NIcon } from 'naive-ui'

import Account from './components/Account.vue'
import Notification from './components/Notification.vue'
import Apps from './components/Apps.vue'
import Language from './components/Language.vue'
import FullScreen from './components/FullScreen.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'

const themeStore = useThemeStore()
const { isMobile } = useBreakpoints()


const emit = defineEmits<{
    toggleSidebar: []
}>()

const toggleSidebar = () => {
    themeStore.setMiniSidebar(!themeStore.isMiniSidebar)
    emit('toggleSidebar')
}


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

.nav-item {
    transition: all 0.3s ease;
}

.nav-item:hover {
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
