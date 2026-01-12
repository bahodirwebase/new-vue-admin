import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)
  const isBoxed = ref(false)
  const isMiniSidebar = ref(false)
  const isBordered = ref(false)
  const primaryColor = ref('#6366f1')

  // Load from localStorage
  const loadSettings = () => {
    const stored = localStorage.getItem('manga-theme-settings')
    if (stored) {
      const settings = JSON.parse(stored)
      isDark.value = settings.isDark ?? false
      isBoxed.value = settings.isBoxed ?? false
      isMiniSidebar.value = settings.isMiniSidebar ?? false
      isBordered.value = settings.isBordered ?? false
      primaryColor.value = settings.primaryColor ?? '#6366f1'
    }
  }

  // Save to localStorage
  const saveSettings = () => {
    localStorage.setItem('manga-theme-settings', JSON.stringify({
      isDark: isDark.value,
      isBoxed: isBoxed.value,
      isMiniSidebar: isMiniSidebar.value,
      isBordered: isBordered.value,
      primaryColor: primaryColor.value
    }))
  }

  // Watch for changes and save
  watch([isDark, isBoxed, isMiniSidebar, isBordered, primaryColor], () => {
    saveSettings()
  })

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

  // Initialize
  loadSettings()

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
