<template>
  <div class="product-list">

    <!-- Search and Filters -->
    <n-card class="filters-card">
      <n-space align="center" wrap>
        <n-input
          v-model:value="searchQuery"
          placeholder="Search products..."
          style="width: 300px"
          clearable
          @input="handleSearch"
        >
          <template #prefix>
            <n-icon><SearchOutline /></n-icon>
          </template>
        </n-input>
        
        <n-select
          v-model:value="selectedCategory"
          placeholder="Category"
          :options="categoryOptions"
          style="width: 150px"
          clearable
          @update:value="handleFilterChange"
        />
        
        <n-select
          v-model:value="selectedStatus"
          placeholder="Status"
          :options="statusOptions"
          style="width: 120px"
          clearable
          @update:value="handleFilterChange"
        />
        
        <n-select
          v-model:value="sortBy"
          placeholder="Sort by"
          :options="sortOptions"
          style="width: 150px"
          @update:value="handleSort"
        />
        
        <n-button @click="resetFilters">
          <template #icon>
            <n-icon><RefreshOutline /></n-icon>
          </template>
          Reset
        </n-button>
      </n-space>
    </n-card>

    <!-- Products Display -->
    <div class="products-container">
      <!-- Grid View -->
      <div v-if="store.viewMode === 'grid'" class="products-grid">
        <n-card
          v-for="product in filteredProducts"
          :key="product.id"
          class="product-card"
          hoverable
          @click="viewProduct(product)"
        >
          <div class="product-image">
            <img :src="product.image" :alt="product.name" />
            <div class="product-badges">
              <n-tag v-if="product.isNew" type="success" size="small">New</n-tag>
              <n-tag v-if="product.isOnSale" type="warning" size="small">Sale</n-tag>
              <n-tag v-if="product.stock === 0" type="error" size="small">Out of Stock</n-tag>
            </div>
          </div>
          
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-category">{{ product.category }}</p>
            <div class="product-price">
              <span v-if="product.isOnSale" class="original-price">${{ product.price }}</span>
              <span class="current-price">${{ product.salePrice || product.price }}</span>
            </div>
            <div class="product-stock">
              <span :class="getStockClass(product.stock)">
                {{ product.stock }} in stock
              </span>
            </div>
          </div>
          
          <div class="product-actions">
            <n-space>
              <n-button size="small" @click.stop="editProduct(product)">
                <template #icon>
                  <n-icon><CreateOutline /></n-icon>
                </template>
              </n-button>
              <n-button size="small" type="error" @click.stop="deleteProduct(product)">
                <template #icon>
                  <n-icon><TrashOutline /></n-icon>
                </template>
              </n-button>
            </n-space>
          </div>
        </n-card>
      </div>

      <!-- List View -->
      <n-data-table
        v-else
        :columns="tableColumns"
        :data="filteredProducts"
        :pagination="pagination"
        :loading="loading"
        striped
        @update:page="handlePageChange"
      />
    </div>

    <!-- Add/Edit Product Modal -->
    <n-modal
      v-model:show="store.showAddProductModal"
      preset="card"
      title="Add New Product"
      style="width: 600px"
    >
      <n-form
        ref="formRef"
        :model="newProduct"
        :rules="formRules"
        label-placement="left"
        label-width="120px"
      >
        <n-form-item label="Product Name" path="name">
          <n-input v-model:value="newProduct.name" placeholder="Enter product name" />
        </n-form-item>
        
        <n-form-item label="Category" path="category">
          <n-select
            v-model:value="newProduct.category"
            placeholder="Select category"
            :options="categoryOptions"
          />
        </n-form-item>
        
        <n-form-item label="Price" path="price">
          <n-input-number
            v-model:value="newProduct.price"
            placeholder="0.00"
            :precision="2"
            :min="0"
            style="width: 100%"
          />
        </n-form-item>
        
        <n-form-item label="Stock" path="stock">
          <n-input-number
            v-model:value="newProduct.stock"
            placeholder="0"
            :min="0"
            style="width: 100%"
          />
        </n-form-item>
        
        <n-form-item label="Description" path="description">
          <n-input
            v-model:value="newProduct.description"
            type="textarea"
            placeholder="Enter product description"
            :rows="3"
          />
        </n-form-item>
        
        <n-form-item label="Image URL" path="image">
          <n-input
            v-model:value="newProduct.image"
            placeholder="Enter image URL"
          />
        </n-form-item>
        
        <n-form-item>
          <n-space>
            <n-checkbox v-model:checked="newProduct.isNew">New Product</n-checkbox>
            <n-checkbox v-model:checked="newProduct.isOnSale">On Sale</n-checkbox>
          </n-space>
        </n-form-item>
      </n-form>
      
      <template #footer>
        <n-space justify="end">
          <n-button @click="store.showAddProductModal = false">Cancel</n-button>
          <n-button type="primary" @click="saveProduct">Save Product</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, h } from 'vue'
