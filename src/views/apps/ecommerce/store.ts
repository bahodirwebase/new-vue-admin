import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEcommerceStore = defineStore('ecommerce', () => {
  const viewMode = ref<'grid' | 'list'>('grid')
  const showAddProductModal = ref(false)

  const setViewMode = (mode: 'grid' | 'list') => {
    viewMode.value = mode
  }
  const exportProducts = () => {
    // TODO: Implement export functionality
    console.log('Export products')
  }

  return {
    viewMode,
    showAddProductModal,
    setViewMode,
    exportProducts
  }
})