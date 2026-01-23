<template>
  <div class="line-charts-page">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Line Charts</h1>
        <p class="page-subtitle">Advanced line chart visualizations with ApexCharts</p>
      </div>

      <!-- Basic Line Chart -->
      <n-grid :x-gap="18" :y-gap="18" cols="xxs:1 md:2" responsive="screen">
        <n-gi>
          <n-card>
            <div class="chart-header">
              <h2 class="chart-title">Basic Line Chart</h2>
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
              <apexchart type="line" height="300" :options="basicChartOptions" :series="basicSeries" />
            </div>
          </n-card>
        </n-gi>

        <!-- Multi Line Chart -->
        <n-gi>
          <n-card>
            <div class="chart-header">
              <h2 class="chart-title">Multi Line Chart</h2>
              <n-dropdown :options="periodOptions" @select="handleMultiPeriodSelect" trigger="click">
                <n-button class="period-button" type="primary" strong size="small">
                  {{ multiPeriod }}
                  <template #icon>
                    <n-icon :component="ChevronDownOutline" />
                  </template>
                </n-button>
              </n-dropdown>
            </div>
            <div class="chart-container">
              <apexchart type="line" height="300" :options="multiChartOptions" :series="multiSeries" />
            </div>
          </n-card>
        </n-gi>
      </n-grid>

      <!-- Gradient Line Chart -->
      <n-grid :x-gap="18" :y-gap="18" cols="xxs:1 md:2" responsive="screen">
        <n-gi>
          <n-card>
            <div class="chart-header">
              <h2 class="chart-title">Gradient Line Chart</h2>
              <n-dropdown :options="periodOptions" @select="handleGradientPeriodSelect" trigger="click">
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
        </n-gi>

        <!-- Stepped Line Chart -->
        <n-gi>
          <n-card>
            <div class="chart-header">
              <h2 class="chart-title">Stepped Line Chart</h2>
              <n-dropdown :options="periodOptions" @select="handleSteppedPeriodSelect" trigger="click">
                <n-button class="period-button" type="primary" strong size="small">
                  {{ steppedPeriod }}
                  <template #icon>
                    <n-icon :component="ChevronDownOutline" />
                  </template>
                </n-button>
              </n-dropdown>
            </div>
            <div class="chart-container">
              <apexchart type="line" height="300" :options="steppedChartOptions" :series="steppedSeries" />
            </div>
          </n-card>
        </n-gi>
      </n-grid>

      <!-- Real-time Line Chart -->
      <n-card>
        <div class="chart-header">
          <h2 class="chart-title">Real-time Line Chart</h2>
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
          <apexchart type="line" height="350" :options="realTimeChartOptions" :series="realTimeSeries" />
        </div>
      </n-card>

      <!-- Interactive Line Chart -->
      <n-card>
        <div class="chart-header">
          <h2 class="chart-title">Interactive Line Chart</h2>
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
          <apexchart type="line" height="400" :options="interactiveChartOptions" :series="interactiveSeries" />
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
  { label: 'Revenue & Profit', key: 'revenue' },
  { label: 'Sales & Orders', key: 'sales' },
  { label: 'Users & Sessions', key: 'users' },
  { label: 'Traffic & Conversion', key: 'traffic' }
]

// Period states
const basicPeriod = ref('Last 7 Days')
const multiPeriod = ref('Last 7 Days')
const gradientPeriod = ref('Last 7 Days')
const steppedPeriod = ref('Last 7 Days')
const selectedDataset = ref('Revenue & Profit')

// Real-time states
const isRealTimeActive = ref(false)
let realTimeInterval: ReturnType<typeof setInterval> | null = null

// Basic Line Chart
const basicSeries = ref([
  {
    name: 'Revenue',
    data: [30000, 35000, 32000, 40000, 38000, 45000, 42000]
  }
])