import {
  
  SearchOutline,
  RefreshOutline,
  CreateOutline,
  TrashOutline,
  EyeOutline
} from '@vicons/ionicons5'
import { NTag, NButton, NIcon } from 'naive-ui'
import { useEcommerceStore } from '../store'

const store = useEcommerceStore()
interface Product {
  id: number
  name: string
  category: string
  price: number
  salePrice?: number
  stock: number
  image: string
  description: string
  isNew: boolean
  isOnSale: boolean
  status: 'active' | 'inactive' | 'out_of_stock'
  createdAt: string
}


const searchQuery = ref('')
const selectedCategory = ref(null)
const selectedStatus = ref(null)
const sortBy = ref('name')
const loading = ref(false)


const products = ref<Product[]>([
  {
    id: 1,
    name: 'Wireless Headphones Pro',
    category: 'Electronics',
    price: 299.99,
    salePrice: 249.99,
    stock: 45,
    image: 'https://picsum.photos/seed/headphones/300/200.jpg',
    description: 'Premium wireless headphones with noise cancellation',
    isNew: true,
    isOnSale: true,
    status: 'active',
    createdAt: '2024-01-10'
  },
  {
    id: 2,
    name: 'Smart Watch Ultra',
    category: 'Electronics',
    price: 499.99,
    stock: 12,
    image: 'https://picsum.photos/seed/smartwatch/300/200.jpg',
    description: 'Advanced fitness tracking and health monitoring',
    isNew: false,
    isOnSale: false,
    status: 'active',
    createdAt: '2024-01-08'
  },
  {
    id: 3,
    name: 'Organic Cotton T-Shirt',
    category: 'Clothing',
    price: 29.99,
    stock: 0,
    image: 'https://picsum.photos/seed/tshirt/300/200.jpg',
    description: 'Comfortable and sustainable organic cotton',
    isNew: false,
    isOnSale: false,
    status: 'out_of_stock',
    createdAt: '2024-01-05'
  },
  {
    id: 4,
    name: 'JavaScript Guide Book',
    category: 'Books',
    price: 39.99,
    salePrice: 29.99,
    stock: 120,
    image: 'https://picsum.photos/seed/jsbook/300/200.jpg',
    description: 'Complete guide to modern JavaScript development',
    isNew: true,
    isOnSale: true,
    status: 'active',
    createdAt: '2024-01-12'
  },
  {
    id: 5,
    name: 'Yoga Mat Premium',
    category: 'Sports',
    price: 79.99,
    stock: 67,
    image: 'https://picsum.photos/seed/yogamat/300/200.jpg',
    description: 'Non-slip premium yoga mat with carrying strap',
    isNew: false,
    isOnSale: false,
    status: 'active',
    createdAt: '2024-01-03'
  }
])

const newProduct = ref({
  name: '',
  category: '',
  price: 0,
  stock: 0,
  description: '',
  image: '',
  isNew: false,
  isOnSale: false
})

const formRules = {
  name: { required: true, message: 'Product name is required' },
  category: { required: true, message: 'Category is required' },
  price: { required: true, type: 'number', min: 0, message: 'Price must be positive' },
  stock: { required: true, type: 'number', min: 0, message: 'Stock must be positive' }
}

const categoryOptions = [
  { label: 'Electronics', value: 'Electronics' },
  { label: 'Clothing', value: 'Clothing' },
  { label: 'Books', value: 'Books' },
  { label: 'Home & Garden', value: 'Home' },
  { label: 'Sports', value: 'Sports' }
]

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Out of Stock', value: 'out_of_stock' }
]

const sortOptions = [
  { label: 'Name', value: 'name' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Stock', value: 'stock' },
  { label: 'Date Added', value: 'date' }
]

const pagination = ref({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 50]
})

const tableColumns = [
  {
    title: 'Product',
    key: 'name',
    render: (row: Product) => {
      return h('div', { class: 'product-cell' }, [
        h('img', { src: row.image, alt: row.name, class: 'product-thumbnail' }),
        h('div', { class: 'product-details' }, [
          h('div', { class: 'product-name' }, row.name),
          h('div', { class: 'product-category' }, row.category)
        ])
      ])
    }
  },
  {
    title: 'Price',
    key: 'price',
    render: (row: Product) => {
      return h('div', { class: 'price-cell' }, [
        row.isOnSale ? h('span', { class: 'original-price' }, `$${row.price}`) : null,
        h('span', { class: 'current-price' }, `$${row.salePrice || row.price}`)
      ])
    }
  },
  {
    title: 'Stock',
    key: 'stock',
    render: (row: Product) => {
      const stockClass = getStockClass(row.stock)
      return h('span', { class: stockClass }, `${row.stock} units`)
    }
  },
  {
    title: 'Status',
    key: 'status',
    render: (row: Product) => {
      const type = row.status === 'active' ? 'success' : row.status === 'inactive' ? 'warning' : 'error'
      return h(NTag, { type, size: 'small' }, () => row.status.replace('_', ' ').toUpperCase())
    }
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (row: Product) => {
      return h('div', { class: 'action-buttons' }, [
        h(NButton, { size: 'small', onClick: () => viewProduct(row) }, () => h(NIcon, { component: EyeOutline })),
        h(NButton, { size: 'small', onClick: () => editProduct(row) }, () => h(NIcon, { component: CreateOutline })),
        h(NButton, { size: 'small', type: 'error', onClick: () => deleteProduct(row) }, () => h(NIcon, { component: TrashOutline }))
      ])
    }
  }
]

