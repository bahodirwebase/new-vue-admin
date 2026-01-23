<template>
  <div class="pie-charts-page">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Pie Charts</h1>
        <p class="page-subtitle">Advanced pie chart visualizations with ApexCharts</p>
      </div>

      <!-- Basic Pie Chart -->
      <n-grid :x-gap="18" :y-gap="18" cols="xxs:1 md:2" responsive="screen">
        <n-gi>
          <n-card>
            <div class="chart-header">
              <h2 class="chart-title">Basic Pie Chart</h2>
              <n-dropdown :options="periodOptions" @select="handleBasicPeriodSelect" trigger="click">
                <n-button class="period-button" type="primary" strong size="small">
                  {{ basicPeriod }}
                  <template #icon>
                    <n-icon :component="ChevronDownOutline" />
                  </template>
                </n-button>
              </n-dropdown>
            </div>
            <div class="chart-container">
              <apexchart type="pie" height="300" :options="basicChartOptions" :series="basicSeries" />
            </div>
          </n-card>
        </n-gi>

        <!-- Donut Chart -->
        <n-gi>
          <n-card>
            <div class="chart-header">
              <h2 class="chart-title">Donut Chart</h2>
              <n-dropdown :options="periodOptions" @select="handleDonutPeriodSelect" trigger="click">
                <n-button class="period-button" type="primary" strong size="small">
                  {{ donutPeriod }}
                  <template #icon>
                    <n-icon :component="ChevronDownOutline" />
                  </template>
                </n-button>
              </n-dropdown>
            </div>
            <div class="chart-container">
              <apexchart type="donut" height="300" :options="donutChartOptions" :series="donutSeries" />
            </div>
          </n-card>
        </n-gi>
      </n-grid>

      <!-- 3D Pie Chart -->
      <n-grid :x-gap="18" :y-gap="18" cols="xxs:1 md:2" responsive="screen">
        <n-gi>
          <n-card>
            <div class="chart-header">
              <h2 class="chart-title">3D Pie Chart</h2>
              <n-dropdown :options="periodOptions" @select="handle3DPeriodSelect" trigger="click">
                <n-button class="period-button" type="primary" strong size="small">
                  {{ pie3DPeriod }}
                  <template #icon>
                    <n-icon :component="ChevronDownOutline" />
                  </template>
                </n-button>
              </n-dropdown>
            </div>
            <div class="chart-container">
              <apexchart type="pie" height="300" :options="pie3DChartOptions" :series="pie3DSeries" />
            </div>
          </n-card>
        </n-gi>

        <!-- Semi Circle Donut -->
        <n-gi>
          <n-card>
            <div class="chart-header">
              <h2 class="chart-title">Semi Circle Donut</h2>
              <n-dropdown :options="periodOptions" @select="handleSemiCirclePeriodSelect" trigger="click">
                <n-button class="period-button" type="primary" strong size="small">
                  {{ semiCirclePeriod }}
                  <template #icon>
                    <n-icon :component="ChevronDownOutline" />
                  </template>
                </n-button>
              </n-dropdown>
            </div>
            <div class="chart-container">
              <apexchart type="donut" height="300" :options="semiCircleChartOptions" :series="semiCircleSeries" />
            </div>
          </n-card>
        </n-gi>
      </n-grid>

      <!-- Interactive Pie Chart -->
      <n-card>
        <div class="chart-header">
          <h2 class="chart-title">Interactive Pie Chart</h2>
          <n-dropdown :options="datasetOptions" @select="handleDatasetSelect" trigger="click">
            <n-button class="period-button" type="primary" strong size="small">
              {{ selectedDataset }}
              <template #icon>
                <n-icon :component="ChevronDownOutline" />
              </template>
            </n-button>
          </n-dropdown>
        </div>
        <div class="chart-container">
          <apexchart type="pie" height="400" :options="interactiveChartOptions" :series="interactiveSeries" />
        </div>
      </n-card>

      <!-- Real-time Pie Chart -->
      <n-card>
        <div class="chart-header">
          <h2 class="chart-title">Real-time Pie Chart</h2>
          <n-space>
            <n-button @click="toggleRealTime" :type="isRealTimeActive ? 'error' : 'success'" strong size="small">
              {{ isRealTimeActive ? 'Stop' : 'Start' }} Real-time
            </n-button>
            <n-button @click="clearRealTimeData" type="warning" strong size="small">
              Clear Data
            </n-button>
          </n-space>
        </div>
        <div class="chart-container">
          <apexchart type="donut" height="350" :options="realTimeChartOptions" :series="realTimeSeries" />
        </div>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { NCard, NButton, NDropdown, NIcon, NSpace, NGrid, NGi } from 'naive-ui'
