import { reactive } from 'vue'
import { PRICING_PLANS } from '../constants'
import type { PricingPlan } from '../types'

export function usePricingPlans() {
  // Pricing Plans State
  const plans = reactive<PricingPlan[]>(PRICING_PLANS)
  
  // Get plan by ID
  const getPlanById = (id: string): PricingPlan | undefined => {
    return plans.find(plan => plan.id === id)
  }
  
  // Get featured plan
  const getFeaturedPlan = (): PricingPlan | undefined => {
    return plans.find(plan => plan.featured)
  }
  
  // Calculate price based on billing cycle
  const calculatePrice = (plan: PricingPlan, isYearly: boolean): number => {
    return isYearly ? plan.yearlyPrice : plan.monthlyPrice
  }
  
  // Calculate yearly savings
  const calculateYearlySavings = (plan: PricingPlan): number => {
    const monthlyTotal = plan.monthlyPrice * 12
    const yearlyTotal = plan.yearlyPrice * 12
    return monthlyTotal - yearlyTotal
  }
  
  // Format price display
  const formatPrice = (price: number): string => {
    return price.toString()
  }
  
  // Get plan features
  const getPlanFeatures = (planId: string): string[] => {
    const plan = getPlanById(planId)
    return plan ? plan.features : []
  }
  
  return {
    plans,
    getPlanById,
    getFeaturedPlan,
    calculatePrice,
    calculateYearlySavings,
    formatPrice,
    getPlanFeatures
  }
}
