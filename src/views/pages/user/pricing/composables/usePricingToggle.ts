import { ref } from 'vue'
import { PRICING_UI } from '../constants'

export function usePricingToggle() {
  // Toggle State
  const isYearly = ref(false)
  
  // Toggle methods
  const toggleBilling = () => {
    isYearly.value = !isYearly.value
  }
  
  const setYearly = (yearly: boolean) => {
    isYearly.value = yearly
  }
  
  // Get discount percentage
  const getDiscountPercentage = (): number => {
    return PRICING_UI.YEARLY_DISCOUNT
  }
  
  // Get billing period text
  const getBillingPeriod = (): string => {
    return PRICING_UI.PERIOD
  }
  
  // Get currency symbol
  const getCurrency = (): string => {
    return PRICING_UI.CURRENCY
  }
  
  // Calculate savings text
  const getSavingsText = (monthlyPrice: number): string => {
    const yearlyPrice = monthlyPrice * (1 - PRICING_UI.YEARLY_DISCOUNT / 100)
    const yearlyTotal = yearlyPrice * 12
    return `Billed annually ($${yearlyTotal}/year)`
  }
  
  return {
    // State
    isYearly,
    
    // Methods
    toggleBilling,
    setYearly,
    
    // Getters
    getDiscountPercentage,
    getBillingPeriod,
    getCurrency,
    getSavingsText
  }
}
