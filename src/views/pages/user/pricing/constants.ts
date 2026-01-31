import { 
  RocketOutline, TrophyOutline, BusinessOutline,
  PeopleOutline, ShieldCheckmarkOutline, CloudOutline,
  StatsChartOutline, CodeOutline, SchoolOutline
} from '@vicons/ionicons5'
import type { PricingPlan, FeatureItem, FaqItem } from './types'

// Pricing Plans Data
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Perfect for individuals and small projects',
    monthlyPrice: 12,
    yearlyPrice: 9,
    icon: RocketOutline,
    features: [
      'Up to 5 projects',
      'Basic analytics dashboard',
      'Email support (48h response)',
      '1GB cloud storage',
      'Mobile app access'
    ],
    ctaText: 'Get Started'
  },
  {
    id: 'pro',
    name: 'Professional',
    description: 'Great for growing teams and businesses',
    monthlyPrice: 29,
    yearlyPrice: 24,
    icon: TrophyOutline,
    featured: true,
    badge: 'Most Popular',
    features: [
      'Up to 50 projects',
      'Advanced analytics & reports',
      'Priority support (24h response)',
      '50GB cloud storage',
      'Mobile app access',
      'Team collaboration tools',
      'API access',
      'Custom integrations'
    ],
    ctaText: 'Get Started'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Advanced features for large organizations',
    monthlyPrice: 99,
    yearlyPrice: 79,
    icon: BusinessOutline,
    features: [
      'Unlimited projects',
      'Enterprise analytics suite',
      'Dedicated support team',
      'Unlimited cloud storage',
      'Mobile app access',
      'Advanced team management',
      'Full API access',
      'Custom integrations',
      'SSO & advanced security',
      'Custom training & onboarding'
    ],
    ctaText: 'Contact Sales'
  }
]

// Comparison Features
export const COMPARISON_FEATURES: FeatureItem[] = [
  { name: 'Projects', icon: RocketOutline, basic: true, pro: true, enterprise: true },
  { name: 'Team Members', icon: PeopleOutline, basic: false, pro: true, enterprise: true },
  { name: 'Advanced Security', icon: ShieldCheckmarkOutline, basic: false, pro: true, enterprise: true },
  { name: 'Cloud Storage', icon: CloudOutline, basic: true, pro: true, enterprise: true },
  { name: 'Analytics', icon: StatsChartOutline, basic: true, pro: true, enterprise: true },
  { name: 'API Access', icon: CodeOutline, basic: false, pro: true, enterprise: true },
  { name: 'Priority Support', icon: SchoolOutline, basic: false, pro: true, enterprise: true }
]

// FAQ Data
export const PRICING_FAQ: FaqItem[] = [
  {
    question: 'Can I change my plan anytime?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle, and we\'ll prorate any differences.'
  },
  {
    question: 'What happens if I exceed my limits?',
    answer: 'We\'ll notify you when you\'re approaching your limits. You can upgrade your plan or purchase add-ons for additional resources. We never cut off your service unexpectedly.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 30-day money-back guarantee for all new subscriptions. No questions asked. Just contact our support team within 30 days of your purchase.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely! We use industry-standard encryption, regular security audits, and comply with GDPR, CCPA, and other major data protection regulations.'
  },
  {
    question: 'Can I cancel my subscription?',
    answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.'
  }
]

// Messages
export const PRICING_MESSAGES = {
  PLAN_SELECTED: (plan: string) => `Great choice! You've selected the ${plan} plan.`,
  ENTERPRISE_CONTACT: 'Our sales team will contact you soon!',
  FREE_TRIAL_ACTIVATED: 'Your free trial has been activated!',
  DEMO_SCHEDULED: 'Please select a time for your demo'
}

// UI Constants
export const PRICING_UI = {
  YEARLY_DISCOUNT: 20,
  CURRENCY: '$',
  PERIOD: '/month'
}
