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
</style>