import { ChevronDownOutline } from '@vicons/ionicons5'
import VueApexCharts from 'vue3-apexcharts'

const apexchart = VueApexCharts

// Period options
const periodOptions = [
  { label: 'Last 7 Days', key: 'last7days' },
  { label: 'Last 14 Days', key: 'last14days' },
  { label: 'Last 30 Days', key: 'last30days' },
  { label: 'Last 90 Days', key: 'last90days' }
]

const datasetOptions = [
  { label: 'Sales Distribution', key: 'sales' },
  { label: 'Revenue Sources', key: 'revenue' },
  { label: 'Market Share', key: 'market' },
  { label: 'User Demographics', key: 'users' }
]

// Period states
const basicPeriod = ref('Last 7 Days')
const donutPeriod = ref('Last 7 Days')
const pie3DPeriod = ref('Last 7 Days')
const semiCirclePeriod = ref('Last 7 Days')
const selectedDataset = ref('Sales Distribution')

// Real-time states
const isRealTimeActive = ref(false)
let realTimeInterval: ReturnType<typeof setInterval> | null = null

// Basic Pie Chart
const basicSeries = ref([40, 50, 40, 5, 25])

const basicChartOptions = computed(() => ({
  chart: {
    type: 'pie' as const,
    height: 300,
    toolbar: { show: false },
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  colors: ['var(--primary-color)', '#22c55e', '#f59e0b', '#ef4444', '#06b6d4'],
  labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
  legend: {
    show: true,
    position: 'bottom' as const,
    horizontalAlign: 'center' as const,
    labels: {
      colors: '#666666',
      useSeriesColors: false
    }
  },
  dataLabels: {
    enabled: true,
    formatter: function (val: number) {
      return val + '%'
    },
    style: {
      fontSize: '13px',
      fontWeight: 600
    }
  },
  tooltip: {
    y: {
      formatter: function (value: number) {
        return value + '%'
      }
    }
  }
}))

// Donut Chart
const donutSeries = ref([30, 25, 20, 15, 10])

const donutChartOptions = computed(() => ({
  chart: {
    type: 'donut' as const,
    height: 300,
    toolbar: { show: false },
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  colors: ['#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308'],
  labels: ['Desktop', 'Mobile', 'Tablet', 'Smart TV', 'Other'],
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
        labels: {
          show: true,
          total: {
            show: true,
            label: 'Total',
            formatter: function () {
              return '100%'
            }
          }
        }
      }
    }
  },
  legend: {
    show: true,
    position: 'bottom' as const,
    horizontalAlign: 'center' as const,
    labels: {
      colors: '#666666',
      useSeriesColors: false
    }
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    y: {
      formatter: function (value: number) {
        return value + '%'
      }
    }
  }
}))

// 3D Pie Chart
const pie3DSeries = ref([35, 25, 20, 12, 8])

const pie3DChartOptions = computed(() => ({
  chart: {
    type: 'pie' as const,
    height: 300,
    toolbar: { show: false },
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  colors: ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
  labels: ['North America', 'Europe', 'Asia', 'South America', 'Africa'],
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 270,
      expandOnClick: false,
      offsetX: 10,
      offsetY: 10
    }
  },
  legend: {
    show: true,
    position: 'bottom' as const,
    horizontalAlign: 'center' as const,
    labels: {
      colors: '#666666',
      useSeriesColors: false
    }
  },
  dataLabels: {
    enabled: true,
    formatter: function (val: number) {
      return val + '%'
    },
    style: {
      fontSize: '13px',
      fontWeight: 600
    }
  },
  tooltip: {
    y: {
      formatter: function (value: number) {
        return value + '%'
      }
    }
  }
}))

// Semi Circle Donut
const semiCircleSeries = ref([65, 35])

