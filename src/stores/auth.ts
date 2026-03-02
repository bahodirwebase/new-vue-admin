/**
 * Auth Store
 *
 * Manages authentication state for the application.
 * Persists login state to localStorage so the session survives page refreshes.
 *
 * Demo credentials: username = "admin", password = "1"
 *
 * @module stores/auth
 */
import { defineStore } from 'pinia'
import { useLocalStorage } from '@/composables/useLocalStorage'

/** Demo credentials — replace with real API call for production */
const DEMO_USERNAME = 'admin'
const DEMO_PASSWORD = '1'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = useLocalStorage('byxora-auth-isAuthenticated', false)

  /**
   * Validates credentials and sets authenticated state.
   * @returns true if credentials are correct, false otherwise
   */
  const login = (username: string, password: string): boolean => {
    if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
      isAuthenticated.value = true
      return true
    }
    return false
  }

  /**
   * Clears authenticated state and ends the session.
   */
  const logout = () => {
    isAuthenticated.value = false
  }

  return {
    isAuthenticated,
    login,
    logout
  }
})
