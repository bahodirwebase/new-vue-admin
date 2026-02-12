<script setup lang="ts">
import { ref, computed, h } from 'vue'
import { NButton, NInput, NDropdown, NIcon, NDataTable } from 'naive-ui'
import { SearchOutline, ChevronDownOutline } from '@vicons/ionicons5'
import type { DataTableColumns } from 'naive-ui'
import CustomTag from '@/components/CustomTag.vue'

interface Order {
  no: number
  orderId: string
  customer: string
  product: string
  productIcon: string
  qty: number
  total: number
  status: 'Shipped' | 'Processing' | 'Delivered' | 'Pending'
}

const searchQuery = ref('')
const selectedCategory = ref('All Categories')

const categoryOptions = [
  { label: 'All Categories', key: 'all' },
  { label: 'Electronics', key: 'electronics' },
  { label: 'Fashion', key: 'fashion' },
  { label: 'Home & Kitchen', key: 'home' }
]

const handleCategorySelect = (key: string) => {
  const option = categoryOptions.find(opt => opt.key === key)
  if (option) {
    selectedCategory.value = option.label
  }
}

const orders = ref<Order[]>([
  {
    no: 1,
    orderId: '#10234',
    customer: 'Amaya Weller',
    product: 'Wireless Headphones',
    productIcon: '🎧',
    qty: 2,
    total: 100,
    status: 'Shipped'
  },
  {
    no: 2,
    orderId: '#10235',
    customer: 'Sebastian Adams',
    product: 'Running Shoes',
    productIcon: '👟',
    qty: 1,
    total: 75,
    status: 'Processing'
  },
  {
    no: 3,
    orderId: '#10236',
    customer: 'Suzanne Bright',
    product: 'Smartwatch',
    productIcon: '⌚',
    qty: 1,
    total: 150,
    status: 'Delivered'
  },
  {
    no: 4,
    orderId: '#10237',
    customer: 'Peter Howl',
    product: 'Coffee Maker',
    productIcon: '☕',
    qty: 1,
    total: 60,
    status: 'Pending'
  },
  {
    no: 5,
    orderId: '#10238',
    customer: 'Anita Singh',
    product: 'Bluetooth Speaker',
    productIcon: '🔊',
    qty: 3,
    total: 90,
    status: 'Shipped'
  }
])

const filteredOrders = computed(() => {
  if (!searchQuery.value) return orders.value

  const query = searchQuery.value.toLowerCase()
  return orders.value.filter(order =>
    order.customer.toLowerCase().includes(query) ||
    order.product.toLowerCase().includes(query) ||
    order.orderId.toLowerCase().includes(query)
  )
})

const getStatusType = (status: Order['status']) => {
  const statusMap = {
    'Shipped': 'warning',
    'Processing': 'warning',
    'Delivered': 'success',
    'Pending': 'error'
  }
  return statusMap[status] as 'warning' | 'success' | 'error'
}

const columns: DataTableColumns<Order> = [
  {
    title: 'No',
    key: 'no',
    width: 60,
    align: 'center'
  },
  {
    title: 'Order ID',
    key: 'orderId',
    width: 100
  },
  {
    title: 'Customer',
    key: 'customer',
    width: 150
  },
  {
    title: 'Product',
    key: 'product',
    render: (row) => {
      return h('div', { class: 'product-cell' }, [
        h('span', { class: 'product-cell__icon' }, row.productIcon),
        h('span', { class: 'product-cell__name' }, row.product)
      ])
    }
  },
  {
    title: 'Qty',
    key: 'qty',
    width: 80,
    align: 'center'
  },
  {
    title: 'Total',
    key: 'total',
    width: 100,
    render: (row) => '$' + row.total
  },
  {
    title: 'Status',
    key: 'status',
    width: 120,
    render: (row) => {
      return h(
        CustomTag,
        {
          type: getStatusType(row.status),
          round: true,
          size: 'small'
        },
        { default: () => row.status }
      )
    }
  }
]
</script>

<template>
  <n-card>
    <div class="recent-orders__header">
      <h2 class="recent-orders__title">Recent Orders</h2>

      <div class="recent-orders__actions">
        <n-input v-model:value="searchQuery" placeholder="Search product, customer, etc" class="search-input">
          <template #prefix>
            <n-icon :component="SearchOutline" />
          </template>
        </n-input>

        <n-dropdown :options="categoryOptions" @select="handleCategorySelect" trigger="click">
          <n-button class="category-button" type="primary" strong>
            {{ selectedCategory }}
            <template #icon>
              <n-icon :component="ChevronDownOutline" />
            </template>
          </n-button>
        </n-dropdown>
      </div>
    </div>

    <div class="recent-orders__table">
      <n-data-table :columns="columns" :data="filteredOrders" :pagination="false" :bordered="false" :single-line="false"
        :scroll-x="700" />
    </div>
  </n-card>
</template>

<style scoped>
.recent-orders__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 20px;
}

.recent-orders__title {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  flex-shrink: 0;
}

.recent-orders__actions {
  display: flex;
  gap: 12px;
  flex: 1;
  max-width: 600px;
  justify-content: flex-end;
}

.search-input {
  flex: 1;
  max-width: 350px;
}

.search-input :deep(.n-input__input-el) {
  font-size: 14px;
}

.search-input :deep(.n-input__prefix) {
  color: #999999;
}

.category-button {
  border-radius: 8px;
  height: 38px;
  padding: 0 16px;
  font-weight: 600;
  font-size: 14px;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-600) 100%);
  border: none;
  box-shadow: 0 2px 8px var(--primary-color-600);
  transition: all 0.3s ease;
  white-space: nowrap;
}

.category-button:hover {
  box-shadow: 0 4px 12px var(--primary-color-600);
  transform: translateY(-1px);
}

.recent-orders__table {
  overflow-x: auto;
}

.product-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.product-cell__icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff5eb;
  border-radius: 8px;
  font-size: 18px;
  flex-shrink: 0;
}

.product-cell__name {
  font-size: 14px;
  color: #333333;
  font-weight: 400;
}

/* Responsive */
@media (max-width: 1024px) {
  .recent-orders__header {
    flex-direction: column;
    align-items: stretch;
  }

  .recent-orders__actions {
    max-width: 100%;
  }

  .search-input {
    max-width: 100%;
  }
}

@media (max-width: 450px) {
  .recent-orders {
    padding: 20px;
    overflow-x: auto;
  }

  .recent-orders__title {
    font-size: 18px;
  }

  .recent-orders__actions {
    flex-direction: column;
  }

  .category-button {
    width: 100%;
  }
}
</style>