<template>
  <div class="category-section">
    <div class="category-header">
      <h3>Categories</h3>
      <p>Filter questions by category</p>
    </div>
    <div class="category-pills">
      <n-button
        v-for="category in categories"
        :key="category"
        :type="selectedCategory === category ? 'primary' : 'default'"
        :secondary="selectedCategory !== category"
        size="medium"
        round
        @click="selectCategory(category)"
      >
        {{ category }}
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFaqFilters } from '../composables/useFaqFilters'

const {
  categories,
  selectedCategory,
  selectCategory
} = useFaqFilters()
</script>

<style scoped>
.category-section {
  text-align: center;
}

.category-header h3 {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.category-header p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.category-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

@media (max-width: 480px) {
  .category-pills {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }
}
</style>
