<script lang="ts" setup>
import { computed, ref } from 'vue';
import { DATASET_OPTIONS } from '../constants';
import { ChevronDownOutline } from '@vicons/ionicons5';

import VueApexCharts from 'vue3-apexcharts'
const apexchart = VueApexCharts

// Period states
const selectedDataset = ref('Revenue & Profit')

const handleDatasetSelect = (key: string) => {
  const option = DATASET_OPTIONS.find(opt => opt.key === key)
  if (option) {
    selectedDataset.value = option.label
  }
}

// Interactive Line Chart
const interactiveSeries = computed(() => {
  const datasets = {
    revenue: [
      {
        name: 'Revenue',
        data: [45000, 52000, 48000, 61000, 58000, 67000, 72000, 68000, 75000]
      },
      {
        name: 'Profit',
        data: [12000, 15000, 13000, 18000, 16000, 22000, 25000, 21000, 28000]
      }
    ],
    sales: [
      {
        name: 'Sales',
        data: [120, 135, 125, 155, 145, 175, 185, 170, 195]
      },
      {
        name: 'Orders',
        data: [80, 95, 85, 115, 105, 135, 145, 130, 155]
      }
    ],
    users: [
      {
        name: 'Active Users',
        data: [2500, 2800, 2600, 3200, 3000, 3600, 3900, 3500, 4200]
      },
      {
        name: 'Sessions',
        data: [4500, 5200, 4800, 6100, 5800, 6700, 7200, 6800, 7500]
      }
    ],
    traffic: [
      {
        name: 'Page Views',
        data: [12000, 14500, 13000, 16500, 15500, 18500, 20000, 18000, 22000]
      },
      {
        name: 'Conversion Rate',
        data: [2.5, 3.2, 2.8, 3.8, 3.5, 4.2, 4.5, 4.0, 4.8]
      }
    ]
  }

  const key = selectedDataset.value.toLowerCase().replace(' & ', '').replace(' ', '')
  return datasets[key as keyof typeof datasets] || datasets.revenue
})

const interactiveChartOptions = computed(() => ({
  chart: {
    type: 'line' as const,
    height: 400,
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true
      }
    },
    zoom: {
      enabled: true,
      type: 'x' as const,
      autoScaleYaxis: true
    },
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  colors: ['var(--primary-color)', '#22c55e'],
  stroke: {
    curve: 'smooth' as const,
    width: 3
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
    colors: ['var(--primary-color)', '#22c55e'],
    strokeColors: '#fff',
    strokeWidth: 2,
    hover: { size: 7 }
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
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
      }
    }
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (value: number) {
        if (selectedDataset.value.includes('Conversion')) {
          return value + '%'
        }
        if (selectedDataset.value.includes('Sales') || selectedDataset.value.includes('Orders')) {
          return value.toLocaleString()
        }
        if (selectedDataset.value.includes('Users') || selectedDataset.value.includes('Sessions')) {
          return value.toLocaleString()
        }
        return '$' + value.toLocaleString()
      }
    }
  },
  legend: {
    show: true,
    position: 'top' as const,
    horizontalAlign: 'center' as const,
    labels: {
      colors: '#666666',
      useSeriesColors: false
    }
  }
}))
</script>
<template>
    <n-card>
        <div class="chart-header">
            <h2 class="chart-title">Interactive Line Chart</h2>
            <n-dropdown :options="DATASET_OPTIONS" @select="handleDatasetSelect" trigger="click">
                <n-button class="period-button" type="primary" strong size="small">
                    {{ selectedDataset }}
                    <template #icon>
                        <n-icon :component="ChevronDownOutline" />
                    </template>
                </n-button>
            </n-dropdown>
        </div>
        <div class="chart-container">
            <apexchart type="line" height="400" :options="interactiveChartOptions" :series="interactiveSeries" />
        </div>
    </n-card>
</template>
