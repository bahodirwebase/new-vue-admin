import type { Component } from 'vue'

export function lazyLoad(
  importFunc: () => Promise<{ default: Component }>,
  fallback?: Component
): () => Promise<{ default: Component }> {
  return async () => {
    try {
      const module = await importFunc()
      return module
    } catch (error) {
      console.warn('Failed to load component:', error)
      if (fallback) {
        return { default: fallback }
      }
      throw error
    }
  }
}

export function preloadComponent(
  importFunc: () => Promise<{ default: Component }>
): void {
  // Preload component in background
  importFunc().catch(() => {
    // Ignore preload errors
  })
}

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
      console.error('Component loading failed or timed out:', error)
      throw error
    }
  }
}
