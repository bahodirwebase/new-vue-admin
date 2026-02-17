<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { darkTheme, type GlobalThemeOverrides } from 'naive-ui'
import { useThemeStore } from '@/stores/theme'
import { createThemeOverrides } from '@/utils/theme-utils'
import { THEME_CONSTANTS } from '@/constants/theme'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import WinterSnowEffect from '@/components/WinterSnowEffect.vue'
import hljs from 'highlight.js/lib/core'

const themeStore = useThemeStore()
const isInitialLoading = ref(true)

const theme = computed(() => themeStore.isDark ? darkTheme : null)

const appClasses = computed(() => {
  return [
    themeStore.isBordered ? 'bordered-theme' : 'shadow-theme',
    themeStore.isDark ? 'dark-mode' : 'light-mode'
  ].filter(Boolean).join(' ')
})

const themeOverrides = computed<GlobalThemeOverrides>(() => {
  return createThemeOverrides(themeStore.primaryColor, themeStore.isDark)
})

const logoColor = computed(() => themeStore.primaryColor)

onMounted(() => {
  // Simulate initial loading
  setTimeout(() => {
    isInitialLoading.value = false
  }, 2000)
})

</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides" :breakpoints="THEME_CONSTANTS.BREAKPOINTS" :hljs="hljs">
    <n-message-provider>
      
    <n-global-style />
    
    <!-- Winter Snow Effect -->
    <WinterSnowEffect :is-active="themeStore.isWinterMode" />
    
    <!-- Initial Loading Overlay -->
    <LoadingOverlay v-if="isInitialLoading" :logo-color="logoColor" />
    
    <div :class="appClasses">
      <router-view />
    </div>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped>
</style>
