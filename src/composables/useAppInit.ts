import { ref, onMounted, type Ref } from 'vue'

/**
 * Interface for app initialization configuration
 */
export interface AppInitConfig {
  /** Initial loading duration in milliseconds */
  loadingDuration?: number
  /** Whether to simulate initial loading */
  simulateLoading?: boolean
}

/**
 * Interface for app initialization return values
 */
export interface AppInitReturn {
  /** Loading state ref */
  isLoading: Ref<boolean>
  /** Logo color computed ref */
  logoColor: Ref<string>
}

/**
 * Composable for app initialization logic
 * Handles initial loading state and logo color computation
 * 
 * @param config - Configuration options
 * @returns App initialization reactive values
 */
export function useAppInit(config: AppInitConfig = {}): AppInitReturn {
  const {
    loadingDuration = 2000,
    simulateLoading = true
  } = config

  // Reactive state for initial loading
  const isLoading = ref<boolean>(true)
  
  // Logo color (will be computed from theme store)
  const logoColor = ref<string>('#667eea')

  /**
   * Initialize app loading state
   * Simulates initial loading if enabled
   */
  const initializeApp = (): void => {
    if (simulateLoading) {
      setTimeout(() => {
        isLoading.value = false
      }, loadingDuration)
    } else {
      isLoading.value = false
    }
  }

  onMounted(() => {
    initializeApp()
  })

  return {
    isLoading,
    logoColor
  }
}
