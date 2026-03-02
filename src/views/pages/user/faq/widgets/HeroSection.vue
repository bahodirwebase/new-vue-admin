<script setup lang="ts">
import { SearchOutline } from '@vicons/ionicons5'
import { useFaqFilters } from '../composables/useFaqFilters'

const {
  searchQuery,
  clearSearch
} = useFaqFilters()
</script>

<template>
  <div class="faq-hero">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-info">
          <h1 class="page-title">Frequently Asked Questions</h1>
          <p class="page-description">
            Find answers to common questions about our service and get the help you need quickly.
          </p>
        </div>
        <div class="header-actions">
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
  </div>
</template>

<style scoped lang="scss">
.faq-hero {
  margin-bottom: 3rem;
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
  display: flex;
  justify-content: center;
}

.search-container {
  max-width: 400px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .header-actions {
    justify-content: center;
  }

  .search-container {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .page-description {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 360px) {
  .page-title {
    font-size: 1.25rem;
  }

  .page-description {
    font-size: 0.9rem;
  }
}
</style>
