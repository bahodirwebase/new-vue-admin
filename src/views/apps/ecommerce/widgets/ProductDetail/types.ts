export interface Product {
  id: number
  name: string
  sku: string
  description: string
  price: number
  salePrice?: number
  stock: number
  category: string
  status: 'active' | 'inactive' | 'out_of_stock'
  isNew: boolean
  isOnSale: boolean
  rating: number
  reviewCount: number
  images: string[]
  variants: ProductVariant[]
  specifications: {
    weight: string
    dimensions: string
    material: string
    color: string
    warranty: string
  }
  brand: string
  manufacturer: string
  countryOfOrigin: string
  releaseDate: string
  productLine: string
  warehouse: string
  reorderLevel: number
  lastRestocked: string
  reviews: ProductReview[]
  analytics: ProductAnalytics
  history: ProductHistory[]
}
interface ProductVariant {
  name: string
  options: Array<{
    value: string
    label: string
    price?: number
  }>
}

interface ProductReview {
  id: number
  reviewer: string
  rating: number
  content: string
  date: string
  images?: string[]
}

interface ProductHistory {
  id: number
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  description: string
  timestamp: string
}

interface ProductAnalytics {
  totalSales: number
  revenue: number
  avgOrderValue: number
}