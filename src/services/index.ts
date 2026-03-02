/**
 * Service Layer Index
 *
 * Centralizes all service exports for clean imports throughout the application.
 *
 * Usage:
 *   import { authService } from '@/services'
 *   import { mockResponse } from '@/services'
 *
 * @module services
 */
export { authService } from './auth.service'
export { mockResponse, mockDelay } from './api.service'
