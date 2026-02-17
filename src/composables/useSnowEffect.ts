import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

export interface SnowIntensity {
  count: number
  interval: number
  stagger: number
}

export const useSnowEffect = (isWinterMode: () => boolean) => {
  const snowContainer = ref<HTMLElement>()
  let snowInterval: number | null = null

  const createSnowflake = () => {
    if (!snowContainer.value) return
    
    const snowflake = document.createElement('div')
    snowflake.className = 'snowflake'
    
    // Ko'proq qor turlari va emoji lar
    const allSnowflakes = [
      '❄', '❅', '❆', '✻', '✼', '❉', '❊',
      '🌨️', '⛄', '☃️', '🏂', '❄️', '🥶', '⛷️'
    ]
    
    snowflake.innerHTML = allSnowflakes[Math.floor(Math.random() * allSnowflakes.length)]
    snowflake.style.left = Math.random() * 100 + '%'
    snowflake.style.animationDuration = (Math.random() * 4 + 3) + 's' // 3-7 sekund
    snowflake.style.opacity = (Math.random() * 0.7 + 0.3).toString() // 0.3-1.0
    snowflake.style.fontSize = (Math.random() * 8 + 8) + 'px' // 8-16px
    
    // Random horizontal drift
    const drift = (Math.random() - 0.5) * 100 // -50px to 50px
    snowflake.style.setProperty('--drift', `${drift}px`)
    
    snowflake.style.animationDelay = Math.random() * 2 + 's' // 0-2 sekund delay
    
    snowContainer.value.appendChild(snowflake)
    
    // Remove snowflake after animation (longer duration)
    const duration = parseFloat(snowflake.style.animationDuration) * 1000 + 2000
    setTimeout(() => {
      if (snowflake.parentNode) {
        snowflake.parentNode.removeChild(snowflake)
      }
    }, duration)
  }

  // Mobile/desktop uchun qor miqdori
  const getSnowIntensity = (): SnowIntensity => {
    const isMobile = window.innerWidth <= 768
    if (isMobile) {
      // Mobile: kamroq qor
      return {
        count: Math.floor(Math.random() * 1) + 1, // 1-2 ta
        interval: 400, // 400ms
        stagger: 150 // 150ms oraliq
      }
    } else {
      // Desktop: ko'proq qor
      return {
        count: Math.floor(Math.random() * 3) + 2, // 2-4 ta
        interval: 200, // 200ms
        stagger: 100 // 100ms oraliq
      }
    }
  }

  const startSnow = () => {
    if (snowInterval) return
    
    const intensity = getSnowIntensity()
    
    snowInterval = window.setInterval(() => {
      const snowCount = intensity.count
      for (let i = 0; i < snowCount; i++) {
        setTimeout(() => createSnowflake(), i * intensity.stagger)
      }
    }, intensity.interval)
  }

  const stopSnow = () => {
    if (snowInterval) {
      clearInterval(snowInterval)
      snowInterval = null
    }
    
    // Clear existing snowflakes
    if (snowContainer.value) {
      snowContainer.value.innerHTML = ''
    }
  }

  // Handle window resize for responsive snow
  const handleResize = () => {
    if (isWinterMode() && snowInterval) {
      // Qor effektini qayta boshlash (yangi intensivity bilan)
      stopSnow()
      setTimeout(() => startSnow(), 100)
    }
  }

  // Watch winter mode changes
  watch(isWinterMode, async (isWinter) => {
    if (isWinter) {
      await nextTick()
      startSnow()
    } else {
      stopSnow()
    }
  }, { immediate: true })

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    stopSnow()
  })

  return {
    snowContainer
  }
}