const basicChartOptions = computed(() => ({
  chart: {
    type: 'line' as const,
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

// Multi Line Chart
const multiSeries = ref([
  {
    name: 'Product A',
    data: [12000, 19000, 15000, 25000, 22000, 30000, 28000]
  },
  {
    name: 'Product B',
    data: [8000, 12000, 18000, 15000, 20000, 25000, 22000]
  },
  {
    name: 'Product C',
    data: [5000, 8000, 12000, 10000, 14000, 18000, 16000]
  }
])

const multiChartOptions = computed(() => ({
  chart: {
    type: 'line' as const,
    height: 300,
    toolbar: { show: false },
    zoom: { enabled: false },
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  colors: ['var(--primary-color)', '#22c55e', '#f59e0b'],
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
    size: 4,
    strokeColors: '#fff',
    strokeWidth: 2,
    hover: { size: 6 }
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

// Stepped Line Chart
const steppedSeries = ref([
  {
    name: 'Monthly Progress',
    data: [10000, 15000, 15000, 25000, 25000, 35000, 35000, 45000]
  }
])

const steppedChartOptions = computed(() => ({
  chart: {
    type: 'line' as const,
    height: 300,
    toolbar: { show: false },
    zoom: { enabled: false },
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  colors: ['#ef4444'],
  stroke: {
    curve: 'stepline' as const,
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
    colors: ['#ef4444'],
    strokeColors: '#fff',
    strokeWidth: 2,
    hover: { size: 7 }
  },
  xaxis: {
    categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
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

// Real-time Line Chart
const realTimeSeries = ref([
  {
    name: 'Live Data',
    data: [] as number[]
  }
])

const realTimeChartOptions = computed(() => ({
  chart: {
    type: 'line' as const,
    height: 350,
    toolbar: { show: false },
    zoom: { enabled: false },
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 1000
      }
    },
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  colors: ['#06b6d4'],
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
    size: 4,
    colors: ['#06b6d4'],
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
  yaxis: {
    min: 0,
    max: 100,
    tickAmount: 5,
    labels: {
      style: {
        colors: '#999999',
        fontSize: '12px',
        fontWeight: 400
      }
    }
  },
  tooltip: {
    x: {
      format: 'HH:mm:ss'
    },
    y: {
      formatter: function (value: number) {
        return value + '%'
      }
    }
  }
}))

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

// Period handlers
const handleBasicPeriodSelect = (key: string) => {
  const option = periodOptions.find(opt => opt.key === key)
  if (option) {
    basicPeriod.value = option.label
    updateBasicData(key)
  }
}

const handleMultiPeriodSelect = (key: string) => {
  const option = periodOptions.find(opt => opt.key === key)
  if (option) {
    multiPeriod.value = option.label
    updateMultiData(key)
  }
}

const handleGradientPeriodSelect = (key: string) => {
  const option = periodOptions.find(opt => opt.key === key)
  if (option) {
    gradientPeriod.value = option.label
    updateGradientData(key)
  }
}

const handleSteppedPeriodSelect = (key: string) => {
  const option = periodOptions.find(opt => opt.key === key)
  if (option) {
    steppedPeriod.value = option.label
    updateSteppedData(key)
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
    last7days: [30000, 35000, 32000, 40000, 38000, 45000, 42000],
    last14days: [28000, 33000, 35000, 38000, 42000, 40000, 45000, 48000, 46000, 50000, 52000, 49000, 53000, 55000],
    last30days: Array.from({ length: 30 }, () => Math.floor(Math.random() * 30000) + 25000),
    last90days: Array.from({ length: 90 }, () => Math.floor(Math.random() * 35000) + 20000)
  }
  
  basicSeries.value[0].data = dataMap[period as keyof typeof dataMap] || dataMap.last7days
}

const updateMultiData = (period: string) => {
  const dataMap = {
    last7days: [
      [12000, 19000, 15000, 25000, 22000, 30000, 28000],
      [8000, 12000, 18000, 15000, 20000, 25000, 22000],
      [5000, 8000, 12000, 10000, 14000, 18000, 16000]
    ],
    last14days: [
      Array.from({ length: 14 }, () => Math.floor(Math.random() * 20000) + 10000),
      Array.from({ length: 14 }, () => Math.floor(Math.random() * 15000) + 5000),
      Array.from({ length: 14 }, () => Math.floor(Math.random() * 10000) + 3000)
    ]
  }
  
  const data = dataMap[period as keyof typeof dataMap] || dataMap.last7days
  multiSeries.value[0].data = data[0]
  multiSeries.value[1].data = data[1]
  multiSeries.value[2].data = data[2]
}

const updateGradientData = (period: string) => {
  const dataMap = {
    last7days: [30000, 35000, 42000, 48000, 55000, 62000, 70000],
    last14days: Array.from({ length: 14 }, (_, i) => 30000 + (i * 3000) + Math.floor(Math.random() * 5000))
  }
  
  gradientSeries.value[0].data = dataMap[period as keyof typeof dataMap] || dataMap.last7days
}

const updateSteppedData = (period: string) => {
  const dataMap = {
    last7days: [10000, 15000, 15000, 25000, 25000, 35000, 35000],
    last14days: [10000, 15000, 15000, 25000, 25000, 35000, 35000, 45000, 45000, 55000, 55000, 65000, 65000, 75000]
  }
  
  steppedSeries.value[0].data = dataMap[period as keyof typeof dataMap] || dataMap.last7days
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
  realTimeSeries.value[0].data = []
  realTimeChartOptions.value.xaxis.categories = []
}

const updateRealTimeChart = () => {
  const now = new Date()
  const timeLabel = now.toLocaleTimeString()
  const newValue = Math.floor(Math.random() * 100)
  
  const chart = realTimeSeries.value[0]
  chart.data.push(newValue)
  
  const categories = realTimeChartOptions.value.xaxis.categories as string[]
  categories.push(timeLabel)
  
  // Keep only last 20 data points
  if (chart.data.length > 20) {
    chart.data.shift()
    categories.shift()
  }
}

onMounted(() => {
  // Initialize with some real-time data
  for (let i = 0; i < 10; i++) {
    updateRealTimeChart()
  }
})

onUnmounted(() => {
  if (realTimeInterval) {
    clearInterval(realTimeInterval)
  }
})
</script>

<style scoped>
.line-charts-page {
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