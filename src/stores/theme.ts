/**
 * Theme Store
 *
 * Manages all user-configurable theme preferences for the application.
 * State is automatically persisted to localStorage via the useLocalStorage composable.
 *
 * Available settings:
 * - isDark:        Toggle between dark and light mode
 * - isBoxed:       Enable a max-width content wrapper (boxed layout)
 * - isMiniSidebar: Collapse sidebar to icon-only mode
 * - isBordered:    Switch between bordered and shadow card styles
 * - isWinterMode:  Enable the winter snow particle effect
 * - primaryColor:  Brand accent color (hex string)
 * - pageAnimation: Named Vue transition for page changes
 *
 * @module stores/theme
 */
import { defineStore } from 'pinia'
import { watch } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { THEME_CONSTANTS } from '@/constants'
import { adjustColor } from '@/utils/theme-utils'

export const useThemeStore = defineStore('theme', () => {
  const isDark = useLocalStorage('byxora-theme-isDark', false)
  const isBoxed = useLocalStorage('byxora-theme-isBoxed', false)
  const isMiniSidebar = useLocalStorage('byxora-theme-isMiniSidebar', false)
  const isBordered = useLocalStorage('byxora-theme-isBordered', false)
  const isWinterMode = useLocalStorage('byxora-theme-isWinterMode', false)
  const primaryColor = useLocalStorage('byxora-theme-primaryColor', THEME_CONSTANTS.DEFAULT_PRIMARY_COLOR as string)
  const pageAnimation = useLocalStorage('byxora-theme-pageAnimation', 'fade')

  /**
   * Enables or disables dark mode.
   * Triggers a data-theme attribute update on the root element.
   * @param value - True for dark mode, false for light mode
   */
  const setDark = (value: boolean) => {
    isDark.value = value
  }

  /**
   * Enables or disables the boxed content layout.
   * @param value - True to constrain content width, false for full-width
   */
  const setBoxed = (value: boolean) => {
    isBoxed.value = value
  }

  /**
   * Collapses or expands the sidebar to icon-only (mini) mode.
   * @param value - True to collapse, false to expand
   */
  const setMiniSidebar = (value: boolean) => {
    isMiniSidebar.value = value
  }

  /**
   * Switches between bordered and shadow card styles.
   * @param value - True for bordered style, false for shadow style
   */
  const setBordered = (value: boolean) => {
    isBordered.value = value
  }

  /**
   * Enables or disables the winter snow particle effect.
   * @param value - True to enable snow, false to disable
   */
  const setWinterMode = (value: boolean) => {
    isWinterMode.value = value
  }

  /**
   * Updates the primary brand accent color.
   * Triggers CSS variable updates on the root element.
   * @param color - Hex color string (e.g., '#6366f1')
   */
  const setPrimaryColor = (color: string) => {
    primaryColor.value = color
  }

  /**
   * Sets the named Vue transition used for page navigation.
   * @param animation - Transition name (e.g., 'fade', 'slide-left', 'zoom')
   */
  const setPageAnimation = (animation: string) => {
    pageAnimation.value = animation
  }

  // Sync data-theme attribute on the root element when dark mode changes
  watch(isDark, (value) => {
    document.documentElement.setAttribute('data-theme', value ? 'dark' : 'light')
  }, { immediate: true })

  // Sync data-winter attribute on the root element when winter mode changes
  watch(isWinterMode, (value) => {
    document.documentElement.setAttribute('data-winter', value ? 'true' : 'false')
  }, { immediate: true })

  // Update CSS custom properties when the primary color changes
  watch(primaryColor, (color) => {
    document.documentElement.style.setProperty('--primary-color', color)
    document.documentElement.style.setProperty('--primary-color-hover', adjustColor(color, 20))
    document.documentElement.style.setProperty('--primary-color-pressed', adjustColor(color, -20))
  }, { immediate: true })

  return {
    isDark,
    isBoxed,
    isMiniSidebar,
    isBordered,
    isWinterMode,
    primaryColor,
    pageAnimation,
    setDark,
    setBoxed,
    setMiniSidebar,
    setBordered,
    setWinterMode,
    setPrimaryColor,
    setPageAnimation
  }
})
