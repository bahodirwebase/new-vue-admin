export interface PricingPlan {
  id: string
  name: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  icon: any
  featured?: boolean
  badge?: string
  features: string[]
  ctaText: string
}

export interface FeatureItem {
  name: string
  icon: any
  basic: boolean
  pro: boolean
  enterprise: boolean
}

export interface FaqItem {
  question: string
  answer: string
}

export interface PricingToggle {
  isYearly: boolean
  monthlyDiscount: number
  yearlyDiscount: number
}

export type PlanType = 'basic' | 'pro' | 'enterprise'
