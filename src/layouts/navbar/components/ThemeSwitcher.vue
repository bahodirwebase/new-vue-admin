<script lang="ts" setup>
import { useThemeStore } from '@/stores/theme'
import { SunnyOutline, MoonOutline } from '@vicons/ionicons5'
import { NButton, NIcon } from 'naive-ui'

const themeStore = useThemeStore()

const toggleTheme = () => {
    themeStore.setDark(!themeStore.isDark)
}
</script>

<template>
    <n-button quaternary circle @click="toggleTheme" class="theme-toggle">
        <template #icon>
            <n-icon :component="themeStore.isDark ? SunnyOutline : MoonOutline" :size="20" />
        </template>
    </n-button>
</template>