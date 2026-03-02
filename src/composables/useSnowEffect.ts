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

    // Extended snowflake character set including emoji variants
    const allSnowflakes = [
      '❄', '❅', '❆', '✻', '✼', '❉', '❊',
      '🌨️', '⛄', '☃️', '🏂', '❄️', '🥶', '⛷️'
    ]

    snowflake.innerHTML = allSnowflakes[Math.floor(Math.random() * allSnowflakes.length)]
    snowflake.style.left = Math.random() * 100 + '%'
    snowflake.style.animationDuration = (Math.random() * 4 + 3) + 's' // 3-7 second fall duration
    snowflake.style.opacity = (Math.random() * 0.7 + 0.3).toString() // 0.3-1.0
    snowflake.style.fontSize = (Math.random() * 8 + 8) + 'px' // 8-16px

    // Random horizontal drift (-50px to 50px)
    const drift = (Math.random() - 0.5) * 100
    snowflake.style.setProperty('--drift', `${drift}px`)

    snowflake.style.animationDelay = Math.random() * 2 + 's' // 0-2 second delay

    snowContainer.value.appendChild(snowflake)

    // Remove snowflake after animation completes
    const duration = parseFloat(snowflake.style.animationDuration) * 1000 + 2000
    setTimeout(() => {
      if (snowflake.parentNode) {
        snowflake.parentNode.removeChild(snowflake)
      }
    }, duration)
  }

  // Adjust snowflake intensity based on viewport size
  const getSnowIntensity = (): SnowIntensity => {
    const isMobile = window.innerWidth <= 768
    if (isMobile) {
      // Mobile: reduced snowflake count for performance
      return {
        count: Math.floor(Math.random() * 1) + 1,
        interval: 400,
        stagger: 150
      }
    } else {
      // Desktop: full snowflake count
      return {
        count: Math.floor(Math.random() * 3) + 2,
        interval: 200,
        stagger: 100
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

    // Clear existing snowflakes from the container
    if (snowContainer.value) {
      snowContainer.value.innerHTML = ''
    }
  }

  // Restart snow effect to apply updated intensity for the new viewport size
  const handleResize = () => {
    if (isWinterMode() && snowInterval) {
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
