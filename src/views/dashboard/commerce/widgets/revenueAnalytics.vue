<script setup lang="ts">
import { computed } from 'vue'
import { NButton, NDropdown, NIcon } from 'naive-ui'
import { ChevronDownOutline } from '@vicons/ionicons5'
import VueApexCharts from 'vue3-apexcharts'
import { REVENUE_SERIES, REVENUE_CATEGORIES, PERIOD_OPTIONS } from '../constants'
import { useCommerce } from '../composables/useCommerce'

const apexchart = VueApexCharts
const { selectedPeriod, setPeriod } = useCommerce()

const periodOptions = PERIOD_OPTIONS
const handlePeriodSelect = setPeriod
const series = REVENUE_SERIES

const chartOptions = computed(() => ({
  chart: {
    type: 'line',
    height: 350,
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    },
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  colors: ['var(--primary-color)', 'var(--text-secondary)'],
  stroke: {
    curve: 'smooth',
    width: [3, 3],
    dashArray: [0, 5]
  },
  grid: {
    borderColor: '#f0f0f0',
    strokeDashArray: 0,
    xaxis: {
      lines: {
        show: false
      }
    },
    yaxis: {
      lines: {
        show: true
      }
    },
    padding: {
      top: 0,
      right: 20,
      bottom: 0,
      left: 10
    }
  },
  dataLabels: {
    enabled: false
  },
  markers: {
    size: [5, 0],
    colors: ['var(--primary-color)'],
    strokeColors: '#fff',
    strokeWidth: 2,
    hover: {
      size: 7
    }
  },
  xaxis: {
    categories: REVENUE_CATEGORIES,
    labels: {
      style: {
        colors: '#999999',
        fontSize: '12px',
        fontWeight: 400
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
    max: 16000,
    tickAmount: 4,
    labels: {
      style: {
        colors: '#999999',
        fontSize: '12px',
        fontWeight: 400
      },
      formatter: function (value: number) {
        return (value / 1000) + 'K'
      }
    }
  },
  tooltip: {
    enabled: true,
    shared: false,
    followCursor: true,
    custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
      const value = series[seriesIndex][dataPointIndex]
      const label = w.globals.seriesNames[seriesIndex]

      return `
        <div class="custom-tooltip">
          <div class="custom-tooltip__label">${label}</div>
          <div class="custom-tooltip__value">$${value.toLocaleString()}</div>
        </div>
      `
    }
  },
  legend: {
    show: false
  }
}))
</script>

<template>
  <n-card>
    <div class="revenue-analytics__header">
      <div class="revenue-analytics__title-section">
        <h2 class="revenue-analytics__title">Revenue Analytics</h2>
        <div class="revenue-analytics__legend">
          <div class="legend-item">
            <span class="legend-item__line legend-item__line--revenue"></span>
            <span class="legend-item__text">Revenue</span>
          </div>
          <div class="legend-item">
            <span class="legend-item__line legend-item__line--order"></span>
            <span class="legend-item__text">Order</span>
          </div>
        </div>
      </div>

      <n-dropdown :options="periodOptions" @select="handlePeriodSelect" trigger="click">
        <n-button class="period-button" type="primary" strong>
          {{ selectedPeriod }}
          <template #icon>
            <n-icon :component="ChevronDownOutline" />
          </template>
        </n-button>
      </n-dropdown>
    </div>

    <div class="revenue-analytics__chart">
      <apexchart type="line" height="350" :options="(chartOptions as any)" :series="series" />
    </div>
  </n-card>
</template>

<style scoped>
.revenue-analytics__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.revenue-analytics__title-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.revenue-analytics__title {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

.revenue-analytics__legend {
  display: flex;
  gap: 24px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-item__line {
  width: 24px;
  height: 2px;
  display: block;
}

.legend-item__line--revenue {
  background: var(--primary-color);
}

.legend-item__line--order {
  background: var(--text-secondary);
}

.legend-item__text {
  font-size: 13px;
  color: #999999;
  font-weight: 400;
}

.period-button {
  border-radius: 8px;
  height: 40px;
  padding: 0 16px;
  font-weight: 600;
  font-size: 14px;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color) 100%);
  border: none;
  box-shadow: 0 1px 8px var(--primary-color);
  transition: all 0.3s ease;
}

.period-button:hover {
  box-shadow: 0 2px 12px var(--primary-color);
  transform: translateY(-1px);
}

.revenue-analytics__chart {
  margin: 0 -8px;
}

/* Custom ApexCharts tooltip styling */
:deep(.custom-tooltip) {
  background: var(--bg-primary);
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--text-secondary);
}

:deep(.custom-tooltip__label) {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 4px;
  font-weight: 400;
}

:deep(.custom-tooltip__value) {
  font-size: 18px;
  font-weight: 700;
}

:deep(.apexcharts-tooltip) {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

/* Responsive */
@media (max-width: 450px) {
  .revenue-analytics {
    padding: 16px;
  }

  .revenue-analytics__header {
    flex-direction: column;
    gap: 16px;
  }

  .revenue-analytics__title {
    font-size: 18px;
  }
}
</style>