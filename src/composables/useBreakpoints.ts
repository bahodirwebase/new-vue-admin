import { ref, computed, onMounted, onUnmounted } from 'vue'

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
    xs: windowWidth.value < 576,
    sm: windowWidth.value >= 576 && windowWidth.value < 768,
    md: windowWidth.value >= 768 && windowWidth.value < 992,
    lg: windowWidth.value >= 992 && windowWidth.value < 1200,
    xl: windowWidth.value >= 1200 && windowWidth.value < 1400,
    xxl: windowWidth.value >= 1400
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
