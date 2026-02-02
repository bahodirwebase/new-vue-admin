<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides" :breakpoints="THEME_CONSTANTS.BREAKPOINTS">
    <n-message-provider>
      
    <n-global-style />
    
    <!-- Initial Loading Overlay -->
    <div v-if="isInitialLoading" class="initial-loading">
      <div class="loading-content">
        <div class="loading-logo">
          <h1 class="logo-text">Vue Admin</h1>
        </div>
        <n-spin size="large" />
        <p class="loading-text">Loading application...</p>
      </div>
    </div>
    
    <div :class="appClasses">
      <router-view />
    </div>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { darkTheme, type GlobalThemeOverrides } from 'naive-ui'
import { useThemeStore } from '@/stores/theme'
import { createThemeOverrides } from '@/utils/theme-utils'
import { THEME_CONSTANTS } from '@/constants/theme'

const themeStore = useThemeStore()
const isInitialLoading = ref(true)

const theme = computed(() => themeStore.isDark ? darkTheme : null)

const appClasses = computed(() => {
  return [
    themeStore.isBoxed ? 'boxed-layout' : '',
    themeStore.isBordered ? 'bordered-theme' : 'shadow-theme',
    themeStore.isDark ? 'dark-mode' : 'light-mode'
  ].filter(Boolean).join(' ')
})

const themeOverrides = computed<GlobalThemeOverrides>(() => {
  return createThemeOverrides(themeStore.primaryColor, themeStore.isDark)
})

onMounted(() => {
  // Simulate initial loading
  setTimeout(() => {
    isInitialLoading.value = false
  }, 2000)
})
</script>

<style scoped>
.boxed-layout {
  max-width: 1400px;
  margin: 0 auto;
}

.initial-loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
}

.loading-logo {
  margin-bottom: 16px;
}

.logo-text {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.5px;
}

.loading-text {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-weight: 400;
}

/* Dark mode adjustments */
:global(.dark-mode) .initial-loading {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
}

/* Responsive */
@media (max-width: 768px) {
  .logo-text {
    font-size: 2rem;
  }
  
  .loading-text {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .logo-text {
    font-size: 1.8rem;
  }
  
  .loading-content {
    gap: 20px;
  }
}
</style>
