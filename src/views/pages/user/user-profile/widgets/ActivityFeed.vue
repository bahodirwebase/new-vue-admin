<script setup lang="ts">
import { FilterOutline } from '@vicons/ionicons5'
import { useActivityFeed } from '../composables/useActivityFeed'

const {
  filteredActivities,
  activityOptions,
  filterActivities
} = useActivityFeed()
</script>

<template>
  <n-card class="activity-card" :bordered="false">
    <template #header>
      <div class="card-header">
        <h3>Recent Activity</h3>
        <n-dropdown :options="activityOptions" @select="filterActivities">
          <n-button text size="small">
            <n-icon :component="FilterOutline" />
          </n-button>
        </n-dropdown>
      </div>
    </template>
    <div class="activity-list">
      <div 
        v-for="activity in filteredActivities" 
        :key="activity.id"
        class="activity-item"
      >
        <div class="activity-icon">
          <n-icon :component="activity.icon" />
        </div>
        <div class="activity-content">
          <p class="activity-text">{{ activity.text }}</p>
          <span class="activity-time">{{ activity.time }}</span>
        </div>
      </div>
    </div>
  </n-card>
</template>

<style scoped>
.activity-card {
  transition: all 0.3s ease;
}

.activity-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
  color: var(--text-primary);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  transition: all 0.2s ease;
  border: 1px solid var(--border-color);
}

.activity-item:hover {
  background: var(--bg-primary);
  border-color: var(--primary-color);
  transform: translateX(4px);
}

.activity-icon {
  width: 40px;
  height: 40px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.activity-content {
  flex: 1;
}

.activity-text {
  color: var(--text-primary);
  font-weight: 500;
  margin-bottom: 0.25rem;
  line-height: 1.4;
}

.activity-time {
  color: var(--text-secondary);
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .activity-item {
    padding: 0.75rem;
  }
  
  .activity-icon {
    width: 32px;
    height: 32px;
  }
  
  .activity-text {
    font-size: 0.9rem;
  }
}
</style>
