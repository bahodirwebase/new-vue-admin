<script lang="ts" setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { NCard, NButton, NSpace, NDropdown, NIcon } from 'naive-ui';
import { ChevronDownOutline } from '@vicons/ionicons5';
import { DATASET_OPTIONS } from '../constants';

import VueApexCharts from 'vue3-apexcharts'
const apexchart = VueApexCharts

// Real-time states
const realtimePeriod = ref('Revenue & Sales')
const isRealtimeRunning = ref(false)
let realtimeInterval: ReturnType<typeof setInterval> | null = null

const handleRealtimeDatasetSelect = (key: string) => {
  const option = DATASET_OPTIONS.find(opt => opt.key === key)
  if (option) {
    realtimePeriod.value = option.label
  }
}

// Real-time Mixed Chart
const realtimeMixedSeries = computed(() => {
  const datasets = {
    revenue: [
      {
        name: 'Revenue',
        type: 'column',
        data: [] as number[]
      },
      {
        name: 'Sales',
        type: 'line',
        data: [] as number[]
      }
    ],
    users: [
      {
        name: 'Active Users',
        type: 'area',
        data: [] as number[]
      },
      {
        name: 'Sessions',
        type: 'column',
        data: [] as number[]
      }
    ],
    traffic: [
      {
        name: 'Page Views',
        type: 'line',
        data: [] as number[]
      },
      {
        name: 'Conversion Rate',
        type: 'area',
        data: [] as number[]
      }
    ],
    performance: [
      {
        name: 'Performance Score',
        type: 'line',
        data: [] as number[]
      },
      {
        name: 'Quality Index',
        type: 'column',
        data: [] as number[]
      }
    ]
  }

  const key = realtimePeriod.value.toLowerCase().replace(' & ', '').replace(' ', '')
  return datasets[key as keyof typeof datasets] || datasets.revenue
})

const realtimeMixedOptions = computed(() => ({
  chart: {
    type: 'line' as const,
    height: 350,
    toolbar: { show: false },
    animations: {
      enabled: true,
      easing: 'linear' as const,
      dynamicAnimation: {
        speed: 1000
      }
    },
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  colors: ['var(--primary-color)', '#22c55e'],
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
  plotOptions: {
    bar: {
      borderRadius: 8,
      columnWidth: '60%'
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
    colors: ['var(--primary-color)', '#22c55e'],
    strokeColors: '#fff',
    strokeWidth: 2
  },
  xaxis: {
    categories: [] as string[],
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
  yaxis: [
    {
      title: {
        text: realtimePeriod.value.includes('Revenue') ? 'Revenue ($)' : 'Count',
        style: {
          color: '#999999',
          fontSize: '12px'
        }
      },
      labels: {
        style: {
          colors: '#999999',
          fontSize: '12px',
          fontWeight: 400
        },
        formatter: function (value: number) {
          if (realtimePeriod.value.includes('Revenue')) {
            return '$' + (value / 1000) + 'K'
          }
          return value.toLocaleString()
        }
      }
    },
    {
      opposite: true,
      title: {
        text: realtimePeriod.value.includes('Rate') ? 'Rate (%)' : 'Value',
        style: {
          color: '#999999',
          fontSize: '12px'
        }
      },
      labels: {
        style: {
          colors: '#999999',
          fontSize: '12px',
          fontWeight: 400
        },
        formatter: function (value: number) {
          if (realtimePeriod.value.includes('Rate') || realtimePeriod.value.includes('Conversion')) {
            return value + '%'
          }
          return value.toLocaleString()
        }
      }
    }
  ],
  tooltip: {
    y: {
      formatter: function (value: number, opts: any) {
        if (opts.seriesIndex === 0 && realtimePeriod.value.includes('Revenue')) {
          return '$' + value.toLocaleString()
        }
        if (opts.seriesIndex === 1 && (realtimePeriod.value.includes('Rate') || realtimePeriod.value.includes('Conversion'))) {
          return value + '%'
        }
        return value.toLocaleString()
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

// Real-time functions
const toggleRealtime = () => {
  isRealtimeRunning.value = !isRealtimeRunning.value
  
  if (isRealtimeRunning.value) {
    realtimeInterval = setInterval(updateRealtimeChart, 1000)
  } else {
    if (realtimeInterval) {
      clearInterval(realtimeInterval)
      realtimeInterval = null
    }
  }
}

const updateRealtimeChart = () => {
  const now = new Date()
  const timeLabel = now.toLocaleTimeString()
  
  const series1 = realtimeMixedSeries.value[0]
  const series2 = realtimeMixedSeries.value[1]
  
  series1.data.push(Math.floor(Math.random() * 100) + 50)
  series2.data.push(Math.floor(Math.random() * 100) + 30)
  
  const categories = realtimeMixedOptions.value.xaxis.categories as string[]
  categories.push(timeLabel)
  
  // Keep only last 20 data points
  if (series1.data.length > 20) {
    series1.data.shift()
    series2.data.shift()
    categories.shift()
  }
}

onMounted(() => {
  // Initialize with some real-time data
  for (let i = 0; i < 10; i++) {
    updateRealtimeChart()
  }
})

onUnmounted(() => {
  if (realtimeInterval) {
    clearInterval(realtimeInterval)
  }
})
</script>
<template>
    <n-card>
        <div class="chart-header">
            <h2 class="chart-title">Real-time Mixed Chart</h2>
            <n-space>
                <n-button @click="toggleRealtime" :type="isRealtimeRunning ? 'error' : 'success'" strong size="small">
                    {{ isRealtimeRunning ? 'Stop' : 'Start' }} Real-time
                </n-button>
                <n-dropdown :options="DATASET_OPTIONS" @select="handleRealtimeDatasetSelect" trigger="click">
                    <n-button class="period-button" type="primary" strong size="small">
                        {{ realtimePeriod }}
                        <template #icon>
                            <n-icon :component="ChevronDownOutline" />
                        </template>
                    </n-button>
                </n-dropdown>
            </n-space>
        </div>
        <div class="chart-container">
            <apexchart type="line" height="350" :options="realtimeMixedOptions" :series="realtimeMixedSeries" />
        </div>
    </n-card>
</template>
