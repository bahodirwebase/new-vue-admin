import { ref } from 'vue'
import { PRICING_FAQ } from '../constants'
import type { FaqItem } from '../types'

export function usePricingFaq() {
  // FAQ State
  const faqs = ref<FaqItem[]>(PRICING_FAQ)
  const expandedFaq = ref<number | null>(null)
  
  // Methods
  const toggleFaq = (index: number) => {
    expandedFaq.value = expandedFaq.value === index ? null : index
  }
  
  const closeAllFaq = () => {
    expandedFaq.value = null
  }
  
  const isFaqExpanded = (index: number): boolean => {
    return expandedFaq.value === index
  }
  
  // Get FAQ by index
  const getFaqByIndex = (index: number): FaqItem | undefined => {
    return faqs.value[index]
  }
  
  // Get total FAQ count
  const getFaqCount = (): number => {
    return faqs.value.length
  }
  
  return {
    // State
    faqs,
    expandedFaq,
    
    // Methods
    toggleFaq,
    closeAllFaq,
    isFaqExpanded,
    getFaqByIndex,
    getFaqCount
  }
}
