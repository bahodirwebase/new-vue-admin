import { ref, onMounted, onUnmounted } from 'vue'

export function useAccessibility() {
  const isKeyboardUser = ref(false)
  const reducedMotion = ref(false)
  const highContrast = ref(false)

  const checkReducedMotion = () => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion.value = mediaQuery.matches
    
    const handleChange = (e: MediaQueryListEvent) => {
      reducedMotion.value = e.matches
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }

  const checkHighContrast = () => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)')
    highContrast.value = mediaQuery.matches
    
    const handleChange = (e: MediaQueryListEvent) => {
      highContrast.value = e.matches
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    // Detect keyboard navigation
    if (e.key === 'Tab') {
      isKeyboardUser.value = true
      document.body.classList.add('keyboard-user')
    }
    
    // Escape key handling
    if (e.key === 'Escape') {
      const activeElement = document.activeElement as HTMLElement
      if (activeElement && activeElement.blur) {
        activeElement.blur()
      }
    }
  }

  const handleMouseDown = () => {
    isKeyboardUser.value = false
    document.body.classList.remove('keyboard-user')
  }

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div')
    announcement.setAttribute('role', 'status')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message
    
    document.body.appendChild(announcement)
    
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  const focusFirstFocusableElement = (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    if (focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus()
    }
  }

  const trapFocus = (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }
    
    container.addEventListener('keydown', handleTabKey)
    
    return () => {
      container.removeEventListener('keydown', handleTabKey)
    }
  }

  onMounted(() => {
    const cleanupReducedMotion = checkReducedMotion()
    const cleanupHighContrast = checkHighContrast()
    
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleMouseDown)
    
    onUnmounted(() => {
      cleanupReducedMotion?.()
      cleanupHighContrast?.()
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseDown)
    })
  })

  return {
    isKeyboardUser,
    reducedMotion,
    highContrast,
    announceToScreenReader,
    focusFirstFocusableElement,
    trapFocus
  }
}
