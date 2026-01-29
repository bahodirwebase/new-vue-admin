<template>
  <div class="mixed-charts-page">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Mixed Charts</h1>
        <p class="page-subtitle">Advanced mixed chart visualizations with ApexCharts</p>
      </div>

      <!-- Basic Mixed Chart -->
      <n-card title="Basic Mixed Chart" class="chart-card">
        <template #header-extra>
          <n-dropdown trigger="click" :options="periodOptions" @select="handlePeriodSelect('basic', $event)">
            <n-button text>
              {{ selectedPeriod.basic }}
              <n-icon :component="ChevronDownOutline" />
            </n-button>
          </n-dropdown>
        </template>
        <VueApexCharts type="line" height="350" :options="basicMixedOptions" :series="basicMixedSeries" />
      </n-card>

      <!-- Bar + Line Chart -->
      <n-grid :cols="2" :x-gap="18" responsive="screen">
        <n-gi>
          <n-card title="Bar + Line Combination" class="chart-card">
            <template #header-extra>
              <n-dropdown trigger="click" :options="periodOptions" @select="handlePeriodSelect('barLine', $event)">
                <n-button text>
                  {{ selectedPeriod.barLine }}
                  <n-icon :component="ChevronDownOutline" />
                </n-button>
              </n-dropdown>
            </template>
            <VueApexCharts type="line" height="300" :options="barLineOptions" :series="barLineSeries" />
          </n-card>
        </n-gi>

        <n-gi>
          <n-card title="Area + Column Chart" class="chart-card">
            <template #header-extra>
              <n-dropdown trigger="click" :options="periodOptions" @select="handlePeriodSelect('areaColumn', $event)">
                <n-button text>
                  {{ selectedPeriod.areaColumn }}
                  <n-icon :component="ChevronDownOutline" />
                </n-button>
              </n-dropdown>
            </template>
            <VueApexCharts type="line" height="300" :options="areaColumnOptions" :series="areaColumnSeries" />
          </n-card>
        </n-gi>
      </n-grid>

      <!-- Multiple Y-Axes -->
      <n-card title="Multiple Y-Axes Chart" class="chart-card">
        <template #header-extra>
          <n-dropdown trigger="click" :options="periodOptions" @select="handlePeriodSelect('multiY', $event)">
            <n-button text>
              {{ selectedPeriod.multiY }}
              <n-icon :component="ChevronDownOutline" />
            </n-button>
          </n-dropdown>
        </template>
        <VueApexCharts type="line" height="350" :options="multiYOptions" :series="multiYSeries" />
      </n-card>

      <!-- Real-time Mixed Chart -->
      <n-card title="Real-time Mixed Chart" class="chart-card">
        <template #header-extra>
          <n-space>
            <n-button @click="toggleRealtime" :type="isRealtimeRunning ? 'error' : 'primary'">
              {{ isRealtimeRunning ? 'Stop' : 'Start' }}
            </n-button>
            <n-dropdown trigger="click" :options="datasetOptions" @select="handleDatasetSelect('realtime', $event)">
              <n-button text>
                {{ selectedDataset.realtime }}
                <n-icon :component="ChevronDownOutline" />
              </n-button>
            </n-dropdown>
          </n-space>
        </template>
        <VueApexCharts type="line" height="350" :options="realtimeMixedOptions" :series="realtimeMixedSeries" />
      </n-card>

      <!-- Custom Mixed Chart -->
      <n-grid :cols="2" :x-gap="18" responsive="screen">
        <n-gi>
          <n-card title="Candlestick + Volume" class="chart-card">
            <template #header-extra>
              <n-dropdown trigger="click" :options="periodOptions" @select="handlePeriodSelect('candlestick', $event)">
                <n-button text>
                  {{ selectedPeriod.candlestick }}
                  <n-icon :component="ChevronDownOutline" />
                </n-button>
              </n-dropdown>
            </template>
            <VueApexCharts type="candlestick" height="300" :options="candlestickOptions" :series="candlestickSeries" />
          </n-card>
        </n-gi>

        <n-gi>
          <n-card title="Scatter + Line" class="chart-card">
            <template #header-extra>
              <n-dropdown trigger="click" :options="periodOptions" @select="handlePeriodSelect('scatterLine', $event)">
                <n-button text>
                  {{ selectedPeriod.scatterLine }}
                  <n-icon :component="ChevronDownOutline" />
                </n-button>
              </n-dropdown>
            </template>
            <VueApexCharts type="line" height="300" :options="scatterLineOptions" :series="scatterLineSeries" />
          </n-card>
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { NCard, NButton, NDropdown, NIcon, NSpace, NGrid, NGi } from 'naive-ui'
import { ChevronDownOutline } from '@vicons/ionicons5'
import VueApexCharts from 'vue3-apexcharts'

