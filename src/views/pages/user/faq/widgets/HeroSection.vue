<template>
  <div class="faq-hero">
    <div class="hero-content">
      <div class="hero-info">
        <h1 class="hero-title">Frequently Asked Questions</h1>
        <p class="hero-description">
          Find answers to common questions about our service and get the help you need quickly.
        </p>
      </div>
      <div class="hero-search">
        <div class="search-container">
          <n-input 
            v-model:value="searchQuery" 
            placeholder="Search for answers..."
            size="large"
            clearable
            @clear="clearSearch"
          >
            <template #prefix>
              <n-icon :component="SearchOutline" />
            </template>
          </n-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SearchOutline } from '@vicons/ionicons5'
import { useFaqFilters } from '../composables/useFaqFilters'

const {
  searchQuery,
  clearSearch
} = useFaqFilters()
</script>

<style scoped>
.faq-hero {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-hover) 100%);
  padding: 4rem 0;
  margin-bottom: 3rem;
}

.hero-content {
  max-width: 800px;
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

.hero-search {
  max-width: 500px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-description {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.5rem;
  }
}
</style>
