<template>
  <div class="popular-section">
    <n-card class="popular-card" :bordered="false">
      <template #header>
        <div class="card-header">
          <div class="header-title">
            <n-icon :component="TrendingUpOutline" />
            <h3>Popular Questions</h3>
          </div>
        </div>
      </template>
      
      <div class="popular-grid">
        <div 
          v-for="popular in popularQuestions" 
          :key="popular.id"
          class="popular-item"
          @click="goToQuestion(popular.id)"
        >
          <div class="popular-icon">
            <n-icon :component="BonfireOutline" />
          </div>
          <div class="popular-content">
            <h4>{{ popular.question }}</h4>
            <span class="popular-stats">{{ popular.views }} views</span>
          </div>
          <n-icon :component="ArrowForwardOutline" />
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { 
  TrendingUpOutline, 
  BonfireOutline, 
  ArrowForwardOutline 
} from '@vicons/ionicons5'
import { useFaqData } from '../composables/useFaqData'
import { useFaqInteractions } from '../composables/useFaqInteractions'

const { popularQuestions } = useFaqData()
const { goToQuestion } = useFaqInteractions()
</script>

<style scoped>
.popular-section {
  margin-top: 2rem;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-title h3 {
  margin: 0;
  color: var(--text-primary);
}

.popular-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.popular-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.popular-item:hover {
  background: var(--bg-primary);
  transform: translateX(4px);
}

.popular-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.popular-content {
  flex: 1;
}

.popular-content h4 {
  margin: 0 0 0.25rem 0;
  color: var(--text-primary);
  font-size: 0.95rem;
}

.popular-stats {
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.popular-item .n-icon:last-child {
  color: var(--text-secondary);
}

@media (max-width: 480px) {
  .popular-item {
    padding: 0.75rem;
  }
}
</style>