const filteredProducts = computed(() => {
  let result = [...products.value]
  
  // Search filter
  if (searchQuery.value) {
    result = result.filter(product =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  // Category filter
  if (selectedCategory.value) {
    result = result.filter(product => product.category === selectedCategory.value)
  }
  
  // Status filter
  if (selectedStatus.value) {
    result = result.filter(product => product.status === selectedStatus.value)
  }
  
  // Sort
  result.sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'price_asc':
        return (a.salePrice || a.price) - (b.salePrice || b.price)
      case 'price_desc':
        return (b.salePrice || b.price) - (a.salePrice || a.price)
      case 'stock':
        return a.stock - b.stock
      case 'date':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default:
        return 0
    }
  })
  
  pagination.value.itemCount = result.length
  return result
})

const getStockClass = (stock: number) => {
  if (stock === 0) return 'stock-out'
  if (stock < 10) return 'stock-low'
  return 'stock-good'
}

const handleSearch = () => {
  pagination.value.page = 1
}

const handleFilterChange = () => {
  pagination.value.page = 1
}

const handleSort = () => {
  pagination.value.page = 1
}

const handlePageChange = (page: number) => {
  pagination.value.page = page
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = null
  selectedStatus.value = null
  sortBy.value = 'name'
  pagination.value.page = 1
}

const viewProduct = (product: Product) => {
  // TODO: Navigate to product detail
  console.log('View product:', product)
}

const editProduct = (product: Product) => {
  // TODO: Open edit modal
  console.log('Edit product:', product)
}

const deleteProduct = (product: Product) => {
  // TODO: Implement delete confirmation
  console.log('Delete product:', product)
}

const saveProduct = () => {
  // TODO: Implement save logic
  console.log('Save product:', newProduct.value)
  store.showAddProductModal = false
}

onMounted(() => {
  // Initialize data
})
</script>

<style scoped>
.product-list {
  padding: 0 0 24px 24px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  padding: 20px;
  background: var(--bg-primary);
  border-radius: 8px;
}

.header-content h2 {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 600;
  color: var(--n-text-color-1);
}

.header-content p {
  margin: 0;
  color: var(--n-text-color-3);
  font-size: 14px;
}

.filters-card {
  margin-bottom: 24px;
}

.products-container {
  min-height: 400px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.product-card {
  cursor: pointer;
  transition: transform 0.2s;
  background-color: var(--bg-primary);
}

.product-card:hover {
  transform: translateY(-2px);
}

.product-image {
  position: relative;
  height: 200px;
  overflow: hidden;
  border-radius: 6px;
  margin-bottom: 12px;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-badges {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.product-info {
  margin-bottom: 12px;
}

.product-name {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--n-text-color-1);
  line-height: 1.4;
}

.product-category {
  margin: 0 0 8px 0;
  font-size: 13px;
  color: var(--n-text-color-3);
}

.product-price {
  margin-bottom: 8px;
}

.original-price {
  text-decoration: line-through;
  color: var(--n-text-color-3);
  margin-right: 8px;
  font-size: 14px;
}

.current-price {
  font-size: 18px;
  font-weight: 600;
  color: var(--n-text-color-1);
}

.product-stock {
  margin-bottom: 12px;
}

.stock-good {
  color: var(--n-success-color);
}

.stock-low {
  color: var(--n-warning-color);
}

.stock-out {
  color: var(--n-error-color);
}

.product-actions {
  display: flex;
  justify-content: flex-end;
}

/* Table styles */
.product-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.product-thumbnail {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
}

.product-details {
  display: flex;
  flex-direction: column;
}

.product-details .product-name {
  font-weight: 600;
  margin-bottom: 2px;
}

.product-details .product-category {
  font-size: 12px;
  color: var(--n-text-color-3);
}

.price-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.action-buttons {
  display: flex;
  gap: 4px;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
  }
  
  .filters-card :deep(.n-space) {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filters-card :deep(.n-input),
  .filters-card :deep(.n-select) {
    width: 100% !important;
  }
}
</style>
