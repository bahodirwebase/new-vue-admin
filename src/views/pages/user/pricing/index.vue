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

.pricing-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
}

.content-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .pricing-content {
    max-width: 100%;
    padding: 0 1.5rem 3rem;
  }
  
  .content-container {
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .pricing-content {
    padding: 0 1rem 2rem;
  }
  
  .content-container {
    gap: 1.25rem;
  }
}

@media (max-width: 480px) {
  .pricing-content {
    padding: 0 0.75rem 1.5rem;
  }
  
  .content-container {
    gap: 1rem;
  }
}

@media (max-width: 360px) {
  .pricing-content {
    padding: 0 0.5rem 1rem;
  }
  
  .content-container {
    gap: 0.75rem;
  }
}
</style>
