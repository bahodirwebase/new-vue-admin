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
          :options="chartOptions"
          :series="series"
        />
      </div>
    </n-card>
</template>

<script setup>
import { ref } from 'vue';
import { NCard, NButton, NIcon, NDropdown } from 'naive-ui';
import VueApexCharts from 'vue3-apexcharts';

const apexchart = VueApexCharts;

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
    colors: ['#5B5FEF']
  },
  markers: {
    size: 5,
    colors: ['#5B5FEF'],
    strokeColors: '#fff',
    strokeWidth: 2,
    hover: {
      size: 7
    }
  },
  grid: {
    show: true,
    borderColor: '#f1f1f1',
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
        colors: '#9ca3af',
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
        colors: '#9ca3af',
        fontSize: '12px',
        fontWeight: 500
      }
    }
  },
  tooltip: {
    enabled: true,
    theme: 'light',
    style: {
      fontSize: '12px'
    },
    y: {
      formatter: function(val) {
        return val + ' calls'
      }
    }
  },
  annotations: {
    xaxis: [
      {
        x: 'Jan 9',
        strokeDashArray: 4,
        borderColor: '#5B5FEF',
        borderWidth: 2,
        opacity: 0.3
      }
    ]
  }
});
</script>

<style scoped>


.chart-card {
  width: 100%;
  border-radius: 1.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  background: white;
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
  color: #1f2937;
  margin: 0;
}

.menu-btn {
  color: #6b7280;
  padding: 0.25rem;
  transition: all 0.2s ease;
}

.menu-btn:hover {
  color: #374151;
  background: #f3f4f6;
  border-radius: 0.5rem;
}

.chart-wrapper {
  margin: 0 -1rem;
}
</style>