// Period options
const periodOptions = [
  { label: 'Last 7 days', key: '7d' },
  { label: 'Last 30 days', key: '30d' },
  { label: 'Last 3 months', key: '3m' },
  { label: 'Last year', key: '1y' }
]

// Dataset options
const datasetOptions = [
  { label: 'Sales & Revenue', key: 'sales' },
  { label: 'Users & Sessions', key: 'users' },
  { label: 'Performance Metrics', key: 'performance' },
  { label: 'Custom Dataset', key: 'custom' }
]

// Reactive state
const selectedPeriod = ref({
  basic: 'Last 7 days',
  barLine: 'Last 7 days',
  areaColumn: 'Last 7 days',
  multiY: 'Last 7 days',
  realtime: 'Last 7 days',
  candlestick: 'Last 7 days',
  scatterLine: 'Last 7 days'
})

const selectedDataset = ref({
  realtime: 'Sales & Revenue'
})

const isRealtimeRunning = ref(false)
let realtimeInterval: NodeJS.Timeout | null = null

// Data generation functions
const generateBasicMixedData = (period: string) => {
  const periods = {
    '7d': 7,
    '30d': 30,
    '3m': 90,
    '1y': 365
  }
  const days = periods[period as keyof typeof periods] || 7
  
  return {
    categories: Array.from({ length: days }, (_, i) => `Day ${i + 1}`),
    barData: Array.from({ length: days }, () => Math.floor(Math.random() * 100) + 20),
    lineData: Array.from({ length: days }, () => Math.floor(Math.random() * 80) + 40)
  }
}

const generateBarLineData = (period: string) => {
  const periods = { '7d': 7, '30d': 30, '3m': 12, '1y': 12 }
  const points = periods[period as keyof typeof periods] || 7
  
  return {
    categories: Array.from({ length: points }, (_, i) => {
      if (period === '1y') return `Month ${i + 1}`
      if (period === '3m') return `Week ${i + 1}`
      return `Day ${i + 1}`
    }),
    barData: Array.from({ length: points }, () => Math.floor(Math.random() * 1000) + 500),
    lineData: Array.from({ length: points }, () => Math.floor(Math.random() * 100) + 50)
  }
}

const generateAreaColumnData = (period: string) => {
  const periods = { '7d': 7, '30d': 30, '3m': 12, '1y': 12 }
  const points = periods[period as keyof typeof periods] || 7
  
  return {
    categories: Array.from({ length: points }, (_, i) => {
      if (period === '1y') return `Month ${i + 1}`
      if (period === '3m') return `Week ${i + 1}`
      return `Day ${i + 1}`
    }),
    areaData: Array.from({ length: points }, () => Math.floor(Math.random() * 80) + 20),
    columnData: Array.from({ length: points }, () => Math.floor(Math.random() * 60) + 30)
  }
}

const generateMultiYData = (period: string) => {
  const periods = { '7d': 7, '30d': 30, '3m': 12, '1y': 12 }
  const points = periods[period as keyof typeof periods] || 7
  
  return {
    categories: Array.from({ length: points }, (_, i) => {
      if (period === '1y') return `Month ${i + 1}`
      if (period === '3m') return `Week ${i + 1}`
      return `Day ${i + 1}`
    }),
    temperature: Array.from({ length: points }, () => Math.floor(Math.random() * 15) + 20),
    rainfall: Array.from({ length: points }, () => Math.floor(Math.random() * 100) + 20),
    humidity: Array.from({ length: points }, () => Math.floor(Math.random() * 40) + 40)
  }
}

