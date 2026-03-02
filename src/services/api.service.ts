/**
 * Base API Service
 *
 * Provides a consistent interface for data operations throughout the application.
 * Currently operates in mock mode — replace `mockDelay` and `mockResponse` calls
 * with real HTTP requests (e.g., via axios or fetch) when connecting to a backend.
 *
 * @module services/api
 */
import type { ApiResponse } from '@/types'

/** Simulated network delay for mock responses (milliseconds) */
const MOCK_DELAY_MS = 300

/**
 * Simulates an async API call with a configurable delay.
 * Replace this with a real HTTP client call in production.
 *
 * @param data - The mock data to resolve with
 * @param delay - Simulated delay in milliseconds
 * @returns Promise resolving with the provided data
 */
export function mockDelay<T>(data: T, delay: number = MOCK_DELAY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay))
}

/**
 * Wraps mock data in the standard ApiResponse envelope.
 *
 * @param data - Mock data payload
 * @returns Promise resolving with a standardized API response object
 */
export async function mockResponse<T>(data: T): Promise<ApiResponse<T>> {
  await mockDelay(null)
  return {
    success: true,
    data,
    message: 'OK'
  }
}
