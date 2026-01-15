import { ref, computed } from 'vue'
import { useBreakpoints } from './useBreakpoints'
import { useThemeStore } from '@/stores/theme'

export function useSidebar() {
  const themeStore = useThemeStore()
  const { isMobile } = useBreakpoints()
  
  const isCollapsed = ref(false)
  const isMobileOpen = ref(false)

  const sidebarWidth = computed(() => {
    if (isMobile.value) {
      return isMobileOpen.value ? 240 : 0
    }
    return themeStore.isMiniSidebar ? 80 : 240
  })

  const collapsedWidth = computed(() => 80)

  const toggleSidebar = () => {
    if (isMobile.value) {
      isMobileOpen.value = !isMobileOpen.value
    } else {
      themeStore.setMiniSidebar(!themeStore.isMiniSidebar)
    }
  }

  const closeMobileSidebar = () => {
    if (isMobile.value) {
      isMobileOpen.value = false
    }
  }

  const openMobileSidebar = () => {
    if (isMobile.value) {
      isMobileOpen.value = true
    }
  }

  // Auto-close mobile sidebar when screen size changes
  const handleBreakpointChange = () => {
    if (!isMobile.value) {
      isMobileOpen.value = false
    }
  }

  return {
    isCollapsed,
    isMobileOpen,
    sidebarWidth,
    collapsedWidth,
    toggleSidebar,
    closeMobileSidebar,
    openMobileSidebar,
    handleBreakpointChange
  }
}
