import { ref, computed, onMounted, onUnmounted } from 'vue'
import { THEME_CONSTANTS } from '@/constants/theme'

export interface Breakpoints {
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
    xs: windowWidth.value < THEME_CONSTANTS.BREAKPOINTS.xs,
    sm: windowWidth.value >= THEME_CONSTANTS.BREAKPOINTS.xs && windowWidth.value < THEME_CONSTANTS.BREAKPOINTS.sm,
    md: windowWidth.value >= THEME_CONSTANTS.BREAKPOINTS.sm && windowWidth.value < THEME_CONSTANTS.BREAKPOINTS.md,
    lg: windowWidth.value >= THEME_CONSTANTS.BREAKPOINTS.md && windowWidth.value < THEME_CONSTANTS.BREAKPOINTS.lg,
    xl: windowWidth.value >= THEME_CONSTANTS.BREAKPOINTS.lg && windowWidth.value < THEME_CONSTANTS.BREAKPOINTS.xl,
    xxl: windowWidth.value >= THEME_CONSTANTS.BREAKPOINTS.xl
  }))

  const isMobile = computed(() => breakpoints.value.xs || breakpoints.value.sm)
  const isTablet = computed(() => breakpoints.value.md)
  const isDesktop = computed(() => breakpoints.value.lg || breakpoints.value.xl || breakpoints.value.xxl)

  return {
    windowWidth,
    breakpoints,
    isMobile,
    isTablet,
    isDesktop
  }
}
