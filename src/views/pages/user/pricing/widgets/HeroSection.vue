<template>
  <div class="pricing-hero">
    <div class="hero-content">
      <div class="hero-info">
        <h1 class="hero-title">Choose Your Perfect Plan</h1>
        <p class="hero-description">
          Select the ideal plan for your needs. All plans include our core features with 24/7 support.
        </p>
      </div>
      <div class="hero-toggle">
        <div class="toggle-container">
          <span class="toggle-label" :class="{ active: !isYearly }">Monthly</span>
          <n-switch v-model:value="isYearly" size="large" @update:value="toggleBilling" />
          <span class="toggle-label" :class="{ active: isYearly }">
            Yearly
            <n-tag type="success" size="small">Save {{ getDiscountPercentage() }}%</n-tag>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePricingToggle } from '../composables/usePricingToggle'

const {
  isYearly,
  toggleBilling,
  getDiscountPercentage
} = usePricingToggle()
</script>

<style scoped>
.pricing-hero {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-hover) 100%);
  padding: 4rem 0;
  margin-bottom: 3rem;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
}

.hero-description {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.hero-toggle {
  display: flex;
  justify-content: center;
}

.toggle-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem 2rem;
  border-radius: 50px;
  backdrop-filter: blur(10px);
}

.toggle-label {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  transition: color 0.3s ease;
}

.toggle-label.active {
  color: white;
  font-weight: 600;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .toggle-container {
    padding: 0.75rem 1.5rem;
    gap: 0.75rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.5rem;
  }

  .toggle-container {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
}
</style>
