/**
 * Authentication Service
 *
 * Provides login, logout, and session management operations.
 *
 * Mock mode: returns simulated user data without a real backend.
 * Production: replace each mock implementation with your real API calls.
 *
 * @module services/auth
 */
import type { User, ApiResponse } from '@/types'
import { mockResponse } from './api.service'

/** Mock user fixture for development and demo purposes */
const MOCK_USER: User = {
  id: '1',
  name: 'John Doe',
  email: 'admin@byxora.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
  role: 'admin',
  permissions: ['read', 'write', 'delete', 'admin']
}

export const authService = {
  /**
   * Authenticates a user with the provided credentials.
   *
   * @param email - User email address
   * @param _password - User password (unused in mock mode)
   * @returns Promise resolving with the authenticated user data
   */
  async login(email: string, _password: string): Promise<ApiResponse<User>> {
    // TODO: Replace with real authentication endpoint
    // return apiClient.post('/auth/login', { email, password })
    return mockResponse({ ...MOCK_USER, email })
  },

  /**
   * Terminates the current user session.
   *
   * @returns Promise resolving when logout is complete
   */
  async logout(): Promise<ApiResponse<null>> {
    // TODO: Replace with real logout endpoint
    // return apiClient.post('/auth/logout')
    return mockResponse(null)
  },

  /**
   * Retrieves the current authenticated user's profile.
   *
   * @returns Promise resolving with the current user data
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    // TODO: Replace with real profile endpoint
    // return apiClient.get('/auth/me')
    return mockResponse(MOCK_USER)
  }
}
