<script setup lang="ts">
import HeroSection from './widgets/HeroSection.vue'
import PricingCards from './widgets/PricingCards.vue'
import FeatureComparison from './widgets/FeatureComparison.vue'
import FaqSection from './widgets/FaqSection.vue'
import CtaSection from './widgets/CtaSection.vue'
</script>

<template>
  <div class="pricing">
    <!-- Hero Section -->
    <HeroSection />

    <!-- Pricing Content -->
    <div class="pricing-content">
      <div class="content-container">
        <!-- Pricing Cards -->
        <PricingCards />

        <!-- Feature Comparison -->
        <FeatureComparison />

        <!-- FAQ Section -->
        <FaqSection />

        <!-- CTA Section -->
        <CtaSection />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pricing {
  min-height: 100vh;
  background: var(--bg-secondary);
}

.content-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Responsive Design */
@media (max-width: 1024px) {

  .content-container {
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {

  .content-container {
    gap: 1.25rem;
  }
}

@media (max-width: 480px) {

  .content-container {
    gap: 1rem;
  }
}

@media (max-width: 360px) {

  .content-container {
    gap: 0.75rem;
  }
}
</style>
