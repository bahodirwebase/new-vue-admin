import { ref, onMounted, onUnmounted } from 'vue'

export function useFullscreen() {
  const isFullscreen = ref(false)

  const updateFullscreenState = () => {
    isFullscreen.value = !!document.fullscreenElement
  }

  onMounted(() => {
    updateFullscreenState()
    document.addEventListener('fullscreenchange', updateFullscreenState)
  })

  onUnmounted(() => {
    document.removeEventListener('fullscreenchange', updateFullscreenState)
  })

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (error) {
      console.warn('Fullscreen API error:', error)
    }
  }

  const enterFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
      }
    } catch (error) {
      console.warn('Fullscreen API error:', error)
    }
  }

  const exitFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
      }
    } catch (error) {
      console.warn('Fullscreen API error:', error)
    }
  }

  return {
    isFullscreen,
    toggleFullscreen,
    enterFullscreen,
    exitFullscreen
  }
}