const semiCircleChartOptions = computed(() => ({
  chart: {
    type: 'donut' as const,
    height: 300,
    toolbar: { show: false },
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  colors: ['var(--primary-color)', '#e5e7eb'],
  labels: ['Completed', 'Remaining'],
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 90,
      donut: {
        size: '70%',
        labels: {
          show: true,
          total: {
            show: true,
            label: 'Progress',
            formatter: function () {
              return '65%'
            }
          }
        }
      }
    }
  },
  legend: {
    show: true,
    position: 'bottom' as const,
    horizontalAlign: 'center' as const,
    labels: {
      colors: '#666666',
      useSeriesColors: false
    }
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    y: {
      formatter: function (value: number) {
        return value + '%'
      }
    }
  }
}))

// Interactive Pie Chart
const interactiveSeries = computed(() => {
  const datasets = {
    sales: [45, 25, 15, 10, 5],
    revenue: [35, 30, 20, 10, 5],
    market: [40, 25, 20, 10, 5],
    users: [30, 25, 20, 15, 10]
  }

  const key = selectedDataset.value.toLowerCase().replace(' ', '')
  return datasets[key as keyof typeof datasets] || datasets.sales
})

const interactiveChartOptions = computed(() => ({
  chart: {
    type: 'pie' as const,
    height: 400,
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: true,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: true
      }
    },
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  colors: ['var(--primary-color)', '#22c55e', '#f59e0b', '#ef4444', '#06b6d4'],
  labels: computed(() => {
    const labelSets = {
      sales: ['Online Sales', 'Retail Sales', 'Wholesale', 'International', 'Other'],
      revenue: ['Product Sales', 'Services', 'Subscriptions', 'Licensing', 'Other'],
      market: ['Company A', 'Company B', 'Company C', 'Company D', 'Others'],
      users: ['18-24', '25-34', '35-44', '45-54', '55+']
    }

    const key = selectedDataset.value.toLowerCase().replace(' ', '')
    return labelSets[key as keyof typeof labelSets] || labelSets.sales
  }).value,
  plotOptions: {
    pie: {
      expandOnClick: true,
      dataLabels: {
        offset: -10
      }
    }
  },
  legend: {
    show: true,
    position: 'bottom' as const,
    horizontalAlign: 'center' as const,
    labels: {
      colors: '#666666',
      useSeriesColors: false
    }
  },
  dataLabels: {
    enabled: true,
    formatter: function (val: number) {
      return val + '%'
    },
    style: {
      fontSize: '13px',
      fontWeight: 600
    }
  },
  tooltip: {
    y: {
      formatter: function (value: number) {
        return value + '%'
      }
    }
  }
}))

// Real-time Pie Chart
const realTimeSeries = ref([25, 25, 25, 25])

const realTimeChartOptions = computed(() => ({
  chart: {
    type: 'donut' as const,
    height: 350,
    toolbar: { show: false },
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 1000
      }
    },
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  colors: ['#06b6d4', '#22c55e', '#f59e0b', '#ef4444'],
  labels: ['Server 1', 'Server 2', 'Server 3', 'Server 4'],
  plotOptions: {
    pie: {
      donut: {
        size: '60%'
      }
    }
  },
  legend: {
    show: true,
    position: 'bottom' as const,
    horizontalAlign: 'center' as const,
    labels: {
      colors: '#666666',
      useSeriesColors: false
    }
  },
  dataLabels: {
    enabled: true,
    formatter: function (val: number) {
      return val + '%'
    },
    style: {
      fontSize: '13px',
      fontWeight: 600
    }
  },
  tooltip: {
    y: {
      formatter: function (value: number) {
        return value + '%'
      }
    }
  }
}))

// Period handlers
const handleBasicPeriodSelect = (key: string) => {
  const option = periodOptions.find(opt => opt.key === key)
  if (option) {
    basicPeriod.value = option.label
    updateBasicData(key)
  }
}

const handleDonutPeriodSelect = (key: string) => {
  const option = periodOptions.find(opt => opt.key === key)
  if (option) {
    donutPeriod.value = option.label
    updateDonutData(key)
  }
}

