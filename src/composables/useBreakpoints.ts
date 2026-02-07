import { ref, computed, onMounted, onUnmounted } from 'vue'
import { THEME_CONSTANTS } from '@/constants/theme'

export interface Breakpoints {
  xxs: boolean
  xs: boolean
  sm: boolean
  md: boolean
  lg: boolean
  xl: boolean
  xxl: boolean
}

export function useBreakpoints() {
  const windowWidth = ref(window.innerWidth)

  const updateWidth = () => {
    windowWidth.value = window.innerWidth
  }

  onMounted(() => {
    window.addEventListener('resize', updateWidth)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
  })

  const breakpoints = computed<Breakpoints>(() => ({
    xxs: windowWidth.value < THEME_CONSTANTS.BREAKPOINTS.xs,
    xs: windowWidth.value >= THEME_CONSTANTS.BREAKPOINTS.xs && windowWidth.value < THEME_CONSTANTS.BREAKPOINTS.sm,
    sm: windowWidth.value >= THEME_CONSTANTS.BREAKPOINTS.sm && windowWidth.value < THEME_CONSTANTS.BREAKPOINTS.md,
    md: windowWidth.value >= THEME_CONSTANTS.BREAKPOINTS.md && windowWidth.value < THEME_CONSTANTS.BREAKPOINTS.lg,
    lg: windowWidth.value >= THEME_CONSTANTS.BREAKPOINTS.lg && windowWidth.value < THEME_CONSTANTS.BREAKPOINTS.xl,
    xl: windowWidth.value >= THEME_CONSTANTS.BREAKPOINTS.xl && windowWidth.value < THEME_CONSTANTS.BREAKPOINTS.xxl,
    xxl: windowWidth.value >= THEME_CONSTANTS.BREAKPOINTS.xxl
  }))

  const isMobile = computed(() => breakpoints.value.xxs || breakpoints.value.xs)
  const isTablet = computed(() => breakpoints.value.sm)
  const isDesktop = computed(() => breakpoints.value.md || breakpoints.value.lg || breakpoints.value.xl || breakpoints.value.xxl)
  const isLargeDesktop = computed(() => breakpoints.value.xl || breakpoints.value.xxl)

  return {
    windowWidth,
    breakpoints,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop
  }
}
