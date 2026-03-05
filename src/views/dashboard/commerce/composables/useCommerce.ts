import { ref, computed } from 'vue'
import { ORDERS, CATEGORY_FILTER_OPTIONS, PERIOD_OPTIONS, CONVERSION_PERIOD_OPTIONS } from '../constants'
import type { Order } from '../types'

// Module-level singleton state shared across widgets
const searchQuery = ref('')
const selectedCategory = ref('All Categories')
const selectedPeriod = ref('Last 8 Days')
const selectedConversionPeriod = ref('This Week')

export function useCommerce() {
  const filteredOrders = computed<Order[]>(() => {
    if (!searchQuery.value) return ORDERS
    const query = searchQuery.value.toLowerCase()
    return ORDERS.filter(order =>
      order.customer.toLowerCase().includes(query) ||
      order.product.toLowerCase().includes(query) ||
      order.orderId.toLowerCase().includes(query)
    )
  })

  function setPeriod(key: string) {
    const option = PERIOD_OPTIONS.find(opt => opt.key === key)
    if (option) selectedPeriod.value = option.label
  }

  function setConversionPeriod(key: string) {
    const option = CONVERSION_PERIOD_OPTIONS.find(opt => opt.key === key)
    if (option) selectedConversionPeriod.value = option.label
  }

  function setCategory(key: string) {
    const option = CATEGORY_FILTER_OPTIONS.find(opt => opt.key === key)
    if (option) selectedCategory.value = option.label
  }

  return {
    searchQuery,
    selectedCategory,
    selectedPeriod,
    selectedConversionPeriod,
    filteredOrders,
    setPeriod,
    setConversionPeriod,
    setCategory
  }
}
