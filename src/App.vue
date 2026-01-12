<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <n-message-provider>
      
    <n-global-style />
    <div :class="appClasses">
      <router-view />
    </div>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { darkTheme, type GlobalThemeOverrides } from 'naive-ui'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const theme = computed(() => themeStore.isDark ? darkTheme : null)

const appClasses = computed(() => {
  return [
    themeStore.isBoxed ? 'boxed-layout' : '',
    themeStore.isBordered ? 'bordered-theme' : 'shadow-theme',
    themeStore.isDark ? 'dark-mode' : 'light-mode'
  ].filter(Boolean).join(' ')
})

const themeOverrides = computed<GlobalThemeOverrides>(() => {
  const base = themeStore.isDark ? {
    common: {
      primaryColor: '#6366f1',
      primaryColorHover: '#818cf8',
      primaryColorPressed: '#4f46e5',
      primaryColorSuppl: '#6366f1',
      borderRadius: '8px',
      fontSize: '14px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    },
    Card: {
      borderRadius: '12px',
      paddingMedium: '20px',
      color: '#1e293b',
      textColor: '#f8fafc'
    },
    Layout: {
      color: '#0f172a',
      headerColor: '#1e293b',
      siderColor: '#1e293b',
      footerColor: '#1e293b'
    },
    Menu: {
      borderRadius: '8px',
      itemColorActive: '#6366f1',
      itemColorActiveHover: '#818cf8',
      itemColorHover: 'rgba(99, 102, 241, 0.1)'
    }
  } : {
    common: {
      primaryColor: '#6366f1',
      primaryColorHover: '#818cf8',
      primaryColorPressed: '#4f46e5',
      primaryColorSuppl: '#6366f1',
      borderRadius: '8px',
      fontSize: '14px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    },
    Card: {
      borderRadius: '12px',
      paddingMedium: '20px',
      color: '#ffffff',
      textColor: '#0f172a'
    },
    Layout: {
      color: '#f8fafc',
      headerColor: '#ffffff',
      siderColor: '#ffffff',
      footerColor: '#ffffff'
    },
    Menu: {
      borderRadius: '8px',
      itemColorActive: '#6366f1',
      itemColorActiveHover: '#818cf8',
      itemColorHover: 'rgba(99, 102, 241, 0.1)'
    }
  }

  return base
})
</script>

<style scoped>
.boxed-layout {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
