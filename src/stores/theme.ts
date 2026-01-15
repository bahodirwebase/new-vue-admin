import { defineStore } from 'pinia'
import { watch } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { THEME_CONSTANTS } from '@/constants'

export const useThemeStore = defineStore('theme', () => {
  const isDark = useLocalStorage('manga-theme-isDark', false)
  const isBoxed = useLocalStorage('manga-theme-isBoxed', false)
  const isMiniSidebar = useLocalStorage('manga-theme-isMiniSidebar', false)
  const isBordered = useLocalStorage('manga-theme-isBordered', false)
  const primaryColor = useLocalStorage('manga-theme-primaryColor', THEME_CONSTANTS.DEFAULT_PRIMARY_COLOR as string)

  // Setters to keep switches in sync without double toggling
  const setDark = (value: boolean) => {
    isDark.value = value
  }

  const setBoxed = (value: boolean) => {
    isBoxed.value = value
  }

  const setMiniSidebar = (value: boolean) => {
    isMiniSidebar.value = value
  }

  const setBordered = (value: boolean) => {
    isBordered.value = value
  }

  const setPrimaryColor = (color: string) => {
    primaryColor.value = color
  }

  // Helper function to adjust color brightness
  const adjustColor = (color: string, amount: number): string => {
    const num = parseInt(color.replace('#', ''), 16)
    const r = Math.min(255, Math.max(0, (num >> 16) + amount))
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount))
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount))
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
  }

  // Keep document theme attribute in sync
  watch(isDark, (value) => {
    document.documentElement.setAttribute('data-theme', value ? 'dark' : 'light')
  }, { immediate: true })

  // Update CSS variables when primary color changes
  watch(primaryColor, (color) => {
    document.documentElement.style.setProperty('--primary-color', color)
    // Generate hover and pressed colors
    const hoverColor = adjustColor(color, 20)
    const pressedColor = adjustColor(color, -20)
    document.documentElement.style.setProperty('--primary-color-hover', hoverColor)
    document.documentElement.style.setProperty('--primary-color-pressed', pressedColor)
  }, { immediate: true })

  return {
    isDark,
    isBoxed,
    isMiniSidebar,
    isBordered,
    primaryColor,
    setDark,
    setBoxed,
    setMiniSidebar,
    setBordered,
    setPrimaryColor
  }
})
