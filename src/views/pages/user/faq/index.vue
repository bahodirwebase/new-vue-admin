<script setup lang="ts">
import HeroSection from './widgets/HeroSection.vue'
import CategoryFilter from './widgets/CategoryFilter.vue'
import FaqStats from './widgets/FaqStats.vue'
import FaqList from './widgets/FaqList.vue'
import PopularQuestions from './widgets/PopularQuestions.vue'
import ContactSection from './widgets/ContactSection.vue'
</script>

<template>
  <div class="faq">
    <!-- Hero Section -->
    <HeroSection />

    <!-- Main Content -->
    <div class="faq-content">
      <div class="content-container">
        <!-- Category Filter -->
        <CategoryFilter />

        <!-- FAQ Stats -->
        <FaqStats />

        <!-- FAQ Items -->
        <FaqList />

        <!-- Popular Questions -->
        <PopularQuestions />

        <!-- Contact Section -->
        <ContactSection />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.faq {
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
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .content-container {
    gap: 1rem;
  }
}

@media (max-width: 360px) {
  .content-container {
    gap: 1rem;
  }
}
</style>
