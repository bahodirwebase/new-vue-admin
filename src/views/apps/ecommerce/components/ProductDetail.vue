<template>
  <div class="product-detail">
    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <n-spin size="large">
        <template #description>Loading product details...</template>
      </n-spin>
    </div>

    <!-- Product Content -->
    <div v-else-if="product" class="product-content">
      <!-- Header Actions -->
      <div class="header-actions">
        <n-space>
          <n-button @click="goBack">
            <template #icon>
              <n-icon><ArrowBackOutline /></n-icon>
            </template>
            Back to Products
          </n-button>
          <n-button @click="editProduct">
            <template #icon>
              <n-icon><CreateOutline /></n-icon>
            </template>
            Edit Product
          </n-button>
          <n-button type="error" @click="confirmDelete">
            <template #icon>
              <n-icon><TrashOutline /></n-icon>
            </template>
            Delete
          </n-button>
        </n-space>
      </div>

      <!-- Product Overview -->
      <n-card class="product-overview">
        <n-grid :cols="2" :x-gap="24" responsive="screen">
          <!-- Product Images -->
          <n-gi>
            <div class="product-images">
              <div class="main-image">
                <img :src="currentImage" :alt="product.name" />
                <div class="image-badges">
                  <n-tag v-if="product.isNew" type="success" size="large">New</n-tag>
                  <n-tag v-if="product.isOnSale" type="warning" size="large">Sale</n-tag>
                  <n-tag v-if="product.stock === 0" type="error" size="large">Out of Stock</n-tag>
                </div>
              </div>
              <div class="image-thumbnails">
                <div
                  v-for="(image, index) in product.images"
                  :key="index"
                  class="thumbnail"
                  :class="{ active: currentImageIndex === index }"
                  @click="currentImageIndex = index"
                >
                  <img :src="image" :alt="`${product.name} ${index + 1}`" />
                </div>
              </div>
            </div>
          </n-gi>

          <!-- Product Info -->
          <n-gi>
            <div class="product-info">
              <div class="product-header">
                <h1>{{ product.name }}</h1>
                <div class="product-meta">
                  <n-tag :type="getStatusType(product.status)" size="medium">
                    {{ formatStatus(product.status) }}
                  </n-tag>
                  <span class="sku">SKU: {{ product.sku }}</span>
                </div>
              </div>

              <div class="product-rating">
                <n-rate :value="product.rating" readonly size="large" />
                <span class="rating-text">
                  {{ product.rating }} ({{ product.reviewCount }} reviews)
                </span>
              </div>

              <div class="product-price-section">
                <div class="price-row">
                  <span v-if="product.isOnSale" class="original-price">
                    ${{ product.price.toFixed(2) }}
                  </span>
                  <span class="current-price">
                    ${{ (product.salePrice || product.price).toFixed(2) }}
                  </span>
                </div>
                <div v-if="product.isOnSale">
                  <div class="discount-info">
                    <n-tag type="success">Save ${{ (product.price - (product.salePrice || 0)).toFixed(2) }}</n-tag>
                  </div>
                </div>
              </div>

              <div class="product-description">
                <h3>Description</h3>
                <p>{{ product.description }}</p>
              </div>

              <div class="product-variants">
                <h3>Variants</h3>
                <div class="variant-options">
                  <div v-for="variant in product.variants" :key="variant.name" class="variant-group">
                    <label>{{ variant.name }}:</label>
                    <n-button-group>
                      <n-button
                        v-for="option in variant.options"
                        :key="option.value"
                        :type="selectedVariants[variant.name] === option.value ? 'primary' : 'default'"
                        @click="selectVariant(variant.name, option.value)"
                      >
                        {{ option.label }}
                      </n-button>
                    </n-button-group>
                  </div>
                </div>
              </div>

              <div class="product-inventory">
                <h3>Inventory</h3>
                <div class="inventory-info">
                  <div class="stock-info">
                    <span :class="getStockClass(product.stock)">
                      {{ product.stock }} units available
                    </span>
                    <span class="stock-status">
                      {{ getStockStatus(product.stock) }}
                    </span>
                  </div>
                  <div class="inventory-details">
                    <n-space vertical size="small">
                      <div class="detail-item">
                        <span class="label">Warehouse:</span>
                        <span>{{ product.warehouse }}</span>
                      </div>
                      <div class="detail-item">
                        <span class="label">Reorder Level:</span>
                        <span>{{ product.reorderLevel }} units</span>
                      </div>
                      <div class="detail-item">
                        <span class="label">Last Restocked:</span>
                        <span>{{ formatDate(product.lastRestocked) }}</span>
                      </div>
                    </n-space>
                  </div>
                </div>
              </div>

              <div class="product-actions">
                <n-space size="large">
                  <n-input-number
                    v-model:value="quantity"
                    :min="1"
                    :max="product.stock"
                    style="width: 120px"
                  />
                  <n-button
                    type="primary"
                    size="large"
                    :disabled="product.stock === 0"
                    @click="addToCart"
                  >
                    <template #icon>
                      <n-icon><CartOutline /></n-icon>
                    </template>
                    Add to Cart
                  </n-button>
                </n-space>
              </div>
            </div>
          </n-gi>
        </n-grid>
      </n-card>

      <!-- Product Tabs -->
      <n-card class="product-tabs">
        <n-tabs type="line" animated>
          <!-- Details Tab -->
          <n-tab-pane name="details" tab="Product Details">
            <div class="tab-content">
              <n-grid :cols="2" :x-gap="24">
                <n-gi>
                  <h4>Specifications</h4>
                  <n-descriptions :column="1" bordered>
                    <n-descriptions-item label="Weight">
                      {{ product.specifications.weight }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Dimensions">
                      {{ product.specifications.dimensions }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Material">
                      {{ product.specifications.material }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Color">
                      {{ product.specifications.color }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Warranty">
                      {{ product.specifications.warranty }}
                    </n-descriptions-item>
                  </n-descriptions>
                </n-gi>
                <n-gi>
                  <h4>Additional Information</h4>
                  <n-descriptions :column="1" bordered>
                    <n-descriptions-item label="Brand">
                      {{ product.brand }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Manufacturer">
                      {{ product.manufacturer }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Country of Origin">
                      {{ product.countryOfOrigin }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Release Date">
                      {{ formatDate(product.releaseDate) }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Product Line">
                      {{ product.productLine }}
                    </n-descriptions-item>
                  </n-descriptions>
                </n-gi>
              </n-grid>
            </div>
          </n-tab-pane>

          <!-- Reviews Tab -->
          <n-tab-pane name="reviews" tab="Customer Reviews">
            <div class="tab-content">
              <div class="reviews-summary">
                <div class="rating-overview">
                  <div class="rating-large">
                    <span class="rating-number">{{ product.rating }}</span>
                    <n-rate :value="product.rating" readonly />
                  </div>
                  <div class="rating-breakdown">
                    <div v-for="star in 5" :key="star" class="rating-bar">
                      <span>{{ 6 - star }} stars</span>
                      <n-progress
                        :percentage="getRatingPercentage(6 - star)"
                        :height="8"
                        :show-indicator="false"
                      />
                      <span>{{ getRatingCount(6 - star) }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="reviews-list">
                <div v-for="review in product.reviews" :key="review.id" class="review-item">
                  <div class="review-header">
                    <div class="reviewer-info">
                      <strong>{{ review.reviewer }}</strong>
                      <n-rate :value="review.rating" readonly size="small" />
                    </div>
                    <span class="review-date">{{ formatDate(review.date) }}</span>
                  </div>
                  <p class="review-content">{{ review.content }}</p>
                  <div v-if="review.images" class="review-images">
                    <img
                      v-for="(image, index) in review.images"
                      :key="index"
                      :src="image"
                      :alt="`Review image ${index + 1}`"
                    />
                  </div>
                </div>
              </div>
            </div>
          </n-tab-pane>

          <!-- Sales Analytics Tab -->
          <n-tab-pane name="analytics" tab="Sales Analytics">
            <div class="tab-content">
              <n-grid :cols="3" :x-gap="16">
                <n-gi>
                  <n-statistic label="Total Sales" :value="product.analytics.totalSales" />
                </n-gi>
                <n-gi>
                  <n-statistic label="Revenue" :value="product.analytics.revenue" prefix="$" />
                </n-gi>
                <n-gi>
                  <n-statistic label="Avg. Order Value" :value="product.analytics.avgOrderValue" prefix="$" />
                </n-gi>
              </n-grid>

              <div class="chart-container">
                <h4>Sales Trend (Last 30 Days)</h4>
                <!-- TODO: Add chart component -->
                <div class="chart-placeholder">
                  <n-empty description="Chart component would be displayed here" />
                </div>
              </div>
            </div>
          </n-tab-pane>

          <!-- History Tab -->
          <n-tab-pane name="history" tab="History & Logs">
            <div class="tab-content">
              <n-timeline>
                <n-timeline-item
                  v-for="log in product.history"
                  :key="log.id"
                  :type="getLogType(log.type)"
                  :title="log.title"
                  :content="log.description"
                  :time="formatDate(log.timestamp)"
                />
              </n-timeline>
            </div>
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </div>

    <!-- Not Found State -->
    <div v-else class="not-found">
      <n-result status="404" title="Product Not Found" description="The product you're looking for doesn't exist.">
        <template #footer>
          <n-button @click="goBack">Go Back to Products</n-button>
        </template>
      </n-result>
    </div>

    <!-- Delete Confirmation Modal -->
    <n-modal v-model:show="showDeleteModal" preset="dialog">
      <template #header>Confirm Delete</template>
      <div>
        Are you sure you want to delete "{{ product?.name }}"? This action cannot be undone.
      </div>
      <template #action>
        <n-space>
          <n-button @click="showDeleteModal = false">Cancel</n-button>
          <n-button type="error" @click="deleteProduct">Delete</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import {
  ArrowBackOutline,
  CreateOutline,
  TrashOutline,
  CartOutline
} from '@vicons/ionicons5'

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

interface Product {
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

const router = useRouter()
const message = useMessage()
const loading = ref(true)
const showDeleteModal = ref(false)
const currentImageIndex = ref(0)
const quantity = ref(1)
const selectedVariants = ref<Record<string, string>>({})

const product = ref<Product>({
  id: 1,
  name: 'Wireless Headphones Pro',
  sku: 'WHP-001',
  description: 'Premium wireless headphones with advanced noise cancellation technology, superior sound quality, and all-day comfort. Perfect for music lovers, professionals, and travelers.',
  price: 299.99,
  salePrice: 249.99,
  stock: 45,
  category: 'Electronics',
  status: 'active',
  isNew: true,
  isOnSale: true,
  rating: 4.5,
  reviewCount: 128,
  images: [
    'https://picsum.photos/seed/headphones1/600/400.jpg',
    'https://picsum.photos/seed/headphones2/600/400.jpg',
    'https://picsum.photos/seed/headphones3/600/400.jpg',
    'https://picsum.photos/seed/headphones4/600/400.jpg'
  ],
  variants: [
    {
      name: 'Color',
      options: [
        { value: 'black', label: 'Black' },
        { value: 'white', label: 'White' },
        { value: 'blue', label: 'Blue' }
      ]
    },
    {
      name: 'Size',
      options: [
        { value: 'standard', label: 'Standard' },
        { value: 'large', label: 'Large' }
      ]
    }
  ],
  specifications: {
    weight: '250g',
    dimensions: '18 x 15 x 8 cm',
    material: 'Premium Plastic & Metal',
    color: 'Multiple Colors Available',
    warranty: '2 Years International Warranty'
  },
  brand: 'AudioTech Pro',
  manufacturer: 'AudioTech Industries',
  countryOfOrigin: 'USA',
  releaseDate: '2024-01-15',
  productLine: 'Professional Audio Series',
  warehouse: 'Main Warehouse - New York',
  reorderLevel: 20,
  lastRestocked: '2024-01-10',
  reviews: [
    {
      id: 1,
      reviewer: 'John Doe',
      rating: 5,
      content: 'Amazing sound quality! The noise cancellation is incredible. Worth every penny.',
      date: '2024-01-12',
      images: ['https://picsum.photos/seed/review1/100/100.jpg']
    },
    {
      id: 2,
      reviewer: 'Jane Smith',
      rating: 4,
      content: 'Great headphones, very comfortable for long use. Battery life could be better.',
      date: '2024-01-10'
    }
  ],
  analytics: {
    totalSales: 1247,
    revenue: 311753.53,
    avgOrderValue: 249.99
  },
  history: [
    {
      id: 1,
      type: 'success',
      title: 'Product Added',
      description: 'Product was added to inventory',
      timestamp: '2024-01-08T10:00:00Z'
    },
    {
      id: 2,
      type: 'info',
      title: 'Price Updated',
      description: 'Price changed from $349.99 to $299.99',
      timestamp: '2024-01-10T14:30:00Z'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Low Stock Alert',
      description: 'Stock level below reorder threshold',
      timestamp: '2024-01-12T09:15:00Z'
    }
  ]
})

const currentImage = computed(() => {
  return product.value?.images[currentImageIndex.value] || ''
})

const getStatusType = (status: string) => {
  switch (status) {
    case 'active': return 'success'
    case 'inactive': return 'warning'
    case 'out_of_stock': return 'error'
    default: return 'default'
  }
}

const formatStatus = (status: string) => {
  return status.replace('_', ' ').toUpperCase()
}

const getStockClass = (stock: number) => {
  if (stock === 0) return 'stock-out'
  if (stock < 10) return 'stock-low'
  return 'stock-good'
}

const getStockStatus = (stock: number) => {
  if (stock === 0) return 'Out of Stock'
  if (stock < 10) return 'Low Stock'
  if (stock < 50) return 'Limited Stock'
  return 'In Stock'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getLogType = (type: string) => {
  return type as 'info' | 'success' | 'warning' | 'error'
}

const getRatingPercentage = (rating: number) => {
  const reviews = product.value?.reviews || []
  const count = reviews.filter(r => Math.floor(r.rating) === rating).length
  return reviews.length > 0 ? (count / reviews.length) * 100 : 0
}

const getRatingCount = (rating: number) => {
  const reviews = product.value?.reviews || []
  return reviews.filter(r => Math.floor(r.rating) === rating).length
}

const selectVariant = (variantName: string, value: string) => {
  selectedVariants.value[variantName] = value
}

const goBack = () => {
  router.push('/apps/ecommerce')
}

const editProduct = () => {
  // TODO: Navigate to edit page or open modal
  console.log('Edit product:', product.value)
}

const confirmDelete = () => {
  showDeleteModal.value = true
}

const deleteProduct = () => {
  // TODO: Implement delete logic
  console.log('Delete product:', product.value)
  showDeleteModal.value = false
  goBack()
}

const addToCart = () => {
  // Create cart item
  const cartItem = {
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    salePrice: product.value.salePrice,
    stock: product.value.stock,
    image: product.value.images[0],
    quantity: quantity.value,
    variants: selectedVariants.value,
    isOnSale: product.value.isOnSale
  }
  
  // Get existing cart from localStorage
  const existingCart = JSON.parse(localStorage.getItem('ecommerce-cart') || '[]')
  
  // Check if item already exists in cart
  const existingItemIndex = existingCart.findIndex((item: any) => 
    item.id === cartItem.id && JSON.stringify(item.variants) === JSON.stringify(cartItem.variants)
  )
  
  if (existingItemIndex > -1) {
    // Update quantity if item exists
    existingCart[existingItemIndex].quantity += quantity.value
  } else {
    // Add new item
    existingCart.push(cartItem)
  }
  
  // Save to localStorage
  localStorage.setItem('ecommerce-cart', JSON.stringify(existingCart))
  
  // Show success message
  message.success(`${quantity.value} × ${product.value.name} added to cart`)
  
  // Update cart count (you might want to use a store for this)
  const cartCount = existingCart.reduce((total: number, item: any) => total + item.quantity, 0)
  localStorage.setItem('ecommerce-cart-count', cartCount.toString())
}

onMounted(() => {
  // Simulate loading
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>

<style scoped>
.product-detail {
  padding: 24px;
  background: var(--n-color);
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.header-actions {
  margin-bottom: 24px;
}

.product-overview {
  margin-bottom: 24px;
}

.product-images {
  position: sticky;
  top: 24px;
}

.main-image {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
}

.main-image img {
  width: 100%;
  height: auto;
  display: block;
}

.image-badges {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.image-thumbnails {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 4px 0;
}

.thumbnail {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s;
}

.thumbnail:hover,
.thumbnail.active {
  border-color: var(--n-primary-color);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  padding-left: 24px;
}

.product-header h1 {
  margin: 0 0 12px 0;
  font-size: 32px;
  font-weight: 700;
  color: var(--n-text-color-1);
}

.product-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.sku {
  font-size: 14px;
  color: var(--n-text-color-3);
  font-family: monospace;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.rating-text {
  color: var(--n-text-color-2);
  font-size: 14px;
}

.product-price-section {
  margin-bottom: 24px;
}

.price-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 8px;
}

.original-price {
  font-size: 18px;
  color: var(--n-text-color-3);
  text-decoration: line-through;
}

.current-price {
  font-size: 32px;
  font-weight: 700;
  color: var(--n-primary-color);
}

.product-description {
  margin-bottom: 24px;
}

.product-description h3 {
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 600;
}

.product-description p {
  margin: 0;
  line-height: 1.6;
  color: var(--n-text-color-2);
}

.product-variants {
  margin-bottom: 24px;
}

.product-variants h3 {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
}

.variant-group {
  margin-bottom: 16px;
}

.variant-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--n-text-color-2);
}

.product-inventory {
  margin-bottom: 32px;
}

.product-inventory h3 {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
}

.stock-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.stock-good {
  color: var(--n-success-color);
  font-weight: 500;
}

.stock-low {
  color: var(--n-warning-color);
  font-weight: 500;
}

.stock-out {
  color: var(--n-error-color);
  font-weight: 500;
}

.stock-status {
  font-size: 14px;
  color: var(--n-text-color-3);
}

.inventory-details .detail-item {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.inventory-details .label {
  color: var(--n-text-color-3);
}

.product-actions {
  padding-top: 24px;
  border-top: 1px solid var(--n-border-color);
}

.product-tabs {
  margin-bottom: 24px;
}

.tab-content {
  padding: 24px 0;
}

.reviews-summary {
  margin-bottom: 32px;
}

.rating-overview {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

.rating-large {
  text-align: center;
}

.rating-number {
  display: block;
  font-size: 48px;
  font-weight: 700;
  color: var(--n-text-color-1);
  line-height: 1;
  margin-bottom: 8px;
}

.rating-breakdown {
  flex: 1;
}

.rating-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.rating-bar span:first-child {
  width: 60px;
  font-size: 14px;
}

.rating-bar .n-progress {
  flex: 1;
}

.rating-bar span:last-child {
  width: 30px;
  text-align: right;
  font-size: 14px;
  color: var(--n-text-color-3);
}

.reviews-list {
  max-width: 800px;
}

.review-item {
  padding: 20px 0;
  border-bottom: 1px solid var(--n-border-color);
}

.review-item:last-child {
  border-bottom: none;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.reviewer-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.review-date {
  font-size: 14px;
  color: var(--n-text-color-3);
}

.review-content {
  margin: 0 0 12px 0;
  line-height: 1.6;
  color: var(--n-text-color-2);
}

.review-images {
  display: flex;
  gap: 8px;
}

.review-images img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
}

.chart-container {
  margin-top: 32px;
}

.chart-container h4 {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--n-card-color);
  border-radius: 8px;
  border: 1px solid var(--n-border-color);
}

.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

@media (max-width: 1024px) {
  .product-info {
    padding-left: 0;
    padding-top: 24px;
  }
  
  .product-images {
    position: static;
  }
}

@media (max-width: 768px) {
  .product-detail {
    padding: 16px;
  }
  
  .product-header h1 {
    font-size: 24px;
  }
  
  .current-price {
    font-size: 24px;
  }
  
  .rating-overview {
    flex-direction: column;
    gap: 16px;
  }
  
  .header-actions :deep(.n-space) {
    flex-direction: column;
    width: 100%;
  }
  
  .header-actions :deep(.n-button) {
    width: 100%;
  }
}
</style>
