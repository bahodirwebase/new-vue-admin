<script setup lang="ts">
import { NCard, NButton, NIcon, NList, NListItem } from 'naive-ui';
import VueApexCharts from 'vue3-apexcharts';
import { BROWSER_STATS, BROWSER_COLORS } from '../constants';

const apexchart = VueApexCharts;

const series = BROWSER_STATS.map(s => s.value);

const chartOptions = {
  chart: {
    type: 'donut' as const,
    fontFamily: 'Inter, sans-serif'
  },
  labels: BROWSER_STATS.map(s => s.name),
  colors: BROWSER_COLORS,
  plotOptions: {
    pie: {
      donut: {
        size: '75%',
        labels: { show: false }
      }
    }
  },
  dataLabels: { enabled: false },
  legend: { show: false },
  stroke: {
    show: true,
    width: 8,
    colors: ['var(--bg-primary)']
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: (val: number) => val + ' projects'
    }
  }
};
</script>

<template>
  <n-card class="projects-card" :bordered="false">
    <div class="card-header">
      <h3 class="card-title">Browser Usage</h3>
      <n-button text class="expand-btn">
        <n-icon :size="20">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </n-icon>
      </n-button>
    </div>

    <div class="chart-container">
      <apexchart type="donut" height="240" :options="chartOptions" :series="series" />
    </div>

    <n-list :show-divider="true" size="small">
      <n-list-item v-for="stat in BROWSER_STATS" :key="stat.name">
        <div class="browser-stat">
          <div class="stat-indicator" :style="{ background: stat.colorVar }"></div>
          <div class="stat-content">
            <span class="stat-label">{{ stat.name }}:</span>
            <span class="stat-value">{{ stat.value }}</span>
          </div>
        </div>
      </n-list-item>
    </n-list>
  </n-card>
</template>

<style scoped>
.projects-card {
  width: 100%;
  box-shadow: var(--shadow-md);
  background: var(--bg-primary);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.125rem;
}

.expand-btn {
  color: var(--text-secondary);
  padding: 0.375rem;
  transition: all 0.2s ease;
}

.expand-btn:hover {
  color: var(--text-primary);
  background: var(--bg-secondary);
  border-radius: 0.5rem;
}

.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1.5rem;
  min-height: 240px;
  contain: layout;
}

.browser-stat {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.stat-indicator {
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 50%;
  flex-shrink: 0;
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.stat-value {
  font-size: 0.875rem;
  color: var(--text-primary);
  font-weight: 700;
}

:deep(.n-list-item) {
  padding: 0.25rem 0;
}

:deep(.n-list-item:not(:last-child)) {
  border-bottom: none;
}

[data-theme="dark"] .expand-btn:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .projects-card {
    border-radius: 1rem;
  }

  .chart-container {
    margin: 0 auto 1rem;
  }
}
</style>