const generateCandlestickData = (period: string) => {
  const periods = { '7d': 7, '30d': 30, '3m': 12, '1y': 12 }
  const points = periods[period as keyof typeof periods] || 7
  
  return {
    candlestickData: Array.from({ length: points }, () => {
      const open = Math.floor(Math.random() * 100) + 100
      const high = open + Math.floor(Math.random() * 20) + 5
      const low = open - Math.floor(Math.random() * 20) - 5
      const close = low + Math.floor(Math.random() * (high - low))
      return { x: `Day ${points}`, y: [open, high, low, close] }
    }),
    volumeData: Array.from({ length: points }, () => Math.floor(Math.random() * 1000000) + 500000)
  }
}

const generateScatterLineData = (period: string) => {
  const periods = { '7d': 7, '30d': 30, '3m': 12, '1y': 12 }
  const points = periods[period as keyof typeof periods] || 7
  
  return {
    categories: Array.from({ length: points }, (_, i) => {
      if (period === '1y') return `Month ${i + 1}`
      if (period === '3m') return `Week ${i + 1}`
      return `Day ${i + 1}`
    }),
    scatterData: Array.from({ length: points }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100
    })),
    lineData: Array.from({ length: points }, () => Math.floor(Math.random() * 80) + 20)
  }
}

// Chart options and series
const basicMixedData = ref(generateBasicMixedData('7d'))

const basicMixedOptions = computed(() => ({
  chart: {
    type: 'line' as const,
    height: 350,
    toolbar: { show: false },
    background: 'transparent'
  },
  stroke: {
    width: [0, 4],
    curve: 'smooth' as const
  },
  plotOptions: {
    bar: {
      columnWidth: '50%',
      borderRadius: 4
    }
  },
  fill: {
    opacity: [0.85, 1],
    gradient: {
      inverseColors: false,
      shade: 'light',
      type: 'vertical',
      shadeIntensity: 0.25,
      gradientToColors: undefined,
      opacityFrom: 0.85,
      opacityTo: 0.55
    }
  },
  labels: basicMixedData.value.categories,
  markers: {
    size: 6
  },
  xaxis: {
    categories: basicMixedData.value.categories
  },
  yaxis: [
    {
      title: {
        text: 'Bar Chart'
      }
    },
    {
      opposite: true,
      title: {
        text: 'Line Chart'
      }
    }
  ],
  tooltip: {
    shared: true,
    intersect: false,
    theme: 'dark'
  },
  legend: {
    position: 'top' as const,
    horizontalAlign: 'left' as const
  },
  colors: ['#6366f1', '#22d3ee']
}))

const basicMixedSeries = computed(() => [
  {
    name: 'Bar Series',
    type: 'column',
    data: basicMixedData.value.barData
  },
  {
    name: 'Line Series',
    type: 'line',
    data: basicMixedData.value.lineData
  }
])

// Bar + Line Chart
const barLineData = ref(generateBarLineData('7d'))

const barLineOptions = computed(() => ({
  chart: {
    type: 'line' as const,
    height: 300,
    toolbar: { show: false },
    background: 'transparent'
  },
  stroke: {
    width: [0, 4],
    curve: 'smooth' as const
  },
  plotOptions: {
    bar: {
      columnWidth: '60%',
      borderRadius: 4
    }
  },
  labels: barLineData.value.categories,
  xaxis: {
    categories: barLineData.value.categories
  },
  yaxis: [
    {
      title: {
        text: 'Revenue'
      }
    },
    {
      opposite: true,
      title: {
        text: 'Profit'
      }
    }
  ],
  tooltip: {
    shared: true,
    intersect: false,
    theme: 'dark'
  },
  colors: ['#8b5cf6', '#f59e0b']
}))

const barLineSeries = computed(() => [
  {
    name: 'Revenue',
    type: 'column',
    data: barLineData.value.barData
  },
  {
    name: 'Profit',
    type: 'line',
    data: barLineData.value.lineData
  }
])

// Area + Column Chart
const areaColumnData = ref(generateAreaColumnData('7d'))

