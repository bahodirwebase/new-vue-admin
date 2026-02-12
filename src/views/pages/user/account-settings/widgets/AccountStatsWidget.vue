<script setup lang="ts">
import { ref } from 'vue'
import { 
  BarChartOutline, 
  CalendarOutline, 
  DocumentTextOutline, 
  TimeOutline, 
  ShieldCheckmarkOutline,
  RefreshOutline
} from '@vicons/ionicons5'
import { useAccountStats } from '../composables/useAccountStats'

const {
  accountStats,
  refreshStats,
  getSecurityLevelColor
} = useAccountStats()

// Add loading state for refresh operation
const isLoading = ref(false)

const handleRefreshStats = async () => {
  isLoading.value = true
  try {
    await refreshStats()
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <n-card class="stats-card" :bordered="false">
    <template #header>
      <div class="card-header">
        <div class="header-title">
          <n-icon :component="BarChartOutline" />
          <h3>Account Statistics</h3>
        </div>
        <n-button text size="small" @click="handleRefreshStats" :loading="isLoading">
          <n-icon :component="RefreshOutline" />
        </n-button>
      </div>
    </template>
    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-icon">
          <n-icon :component="CalendarOutline" />
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ accountStats.memberSince }}</span>
          <span class="stat-label">Member Since</span>
        </div>
      </div>
      <div class="stat-item">
        <div class="stat-icon">
          <n-icon :component="DocumentTextOutline" />
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ accountStats.totalProjects }}</span>
          <span class="stat-label">Total Projects</span>
        </div>
      </div>
      <div class="stat-item">
        <div class="stat-icon">
          <n-icon :component="TimeOutline" />
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ accountStats.lastLogin }}</span>
          <span class="stat-label">Last Login</span>
        </div>
      </div>
      <div class="stat-item">
        <div class="stat-icon">
          <n-icon :component="ShieldCheckmarkOutline" />
        </div>
        <div class="stat-info">
          <span 
            class="stat-value" 
            :style="{ color: getSecurityLevelColor(accountStats.securityLevel) }"
          >
            {{ accountStats.securityLevel }}
          </span>
          <span class="stat-label">Security Level</span>
        </div>
      </div>
    </div>
  </n-card>
</template>

<style scoped>
.stats-card {
  transition: all 0.3s ease;
}

.stats-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;
}

.stat-item:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-icon {
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

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-value {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 1.1rem;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-secondary);
}
</style>
