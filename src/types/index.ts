/**
 * Typed metadata attached to each route record.
 * Consumed by the router navigation guard for title updates
 * and by sidebar menus for icon and grouping information.
 */
export interface RouteMeta {
  title: string
  icon?: string
  group?: string
  subgroup?: string
  requiresAuth?: boolean
  roles?: string[]
}

/**
 * Snapshot of the user's current theme preferences.
 * Persisted to localStorage via the useLocalStorage composable.
 */
export interface ThemeSettings {
  isDark: boolean
  isBoxed: boolean
  isMiniSidebar: boolean
  isBordered: boolean
  primaryColor: string
}

/**
 * Authenticated user profile returned by the auth service.
 */
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
  permissions: string[]
}

/**
 * Navigation menu item used by AppSidebar.
 * Supports nested children for multi-level menus.
 */
export interface MenuItem {
  label: string
  key: string
  icon?: () => any
  children?: MenuItem[]
  disabled?: boolean
  badge?: string | number
  type?: 'group' | 'divider'
}

/**
 * Chart data structure for ApexCharts or similar chart libraries.
 */
export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string | string[]
    borderWidth?: number
  }[]
}

/**
 * Generic table row with a required id and arbitrary additional fields.
 */
export interface TableData {
  id: string | number
  [key: string]: any
}

/**
 * Column definition for data table components.
 */
export interface TableColumn {
  key: string
  title: string
  width?: number
  sortable?: boolean
  filterable?: boolean
  render?: (value: any, record: TableData) => any
}

/**
 * Standard API response envelope wrapping all service layer responses.
 * @template T - The type of the response data payload
 */
export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message?: string
  errors?: string[]
}

/**
 * Pagination parameters for list endpoints.
 */
export interface PaginationParams {
  page: number
  pageSize: number
  total?: number
}

/**
 * Sort configuration for sortable list endpoints.
 */
export interface SortParams {
  field: string
  order: 'asc' | 'desc'
}

/**
 * Dynamic filter key-value map for filterable list endpoints.
 */
export interface FilterParams {
  [key: string]: any
}
