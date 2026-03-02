import type { Component } from 'vue'

/**
 * Creates a lazy-loaded async component factory with error boundary support.
 * Falls back to the provided component if the dynamic import fails.
 *
 * @param importFunc - Dynamic import function returning the component module
 * @param fallback - Optional fallback component to render on load failure
 * @returns Async component factory function
 *
 * @example
 * const MyPage = lazyLoad(() => import('@/views/MyPage.vue'))
 */
export function lazyLoad(
  importFunc: () => Promise<{ default: Component }>,
  fallback?: Component
): () => Promise<{ default: Component }> {
  return async () => {
    try {
      const module = await importFunc()
      return module
    } catch (error) {
      if (fallback) {
        return { default: fallback }
      }
      throw error
    }
  }
}

/**
 * Eagerly preloads a component in the background without blocking rendering.
 * Useful for preloading components that are likely to be needed soon.
 * Any preload errors are silently ignored.
 *
 * @param importFunc - Dynamic import function returning the component module
 *
 * @example
 * preloadComponent(() => import('@/views/Dashboard.vue'))
 */
export function preloadComponent(
  importFunc: () => Promise<{ default: Component }>
): void {
  importFunc().catch(() => {
    // Preload errors are intentionally ignored
  })
}

/**
 * Creates a lazy-loaded async component factory with a timeout constraint.
 * Rejects the load if the component does not resolve within the given timeout.
 *
 * @param importFunc - Dynamic import function returning the component module
 * @param timeout - Maximum wait time in milliseconds (default: 5000)
 * @returns Async component factory function
 *
 * @example
 * const HeavyChart = lazyLoadWithTimeout(() => import('@/views/HeavyChart.vue'), 8000)
 */
export function lazyLoadWithTimeout(
  importFunc: () => Promise<{ default: Component }>,
  timeout: number = 5000
): () => Promise<{ default: Component }> {
  return async () => {
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Component loading timeout')), timeout)
    })

    try {
      const module = await Promise.race([importFunc(), timeoutPromise])
      return module
    } catch (error) {
      // Propagate error to the Vue async component error boundary
      throw error
    }
  }
}
