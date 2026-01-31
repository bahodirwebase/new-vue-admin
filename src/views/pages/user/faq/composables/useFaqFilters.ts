import { ref, computed } from 'vue'
import { FAQ_CATEGORIES } from '../constants'
import { useFaqData } from './useFaqData'
import type { FaqItem } from '../types'

export function useFaqFilters() {
  const { faqs, getFaqsByCategory, searchFaqs } = useFaqData()
  
  // Filter State
  const searchQuery = ref('')
  const selectedCategory = ref('All')
  
  // Categories
  const categories = FAQ_CATEGORIES
  
  // Computed: Filtered FAQs
  const filteredFaqs = computed<FaqItem[]>(() => {
    let filtered = faqs

    // Apply category filter
    if (selectedCategory.value !== 'All') {
      filtered = getFaqsByCategory(selectedCategory.value)
    }

    // Apply search filter
    if (searchQuery.value) {
      filtered = searchFaqs(searchQuery.value)
    }

    return filtered
  })
  
  // Methods
  const selectCategory = (category: string) => {
    selectedCategory.value = category
  }
  
  const clearSearch = () => {
    searchQuery.value = ''
  }
  
  const clearFilters = () => {
    searchQuery.value = ''
    selectedCategory.value = 'All'
  }
  
  return {
    // State
    searchQuery,
    selectedCategory,
    categories,
    
    // Computed
    filteredFaqs,
    
    // Methods
    selectCategory,
    clearSearch,
    clearFilters
  }
}
