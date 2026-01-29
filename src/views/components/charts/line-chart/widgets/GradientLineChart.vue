<script lang="ts" setup>
import { ChevronDownOutline } from '@vicons/ionicons5';
import { computed, ref } from 'vue';
import { PERIOD_OPTIONS } from '../constants';

import VueApexCharts from 'vue3-apexcharts'
const apexchart = VueApexCharts

// Period states
const gradientPeriod = ref('Last 7 Days')

const handleGradientPeriodSelect = (key: string) => {
    const option = PERIOD_OPTIONS.find(opt => opt.key === key)
    if (option) {
        gradientPeriod.value = option.label
        updateGradientData(key)
    }
}

// Gradient Line Chart
const gradientSeries = ref([
  {
    name: 'Revenue Growth',
    data: [30000, 35000, 42000, 48000, 55000, 62000, 70000]
  }
])

const gradientChartOptions = computed(() => ({
  chart: {
    type: 'area' as const,
    height: 300,
    toolbar: { show: false },
    zoom: { enabled: false },
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  colors: ['var(--primary-color)'],
  stroke: {
    curve: 'smooth' as const,
    width: 3
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.1,
      stops: [0, 90, 100]
    }
  },
  grid: {
    borderColor: '#f0f0f0',
    strokeDashArray: 0,
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } }
  },
  dataLabels: { enabled: false },
  markers: {
    size: 5,
    colors: ['var(--primary-color)'],
    strokeColors: '#fff',
    strokeWidth: 2,
    hover: { size: 7 }
  },
  xaxis: {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    labels: {
      style: {
        colors: '#999999',
        fontSize: '12px',
        fontWeight: 400
      }
    },
    axisBorder: { show: false },
    axisTicks: { show: false }
  },
  yaxis: {
    labels: {
      style: {
        colors: '#999999',
        fontSize: '12px',
        fontWeight: 400
      },
      formatter: function (value: number) {
        return '$' + (value / 1000) + 'K'
      }
    }
  },
  tooltip: {
    y: {
      formatter: function (value: number) {
        return '$' + value.toLocaleString()
      }
    }
  }
}))

const updateGradientData = (period: string) => {
  const dataMap = {
    last7days: [30000, 35000, 42000, 48000, 55000, 62000, 70000],
    last14days: Array.from({ length: 14 }, (_, i) => 30000 + (i * 3000) + Math.floor(Math.random() * 5000))
  }
  
  gradientSeries.value[0].data = dataMap[period as keyof typeof dataMap] || dataMap.last7days
}
</script>
<template>
    <n-card>
        <div class="chart-header">
            <h2 class="chart-title">Gradient Line Chart</h2>
            <n-dropdown :options="PERIOD_OPTIONS" @select="handleGradientPeriodSelect" trigger="click">
                <n-button class="period-button" type="primary" strong size="small">
                    {{ gradientPeriod }}
                    <template #icon>
                        <n-icon :component="ChevronDownOutline" />
                    </template>
                </n-button>
            </n-dropdown>
        </div>
        <div class="chart-container">
            <apexchart type="area" height="300" :options="gradientChartOptions" :series="gradientSeries" />
        </div>
    </n-card>
</template>
