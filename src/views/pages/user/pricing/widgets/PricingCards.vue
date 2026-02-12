<script setup lang="ts">
import { StarOutline, CheckmarkOutline } from '@vicons/ionicons5'
import { usePricingPlans } from '../composables/usePricingPlans'
import { usePricingToggle } from '../composables/usePricingToggle'
import { usePricingActions } from '../composables/usePricingActions'

const {
  plans,
  calculatePrice,
  formatPrice
} = usePricingPlans()

const {
  isYearly,
  getCurrency,
  getBillingPeriod,
  getSavingsText
} = usePricingToggle()

const {
  selectPlan
} = usePricingActions()

const handleSelectPlan = (planId: string) => {
  selectPlan(planId)
}
</script>

<template>
  <div class="pricing-grid">
    <n-card 
      v-for="plan in plans" 
      :key="plan.id"
      class="pricing-card"
      :class="{
        'basic-card': plan.id === 'basic',
        'pro-card': plan.id === 'pro',
        'enterprise-card': plan.id === 'enterprise',
        'featured': plan.featured
      }"
      :bordered="false"
    >
      <!-- Popular Badge -->
      <div v-if="plan.featured && plan.badge" class="popular-badge">
        <n-icon :component="StarOutline" />
        <span>{{ plan.badge }}</span>
      </div>
      
      <!-- Plan Header -->
      <div class="plan-header">
        <div class="plan-icon">
          <n-icon :component="plan.icon" />
        </div>
        <h3 class="plan-name">{{ plan.name }}</h3>
        <p class="plan-description">{{ plan.description }}</p>
      </div>
      
      <!-- Plan Pricing -->
      <div class="plan-pricing">
        <div class="price-display">
          <span class="currency">{{ getCurrency() }}</span>
          <span class="amount">{{ formatPrice(calculatePrice(plan, isYearly)) }}</span>
          <span class="period">{{ getBillingPeriod() }}</span>
        </div>
        <p v-if="isYearly" class="yearly-savings">
          {{ getSavingsText(plan.monthlyPrice) }}
        </p>
      </div>

      <!-- Plan Features -->
      <div class="plan-features">
        <div 
          v-for="feature in plan.features" 
          :key="feature"
          class="feature-item"
        >
          <n-icon :component="CheckmarkOutline" />
          <span>{{ feature }}</span>
        </div>
      </div>

      <!-- CTA Button -->
      <n-button 
        class="plan-button"
        :type="plan.featured ? 'primary' : 'default'"
        size="large"
        @click="handleSelectPlan(plan.id)"
      >
        {{ plan.ctaText }}
      </n-button>
    </n-card>
  </div>
</template>

<style scoped>
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.pricing-card {
  position: relative;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.pricing-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.pricing-card.featured {
  border-color: var(--primary-color);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.15);
}

.pricing-card.featured:hover {
  box-shadow: 0 20px 48px rgba(99, 102, 241, 0.25);
}

.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  z-index: 1;
}

.plan-header {
  text-align: center;
  margin-bottom: 2rem;
}

.plan-icon {
  width: 64px;
  height: 64px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto 1rem;
  font-size: 1.5rem;
}

.pro-card .plan-icon {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-hover) 100%);
}

.enterprise-card .plan-icon {
  background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
}

.plan-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.plan-description {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
}

.plan-pricing {
  text-align: center;
  margin-bottom: 2rem;
}

.price-display {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.currency {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

.amount {
  font-size: 3rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1;
}

.period {
  font-size: 1rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.yearly-savings {
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin: 0;
}

.plan-features {
  margin-bottom: 2rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.feature-item .n-icon {
  color: #22c55e;
  flex-shrink: 0;
}

.plan-button {
  width: 100%;
  padding: 1rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .pricing-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .amount {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .price-display {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .amount {
    font-size: 2rem;
  }
}
</style>