const areaColumnOptions = computed(() => ({
  chart: {
    type: 'line' as const,
    height: 300,
    toolbar: { show: false },
    background: 'transparent'
  },
  stroke: {
    width: [0, 4],
    curve: 'smooth' as const
  },
  plotOptions: {
    bar: {
      columnWidth: '60%',
      borderRadius: 4
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      shadeIntensity: 0.25,
      opacityFrom: 0.7,
      opacityTo: 0.3
    }
  },
  labels: areaColumnData.value.categories,
  xaxis: {
    categories: areaColumnData.value.categories
  },
  tooltip: {
    shared: true,
    intersect: false,
    theme: 'dark'
  },
  colors: ['#10b981', '#ef4444']
}))

const areaColumnSeries = computed(() => [
  {
    name: 'Area Series',
    type: 'area',
    data: areaColumnData.value.areaData
  },
  {
    name: 'Column Series',
    type: 'column',
    data: areaColumnData.value.columnData
  }
])

// Multiple Y-Axes
const multiYData = ref(generateMultiYData('7d'))

const multiYOptions = computed(() => ({
  chart: {
    type: 'line' as const,
    height: 350,
    toolbar: { show: false },
    background: 'transparent'
  },
  stroke: {
    width: 2,
    curve: 'smooth' as const
  },
  labels: multiYData.value.categories,
  xaxis: {
    categories: multiYData.value.categories
  },
  yaxis: [
    {
      seriesName: 'Temperature',
      opposite: false,
      title: {
        text: 'Temperature (°C)'
      }
    },
    {
      seriesName: 'Rainfall',
      opposite: true,
      title: {
        text: 'Rainfall (mm)'
      }
    },
    {
      seriesName: 'Humidity',
      opposite: true,
      title: {
        text: 'Humidity (%)'
      }
    }
  ],
  tooltip: {
    shared: true,
    intersect: false,
    theme: 'dark'
  },
  legend: {
    position: 'top' as const,
    horizontalAlign: 'left' as const
  },
  colors: ['#f59e0b', '#3b82f6', '#10b981']
}))

const multiYSeries = computed(() => [
  {
    name: 'Temperature',
    type: 'line',
    data: multiYData.value.temperature
  },
  {
    name: 'Rainfall',
    type: 'column',
    data: multiYData.value.rainfall
  },
  {
    name: 'Humidity',
    type: 'line',
    data: multiYData.value.humidity
  }
])

// Real-time Mixed Chart
const realtimeMixedData = ref({
  categories: Array.from({ length: 10 }, (_, i) => `T-${9 - i}`),
  barData: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 20),
  lineData: Array.from({ length: 10 }, () => Math.floor(Math.random() * 80) + 40)
})

const realtimeMixedOptions = computed(() => ({
  chart: {
    type: 'line' as const,
    height: 350,
    animations: {
      enabled: true,
      easing: 'linear' as const,
      dynamicAnimation: {
        speed: 1000
      }
    },
    toolbar: { show: false },
    background: 'transparent'
  },
  stroke: {
    width: [0, 4],
    curve: 'smooth' as const
  },
  plotOptions: {
    bar: {
      columnWidth: '50%',
      borderRadius: 4
    }
  },
  labels: realtimeMixedData.value.categories,
  xaxis: {
    categories: realtimeMixedData.value.categories
  },
  yaxis: [
    {
      title: {
        text: 'Bar Data'
      }
    },
    {
      opposite: true,
      title: {
        text: 'Line Data'
      }
    }
  ],
  tooltip: {
    shared: true,
    intersect: false,
    theme: 'dark'
  },
  colors: ['#ec4899', '#14b8a6']
}))

const realtimeMixedSeries = computed(() => [
  {
    name: 'Real-time Bar',
    type: 'column',
    data: realtimeMixedData.value.barData
  },
  {
    name: 'Real-time Line',
    type: 'line',
    data: realtimeMixedData.value.lineData
  }
])

// Candlestick + Volume
const candlestickData = ref(generateCandlestickData('7d'))

const candlestickOptions = computed(() => ({
  chart: {
    type: 'candlestick' as const,
    height: 300,
    toolbar: { show: false },
    background: 'transparent'
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: '#10b981',
        downward: '#ef4444'
      }
    }
  },
  xaxis: {
    type: 'category' as const
  },
  yaxis: {
    tooltip: {
      enabled: true
    }
  }
}))

const candlestickSeries = computed(() => [
  {
    name: 'candlestick',
    data: candlestickData.value.candlestickData
  }
])

