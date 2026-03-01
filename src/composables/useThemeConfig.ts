import { computed, type ComputedRef } from 'vue'
import { darkTheme, type GlobalThemeOverrides } from 'naive-ui'
import { useThemeStore } from '@/stores/theme'
import { createThemeOverrides } from '@/utils/theme-utils'

/**
 * Interface for theme configuration return values
 */
export interface UseThemeConfigReturn {
  /** Current theme (dark/light) */
  theme: ComputedRef<any>
  /** CSS classes for app container */
  appClasses: ComputedRef<string>
  /** Theme overrides for naive-ui */
  themeOverrides: ComputedRef<GlobalThemeOverrides>
  /** Primary color for branding */
  primaryColor: ComputedRef<string>
}

/**
 * Composable for theme configuration and management
 * Handles theme switching, CSS classes generation, and theme overrides
 * 
 * @returns Theme configuration reactive values
 */
export function useThemeConfig(): UseThemeConfigReturn {
  const themeStore = useThemeStore()

  /**
   * Computed theme for naive-ui config provider
   */
  const theme = computed(() => themeStore.isDark ? darkTheme : null)

  /**
   * Computed CSS classes for app container
   * Combines theme mode and border style classes
   */
  const appClasses = computed((): string => {
    const classes = [
      themeStore.isBordered ? 'bordered-theme' : 'shadow-theme',
      themeStore.isDark ? 'dark-mode' : 'light-mode'
    ]
    
    return classes.filter(Boolean).join(' ')
  })

  /**
   * Computed theme overrides for naive-ui components
   * Customizes colors based on primary color and theme mode
   */
  const themeOverrides = computed<GlobalThemeOverrides>(() => {
    return createThemeOverrides(themeStore.primaryColor, themeStore.isDark)
  })

  /**
   * Computed primary color for branding elements
   */
  const primaryColor = computed(() => themeStore.primaryColor)

  return {
    theme,
    appClasses,
    themeOverrides,
    primaryColor
  }
}
