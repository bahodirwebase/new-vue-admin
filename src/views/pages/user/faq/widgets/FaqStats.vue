<script setup lang="ts">
import { 
  HelpCircleOutline, 
  ThumbsUpOutline, 
  TimeOutline 
} from '@vicons/ionicons5'
import { useFaqFilters } from '../composables/useFaqFilters'
import { useFaqData } from '../composables/useFaqData'
import { FAQ_STATS } from '../constants'

const { filteredFaqs } = useFaqFilters()
const { getTotalHelpfulVotes } = useFaqData()

const helpfulCount = getTotalHelpfulVotes()
const supportAvailable = FAQ_STATS.SUPPORT_AVAILABLE
</script>

<template>
  <div class="stats-section">
    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-icon">
          <n-icon :component="HelpCircleOutline" size="24" />
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ filteredFaqs.length }}</span>
          <span class="stat-label">Questions Found</span>
        </div>
      </div>
      <div class="stat-item">
        <div class="stat-icon">
          <n-icon :component="ThumbsUpOutline" size="24" />
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ helpfulCount }}</span>
          <span class="stat-label">Helpful Votes</span>
        </div>
      </div>
      <div class="stat-item">
        <div class="stat-icon">
          <n-icon :component="TimeOutline" size="24" />
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ supportAvailable }}</span>
          <span class="stat-label">Support Available</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-section {
  margin: 2rem 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--bg-primary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