// Scatter + Line
const scatterLineData = ref(generateScatterLineData('7d'))

const scatterLineOptions = computed(() => ({
  chart: {
    type: 'line' as const,
    height: 300,
    toolbar: { show: false },
    background: 'transparent'
  },
  stroke: {
    width: 4,
    curve: 'smooth' as const
  },
  markers: {
    size: 8
  },
  xaxis: {
    type: 'numeric' as const,
    min: 0,
    max: 100
  },
  yaxis: {
    min: 0,
    max: 100
  },
  tooltip: {
    shared: true,
    intersect: false,
    theme: 'dark'
  },
  colors: ['#6366f1', '#f59e0b']
}))

const scatterLineSeries = computed(() => [
  {
    name: 'Scatter Points',
    type: 'scatter',
    data: scatterLineData.value.scatterData
  },
  {
    name: 'Trend Line',
    type: 'line',
    data: scatterLineData.value.lineData
  }
])

// Event handlers
const handlePeriodSelect = (chart: string, period: string) => {
  const periodLabels: Record<string, string> = {
    '7d': 'Last 7 days',
    '30d': 'Last 30 days',
    '3m': 'Last 3 months',
    '1y': 'Last year'
  }
  
  selectedPeriod.value[chart as keyof typeof selectedPeriod.value] = periodLabels[period]
  
  switch (chart) {
    case 'basic':
      basicMixedData.value = generateBasicMixedData(period)
      break
    case 'barLine':
      barLineData.value = generateBarLineData(period)
      break
    case 'areaColumn':
      areaColumnData.value = generateAreaColumnData(period)
      break
    case 'multiY':
      multiYData.value = generateMultiYData(period)
      break
    case 'realtime':
      realtimeMixedData.value = {
        categories: Array.from({ length: 10 }, (_, i) => `T-${9 - i}`),
        barData: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 20),
        lineData: Array.from({ length: 10 }, () => Math.floor(Math.random() * 80) + 40)
      }
      break
    case 'candlestick':
      candlestickData.value = generateCandlestickData(period)
      break
    case 'scatterLine':
      scatterLineData.value = generateScatterLineData(period)
      break
  }
}

const handleDatasetSelect = (chart: string, dataset: string) => {
  const datasetLabels: Record<string, string> = {
    'sales': 'Sales & Revenue',
    'users': 'Users & Sessions',
    'performance': 'Performance Metrics',
    'custom': 'Custom Dataset'
  }
  
  selectedDataset.value[chart as keyof typeof selectedDataset.value] = datasetLabels[dataset]
  
  if (chart === 'realtime') {
    realtimeMixedData.value = {
      categories: Array.from({ length: 10 }, (_, i) => `T-${9 - i}`),
      barData: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 20),
      lineData: Array.from({ length: 10 }, () => Math.floor(Math.random() * 80) + 40)
    }
  }
}

const toggleRealtime = () => {
  if (isRealtimeRunning.value) {
    if (realtimeInterval) {
      clearInterval(realtimeInterval)
      realtimeInterval = null
    }
    isRealtimeRunning.value = false
  } else {
    isRealtimeRunning.value = true
    realtimeInterval = setInterval(() => {
      realtimeMixedData.value.barData.shift()
      realtimeMixedData.value.barData.push(Math.floor(Math.random() * 100) + 20)
      
      realtimeMixedData.value.lineData.shift()
      realtimeMixedData.value.lineData.push(Math.floor(Math.random() * 80) + 40)
      
      const newTime = new Date().toLocaleTimeString()
      realtimeMixedData.value.categories.shift()
      realtimeMixedData.value.categories.push(newTime)
    }, 1000)
  }
}

onUnmounted(() => {
  if (realtimeInterval) {
    clearInterval(realtimeInterval)
  }
})
</script>

<style scoped>
.mixed-charts-page {
  padding: 24px;
  background: var(--n-card-color);
  border-radius: 12px;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--n-text-color-1);
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 1rem;
  color: var(--n-text-color-3);
  margin: 0;
}

.chart-card {
  border: 1px solid var(--n-border-color);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.chart-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .mixed-charts-page {
    padding: 16px;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
}
</style>