<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { NCard, NButton, NIcon, NDropdown } from 'naive-ui';
import VueApexCharts from 'vue3-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { LINE_CHART_SERIES, LINE_CHART_CATEGORIES, LINE_CHART_DROPDOWN } from '../constants';
import { useAnalytical } from '../composables/useAnalytical';

const apexchart = VueApexCharts;
const { isDark } = useAnalytical();

const series = LINE_CHART_SERIES;
const dropdownOptions = LINE_CHART_DROPDOWN;

const chartOptions = ref<ApexOptions>({
  chart: {
    type: 'line',
    height: 280,
    toolbar: { show: false },
    zoom: { enabled: false },
    sparkline: { enabled: false },
    dropShadow: {
      enabled: true,
      top: 10,
      left: 0,
      blur: 4,
      color: 'var(--color-error)',
      opacity: 0.25,
    },
  },
  stroke: {
    curve: 'smooth',
    width: 3,
    colors: ['var(--primary-color)']
  },
  markers: {
    size: 5,
    colors: ['var(--primary-color)'],
    strokeColors: 'var(--bg-primary)',
    strokeWidth: 2,
    hover: { size: 7 }
  },
  grid: {
    show: true,
    borderColor: 'var(--border-color)',
    strokeDashArray: 3,
    position: 'back',
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } }
  },
  xaxis: {
    categories: LINE_CHART_CATEGORIES,
    labels: {
      style: { colors: 'var(--text-secondary)', fontSize: '12px', fontWeight: 500 }
    },
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  yaxis: {
    min: 0,
    max: 100,
    tickAmount: 5,
    labels: {
      style: { colors: 'var(--text-secondary)', fontSize: '12px', fontWeight: 500 }
    }
  },
  annotations: {
    xaxis: [
      {
        x: 'Jan 9',
        strokeDashArray: 4,
        borderColor: 'var(--color-primary)',
        borderWidth: 2,
        opacity: 0.3
      }
    ]
  },
  tooltip: {
    theme: 'light',
    y: {
      formatter: (val: any) => val + ' calls'
    }
  },
});

const setTheme = (dark: boolean) => {
  if (chartOptions.value.tooltip) {
    chartOptions.value.tooltip.theme = dark ? 'dark' : 'light'
  }
}

watch(isDark, setTheme)
onMounted(() => setTheme(isDark.value))
</script>

<template>
  <n-card class="chart-card" :bordered="false">
    <div class="card-header">
      <h3 class="card-title">Call By Hour</h3>
      <n-dropdown :options="dropdownOptions" placement="bottom-end">
        <n-button text class="menu-btn">
          <n-icon :size="20">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </n-icon>
        </n-button>
      </n-dropdown>
    </div>

    <div class="chart-wrapper">
      <apexchart type="line" height="280" :options="chartOptions" :series="series" :key="(isDark as any)" />
    </div>
  </n-card>
</template>

<style scoped>
.chart-card {
  width: 100%;
  box-shadow: var(--shadow-md);
  background: var(--bg-primary);
}

.card-title {
  font-size: 1.25rem;
}

.menu-btn {
  color: var(--text-secondary);
  padding: 0.25rem;
  transition: all 0.2s ease;
}

.menu-btn:hover {
  color: var(--text-primary);
  background: var(--bg-secondary);
  border-radius: 0.5rem;
}

.chart-wrapper {
  margin: 0 -1rem;
}

[data-theme="dark"] .menu-btn:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .chart-card {
    border-radius: 1rem;
  }

  .chart-wrapper {
    margin: 0 -0.5rem;
  }
}
</style>
