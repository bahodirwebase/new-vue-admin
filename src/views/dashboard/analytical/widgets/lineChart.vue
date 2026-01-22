<template>
  <n-card class="chart-card" :bordered="false">
      <div class="card-header">
        <h3 class="card-title">Call By Hour</h3>
        <n-dropdown :options="dropdownOptions" placement="bottom-end">
          <n-button text class="menu-btn">
            <n-icon :size="20">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="5" r="2"/>
                <circle cx="12" cy="12" r="2"/>
                <circle cx="12" cy="19" r="2"/>
              </svg>
            </n-icon>
          </n-button>
        </n-dropdown>
      </div>

      <div class="chart-wrapper">
        <apexchart
          type="line"
          height="280"
          :options="(chartOptions as ApexOptions)"
          :series="series"
          :key="(isDark as any)"
        />
      </div>
    </n-card>
</template>

<script setup lang="ts">
import { ref, watch, toRef } from 'vue';
import { NCard, NButton, NIcon, NDropdown } from 'naive-ui';
import VueApexCharts from 'vue3-apexcharts';
import { useThemeStore } from '@/stores/theme';
import type { ApexOptions } from 'apexcharts';
const themeStore = useThemeStore();
const apexchart = VueApexCharts;

const isDark = toRef(themeStore, 'isDark');
const dropdownOptions = [
  { label: 'Export', key: 'export' },
  { label: 'Share', key: 'share' },
  { label: 'Settings', key: 'settings' }
];

const series = ref([
  {
    name: 'Calls',
    data: [70, 25, 65, 100, 70, 30, 60, 65, ]
  }
]);

const chartOptions = ref({
  chart: {
    type: 'line',
    height: 280,
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    },
    sparkline: { enabled: false }, // Card ichiga to'liq sig'ishi uchun
    dropShadow: {
      enabled: true,
      top: 10,
      left: 0,
      blur: 4,
      color: "var(--color-error)", // Soya rangi
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
    hover: {
      size: 7
    }
  },
  grid: {
    show: true,
    borderColor: 'var(--border-color)',
    strokeDashArray: 3,
    position: 'back',
    xaxis: {
      lines: {
        show: false
      }
    },
    yaxis: {
      lines: {
        show: true
      }
    }
  },
  xaxis: {
    categories: ['Jan 2', 'Jan 9', 'Jan 16', 'Jan 23', 'Jan 30', 'Jan 35', 'Jan 35', 'Jan 35'],
    labels: {
      style: {
        colors: 'var(--text-secondary)',
        fontSize: '12px',
        fontWeight: 500
      }
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    min: 0,
    max: 100,
    tickAmount: 5,
    labels: {
      style: {
        colors: 'var(--text-secondary)',
        fontSize: '12px',
        fontWeight: 500
      }
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
    theme: 'light', // Initial theme, will be updated by watch
    // style: {
    //   fontSize: '12px'
    // },
    y: {
      formatter: function(val: any) {
        return val + ' calls'
      }
    }
  },
});
watch(
  isDark,
  (newValue) => {
    if(chartOptions.value.tooltip){
      chartOptions.value.tooltip.theme = newValue ? 'dark' : 'light'
    }
  }
)
</script>

<style scoped>
.chart-card {
  width: 100%;
  box-shadow: var(--shadow-md);
  background: var(--bg-primary);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
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

/* Dark mode specific styles */
[data-theme="dark"] .menu-btn:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Responsive design */
@media (max-width: 768px) {
  .chart-card {
    border-radius: 1rem;
  }
  
  .chart-wrapper {
    margin: 0 -0.5rem;
  }
}
</style>