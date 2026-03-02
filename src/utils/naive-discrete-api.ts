/**
 * Naive UI Discrete API
 *
 * Provides imperative access to Naive UI feedback components (message, dialog,
 * notification, loadingBar) outside of the Vue component tree.
 *
 * Usage:
 *   import { message } from '@/utils/naive-discrete-api'
 *   message.success('Operation completed successfully.')
 *
 * Note: This instance is created without a theme context provider.
 * For theme-aware feedback (respecting dark mode and primary color overrides),
 * prefer the `useMessage`, `useDialog`, `useNotification`, and `useLoadingBar`
 * composables inside Vue components where NConfigProvider is in the tree.
 *
 * @module utils/naive-discrete-api
 */
import { createDiscreteApi } from 'naive-ui'

const { message, notification, dialog, loadingBar } = createDiscreteApi([
  'message',
  'dialog',
  'notification',
  'loadingBar'
])

export { message, notification, dialog, loadingBar }
