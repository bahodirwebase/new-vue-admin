export interface RouteMeta {
  title: string
  icon?: string
  group?: string
  subgroup?: string
  requiresAuth?: boolean
  roles?: string[]
}

export interface ThemeSettings {
  isDark: boolean
  isBoxed: boolean
  isMiniSidebar: boolean
  isBordered: boolean
  primaryColor: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
  permissions: string[]
}

export interface MenuItem {
  label: string
  key: string
  icon?: () => any
  children?: MenuItem[]
  disabled?: boolean
  badge?: string | number
  type?: 'group' | 'divider'
}

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

export interface TableData {
  id: string | number
  [key: string]: any
}

export interface TableColumn {
  key: string
  title: string
  width?: number
  sortable?: boolean
  filterable?: boolean
  render?: (value: any, record: TableData) => any
}

export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message?: string
  errors?: string[]
}

export interface PaginationParams {
  page: number
  pageSize: number
  total?: number
}

export interface SortParams {
  field: string
  order: 'asc' | 'desc'
}

export interface FilterParams {
  [key: string]: any
}
