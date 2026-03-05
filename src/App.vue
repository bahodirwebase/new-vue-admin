<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue'
import { NConfigProvider, NMessageProvider, NGlobalStyle } from 'naive-ui'
import { THEME_CONSTANTS } from '@/constants/theme'
import { useThemeStore } from '@/stores/theme'
import { useAppInit } from '@/composables/useAppInit'
import { useThemeConfig } from '@/composables/useThemeConfig'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import WinterSnowEffect from '@/components/WinterSnowEffect.vue'
import hljs from 'highlight.js/lib/core'

/**
 * App Component - Root application component
 * 
 * This component serves as the main application wrapper that:
 * - Manages theme configuration and switching
 * - Handles initial loading state
 * - Provides global configuration for naive-ui
 * - Renders winter effects when enabled
 * 
 * @component
 * @version 1.0.0
 * @author Elite Author
 */

// Initialize theme configuration
const { theme, appClasses, themeOverrides, primaryColor } = useThemeConfig()

// Initialize app state
const { isLoading, logoColor } = useAppInit({
  loadingDuration: 2000,
  simulateLoading: true
})

// Get theme store for additional reactive data
const themeStore = useThemeStore()

/**
 * Watch for primary color changes and update logo color
 */
watch(primaryColor, (newColor) => {
  logoColor.value = newColor
}, { immediate: true })

/**
 * Naive UI renders role="heading" on .n-card-header but omits aria-level,
 * which fails ARIA spec. Patch existing and future elements via MutationObserver.
 */
function patchCardHeaders(root: Element | Document = document) {
  root.querySelectorAll<HTMLElement>('.n-card-header[role="heading"]:not([aria-level])').forEach(el => {
    el.setAttribute('aria-level', '2')
  })
}

let ariaObserver: MutationObserver | null = null

onMounted(() => {
  patchCardHeaders()
  ariaObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach(node => {
        if (!(node instanceof Element)) return
        if (node.classList.contains('n-card-header') &&
            node.getAttribute('role') === 'heading' &&
            !node.getAttribute('aria-level')) {
          node.setAttribute('aria-level', '2')
        }
        patchCardHeaders(node)
      })
    }
  })
  ariaObserver.observe(document.body, { childList: true, subtree: true })
})

onUnmounted(() => {
  ariaObserver?.disconnect()
})


</script>

<!--
  App Component Template
  
  This template provides the main application structure with:
  - Global configuration provider for naive-ui
  - Message provider for notifications
  - Winter effects component (conditionally rendered)
  - Loading overlay (shown during initialization)
  - Main app container with dynamic CSS classes
  - Router view for page navigation
-->
<template>
  <!-- Global configuration provider with theme and breakpoints -->
  <n-config-provider 
    :theme="theme" 
    :theme-overrides="themeOverrides" 
    :breakpoints="THEME_CONSTANTS.BREAKPOINTS" 
    :hljs="hljs"
  >
    <!-- Message provider for global notifications -->
    <n-message-provider>
      <!-- Global styles for naive-ui components -->
      <n-global-style />
      
      <!-- Winter Snow Effect - renders when winter mode is enabled -->
      <WinterSnowEffect 
        :is-active="themeStore.isWinterMode" 
        aria-label="Winter snow effect animation"
      />
      
      <!-- Initial Loading Overlay - shown during app initialization -->
      <LoadingOverlay 
        v-if="isLoading" 
        :logo-color="logoColor" 
        aria-label="Application loading screen"
      />
      
      <!-- Main application container with dynamic theme classes -->
      <div 
        :class="appClasses"
        role="main"
        :aria-label="themeStore.isDark ? 'Dark mode application' : 'Light mode application'"
      >
        <!-- Router view for page content -->
        <router-view />
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

