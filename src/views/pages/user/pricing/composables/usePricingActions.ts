import { useMessage } from 'naive-ui'
import { PRICING_MESSAGES } from '../constants'

export function usePricingActions() {
  const message = useMessage()
  
  // Plan selection
  const selectPlan = (planId: string) => {
    if (planId === 'enterprise') {
      message.info(PRICING_MESSAGES.ENTERPRISE_CONTACT)
    } else {
      message.success(PRICING_MESSAGES.PLAN_SELECTED(planId))
    }
  }
  
  // Free trial
  const startFreeTrial = () => {
    message.success(PRICING_MESSAGES.FREE_TRIAL_ACTIVATED)
  }
  
  // Schedule demo
  const scheduleDemo = () => {
    message.info(PRICING_MESSAGES.DEMO_SCHEDULED)
  }
  
  // Contact sales
  const contactSales = () => {
    message.info(PRICING_MESSAGES.ENTERPRISE_CONTACT)
  }
  
  return {
    selectPlan,
    startFreeTrial,
    scheduleDemo,
    contactSales
  }
}