const handle3DPeriodSelect = (key: string) => {
  const option = periodOptions.find(opt => opt.key === key)
  if (option) {
    pie3DPeriod.value = option.label
    update3DData(key)
  }
}

const handleSemiCirclePeriodSelect = (key: string) => {
  const option = periodOptions.find(opt => opt.key === key)
  if (option) {
    semiCirclePeriod.value = option.label
    updateSemiCircleData(key)
  }
}

const handleDatasetSelect = (key: string) => {
  const option = datasetOptions.find(opt => opt.key === key)
  if (option) {
    selectedDataset.value = option.label
  }
}

// Data update functions
const updateBasicData = (period: string) => {
  const dataMap = {
    last7days: [44, 55, 41, 17, 15],
    last14days: [38, 42, 35, 25, 20],
    last30days: [32, 28, 22, 10, 8],
    last90days: [30, 25, 20, 15, 10]
  }
  
  basicSeries.value = dataMap[period as keyof typeof dataMap] || dataMap.last7days
}

const updateDonutData = (period: string) => {
  const dataMap = {
    last7days: [30, 25, 20, 15, 10],
    last14days: [35, 22, 18, 15, 10],
    last30days: [40, 20, 15, 15, 10],
    last90days: [45, 18, 12, 15, 10]
  }
  
  donutSeries.value = dataMap[period as keyof typeof dataMap] || dataMap.last7days
}

const update3DData = (period: string) => {
  const dataMap = {
    last7days: [35, 25, 20, 12, 8],
    last14days: [40, 22, 18, 12, 8],
    last30days: [45, 20, 15, 12, 8],
    last90days: [50, 18, 12, 12, 8]
  }
  
  pie3DSeries.value = dataMap[period as keyof typeof dataMap] || dataMap.last7days
}

const updateSemiCircleData = (period: string) => {
  const dataMap = {
    last7days: [65, 35],
    last14days: [70, 30],
    last30days: [75, 25],
    last90days: [80, 20]
  }
  
  semiCircleSeries.value = dataMap[period as keyof typeof dataMap] || dataMap.last7days
}

// Real-time functions
const toggleRealTime = () => {
  isRealTimeActive.value = !isRealTimeActive.value
  
  if (isRealTimeActive.value) {
    realTimeInterval = setInterval(updateRealTimeChart, 1000)
  } else {
    if (realTimeInterval) {
      clearInterval(realTimeInterval)
      realTimeInterval = null
    }
  }
}

const clearRealTimeData = () => {
  realTimeSeries.value = [25, 25, 25, 25]
}

const updateRealTimeChart = () => {
  // Generate random percentages that sum to 100
  const values = [
    Math.floor(Math.random() * 40) + 10,
    Math.floor(Math.random() * 30) + 10,
    Math.floor(Math.random() * 20) + 10,
    Math.floor(Math.random() * 20) + 10
  ]
  
  const total = values.reduce((sum, val) => sum + val, 0)
  const percentages = values.map(val => Math.round((val / total) * 100))
  
  // Adjust to ensure sum is 100
  const diff = 100 - percentages.reduce((sum, val) => sum + val, 0)
  percentages[0] += diff
  
  realTimeSeries.value = percentages
}

onMounted(() => {
  // Initialize with some real-time data
  updateRealTimeChart()
})

onUnmounted(() => {
  if (realTimeInterval) {
    clearInterval(realTimeInterval)
  }
})
</script>

<style scoped>
.pie-charts-page {
  max-width: 100%;
}

.page-title {
  font-family: var(--font-secondary);
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.chart-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

.period-button {
  border-radius: 8px;
  height: 36px;
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

.chart-container {
  margin: 0 -8px;
}

:deep(.n-card) {
  height: 100% !important;
  border: 1px solid var(--border-color);
}

/* ApexCharts customization */
:deep(.apexcharts-tooltip) {
  border-radius: 8px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}

:deep(.apexcharts-legend-text) {
  font-size: 13px !important;
  font-weight: 500 !important;
}

:deep(.apexcharts-pie-label) {
  font-weight: 600 !important;
}

/* Responsive */
@media (max-width: 768px) {
  .chart-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .chart-title {
    font-size: 18px;
  }

  .period-button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 24px;
  }

  .page-subtitle {
    font-size: 14px;
  }
}
</style>