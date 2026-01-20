<template>
  <n-card class="projects-card" :bordered="false">
      <div class="card-header">
        <h3 class="card-title">Projects Overview</h3>
        <n-button text class="expand-btn">
          <n-icon :size="20">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </n-icon>
        </n-button>
      </div>

      <div class="chart-container">
        <apexchart
          type="donut"
          height="240"
          :options="chartOptions"
          :series="series"
        />
      </div>

      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-indicator in-progress"></div>
          <div class="stat-content">
            <span class="stat-label">In Progress:</span>
            <span class="stat-value">14</span>
          </div>
        </div>

        <div class="stat-item">
          <div class="stat-indicator completed"></div>
          <div class="stat-content">
            <span class="stat-label">Completed:</span>
            <span class="stat-value">32</span>
          </div>
        </div>

        <div class="stat-item">
          <div class="stat-indicator not-started"></div>
          <div class="stat-content">
            <span class="stat-label">Not Started:</span>
            <span class="stat-value">54</span>
          </div>
        </div>
      </div>
    </n-card>
</template>

<script setup>
import { ref } from 'vue';
import { NCard, NButton, NIcon } from 'naive-ui';
import VueApexCharts from 'vue3-apexcharts';

const apexchart = VueApexCharts;

const series = ref([14, 32, 54]);

const chartOptions = ref({
  chart: {
    type: 'donut',
    fontFamily: 'Inter, sans-serif'
  },
  labels: ['In Progress', 'Completed', 'Not Started'],
  colors: ['var(--color-warning)', 'var(--color-primary)', 'var(--text-tertiary)'],
  plotOptions: {
    pie: {
      donut: {
        size: '75%',
        labels: {
          show: false
        }
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  legend: {
    show: false
  },
  stroke: {
    show: true,
    width: 8,
    colors: ['var(--bg-primary)']
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: function(val) {
        return val + ' projects'
      }
    }
  }
});
</script>

<style scoped>
.projects-card {
  width: 100%;
  border-radius: 1.5rem;
  box-shadow: var(--shadow-md);
  background: var(--bg-primary);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
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
}

.stats-grid {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.stat-item {
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

.stat-indicator.in-progress {
  background: var(--color-warning);
}

.stat-indicator.completed {
  background: var(--color-primary);
}

.stat-indicator.not-started {
  background: var(--text-tertiary);
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

/* Dark mode specific styles */
[data-theme="dark"] .expand-btn:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Responsive design */
@media (max-width: 768px) {
  .projects-card {
    border-radius: 1rem;
  }
  
  .chart-container {
    margin: 0 auto 1rem;
  }
  
  .stats-grid {
    gap: 0.75rem;
  }
}
</style>