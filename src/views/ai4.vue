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
  colors: ['#FB923C', '#3B82F6', '#E5E7EB'],
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
    colors: ['#fff']
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  background: white;
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
  color: #1f2937;
  margin: 0;
}

.expand-btn {
  color: #6b7280;
  padding: 0.375rem;
  transition: all 0.2s ease;
}

.expand-btn:hover {
  color: #374151;
  background: #f3f4f6;
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
  background: #FB923C;
}

.stat-indicator.completed {
  background: #3B82F6;
}

.stat-indicator.not-started {
  background: #9CA3AF;
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.stat-value {
  font-size: 0.875rem;
  color: #1f2937;
  font-weight: 700;
}
</style>