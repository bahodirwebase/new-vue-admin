import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)
  const isBoxed = ref(false)
  const isMiniSidebar = ref(false)
  const isBordered = ref(false)

  // Load from localStorage
  const loadSettings = () => {
    const stored = localStorage.getItem('manga-theme-settings')
    if (stored) {
      const settings = JSON.parse(stored)
      isDark.value = settings.isDark ?? false
      isBoxed.value = settings.isBoxed ?? false
      isMiniSidebar.value = settings.isMiniSidebar ?? false
      isBordered.value = settings.isBordered ?? false
    }
  }

  // Save to localStorage
  const saveSettings = () => {
    localStorage.setItem('manga-theme-settings', JSON.stringify({
      isDark: isDark.value,
      isBoxed: isBoxed.value,
      isMiniSidebar: isMiniSidebar.value,
      isBordered: isBordered.value
    }))
  }

  // Watch for changes and save
  watch([isDark, isBoxed, isMiniSidebar, isBordered], () => {
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

  // Keep document theme attribute in sync
  watch(isDark, (value) => {
    document.documentElement.setAttribute('data-theme', value ? 'dark' : 'light')
  }, { immediate: true })

  // Initialize
  loadSettings()

  return {
    isDark,
    isBoxed,
    isMiniSidebar,
    isBordered,
    setDark,
    setBoxed,
    setMiniSidebar,
    setBordered
  }
})
