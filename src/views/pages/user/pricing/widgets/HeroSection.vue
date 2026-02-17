<script setup lang="ts">
import { usePricingToggle } from '../composables/usePricingToggle'
import CustomTag from '@/components/custom/CustomTag.vue'

const {
  isYearly,
  getDiscountPercentage
} = usePricingToggle()
</script>

<template>
  <div class="pricing-hero">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-info">
          <h1 class="page-title">Choose Your Perfect Plan</h1>
          <p class="page-description">
            Select the ideal plan for your needs. All plans include our core features with 24/7 support.
          </p>
        </div>
        <div class="header-actions">
          <div class="toggle-container">
            <span class="toggle-label" :class="{ active: !isYearly }">Monthly</span>
            <n-switch v-model="isYearly" size="large" />
            <span class="toggle-label" :class="{ active: isYearly }">
              Yearly
              <CustomTag type="success" size="small">Save {{ getDiscountPercentage() }}%</CustomTag>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pricing-hero {
  margin-bottom: 3rem;
}

.page-header {
  margin-bottom: 2rem;
  padding: 2rem 0;
  border-bottom: 1px solid var(--border-color);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.header-info {
  flex: 1;
}

.page-title {
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.page-description {
  color: var(--text-color-secondary);
  max-width: 600px;
  line-height: 1.6;
  margin: 0;
}

.header-actions {
  margin-left: 2rem;
  display: flex;
  justify-content: center;
}

.toggle-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--card-background);
  padding: 1rem 2rem;
  border-radius: 50px;
  border: 1px solid var(--border-color);
}

.toggle-label {
  color: var(--text-color-secondary);
  font-weight: 500;
  transition: color 0.3s ease;
}

.toggle-label.active {
  color: var(--text-color);
  font-weight: 600;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .header-actions {
    margin-left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  .toggle-container {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 1rem 0;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .page-description {
    font-size: 1rem;
  }
  
  .toggle-container {
    padding: 0.75rem 1.5rem;
    gap: 0.75rem;
  }
}

@media (max-width: 480px) {
  .page-header {
    padding: 0.75rem 0;
  }
  
  .toggle-container {
    padding: 0.75rem 1rem;
    gap: 0.75rem;
    flex-wrap: nowrap;
    overflow-x: auto;
    justify-content: center;
  }
  
  .toggle-label {
    font-size: 0.85rem;
    white-space: nowrap;
  }
}

@media (max-width: 360px) {
  .page-header {
    padding: 0.5rem 0;
  }
  
  .page-title {
    font-size: 1.25rem;
  }
  
  .page-description {
    font-size: 0.9rem;
  }
  
  .toggle-container {
    padding: 0.4rem 0.6rem;
    gap: 0.4rem;
    flex-wrap: nowrap;
    overflow-x: auto;
    justify-content: center;
  }
  
  .toggle-label {
    font-size: 0.8rem;
    white-space: nowrap;
  }
}
</style>
