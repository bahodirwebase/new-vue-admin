<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides" :breakpoints="THEME_CONSTANTS.BREAKPOINTS">
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
import { createThemeOverrides } from '@/utils/theme-utils'
import { THEME_CONSTANTS } from '@/constants/theme'

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
  return createThemeOverrides(themeStore.primaryColor, themeStore.isDark)
})
</script>

<style scoped>
.boxed-layout {
  max-width: 1400px;
  margin: 0 auto;
}

</style>
