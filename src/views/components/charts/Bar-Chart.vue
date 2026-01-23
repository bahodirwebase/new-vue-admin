<template>
  <div class="bar-charts-page">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Bar Charts</h1>
        <p class="page-subtitle">Advanced bar chart visualizations with ApexCharts</p>
      </div>

      <!-- Basic Bar Chart -->
      <n-grid :x-gap="18" :y-gap="18" cols="xxs:1 md:2" responsive="screen">
        <n-gi>
          <n-card>
            <div class="chart-header">
              <h2 class="chart-title">Basic Bar Chart</h2>
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
              <apexchart type="bar" height="300" :options="basicChartOptions" :series="basicSeries" />
            </div>
          </n-card>
        </n-gi>

        <!-- Horizontal Bar Chart -->
        <n-gi>
          <n-card>
            <div class="chart-header">
              <h2 class="chart-title">Horizontal Bar Chart</h2>
              <n-dropdown :options="periodOptions" @select="handleHorizontalPeriodSelect" trigger="click">
                <n-button class="period-button" type="primary" strong size="small">
                  {{ horizontalPeriod }}
                  <template #icon>
                    <n-icon :component="ChevronDownOutline" />
                  </template>
                </n-button>
              </n-dropdown>
            </div>
            <div class="chart-container">
              <apexchart type="bar" height="300" :options="horizontalChartOptions" :series="horizontalSeries" />
            </div>
          </n-card>
        </n-gi>
      </n-grid>

      <!-- Stacked Bar Chart -->
      <n-grid :x-gap="18" :y-gap="18" cols="xxs:1 md:2" responsive="screen">
        <n-gi>
          <n-card>
            <div class="chart-header">
              <h2 class="chart-title">Stacked Bar Chart</h2>
              <n-dropdown :options="periodOptions" @select="handleStackedPeriodSelect" trigger="click">
                <n-button class="period-button" type="primary" strong size="small">
                  {{ stackedPeriod }}
                  <template #icon>
                    <n-icon :component="ChevronDownOutline" />
                  </template>
                </n-button>
              </n-dropdown>
            </div>
            <div class="chart-container">
              <apexchart type="bar" height="300" :options="stackedChartOptions" :series="stackedSeries" />
            </div>
          </n-card>
        </n-gi>

        <!-- Grouped Bar Chart -->
        <n-gi>
          <n-card>
            <div class="chart-header">
              <h2 class="chart-title">Grouped Bar Chart</h2>
              <n-dropdown :options="periodOptions" @select="handleGroupedPeriodSelect" trigger="click">
                <n-button class="period-button" type="primary" strong size="small">
                  {{ groupedPeriod }}
                  <template #icon>
                    <n-icon :component="ChevronDownOutline" />
                  </template>
                </n-button>
              </n-dropdown>
            </div>
            <div class="chart-container">
              <apexchart type="bar" height="300" :options="groupedChartOptions" :series="groupedSeries" />
            </div>
          </n-card>
        </n-gi>
      </n-grid>

      <!-- Interactive Bar Chart -->
      <n-card>
        <div class="chart-header">
          <h2 class="chart-title">Interactive Bar Chart</h2>
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
          <apexchart type="bar" height="400" :options="interactiveChartOptions" :series="interactiveSeries" />
        </div>
      </n-card>

      <!-- Real-time Bar Chart -->
      <n-card>
        <div class="chart-header">
          <h2 class="chart-title">Real-time Bar Chart</h2>
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
          <apexchart type="bar" height="350" :options="realTimeChartOptions" :series="realTimeSeries" />
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
  { label: 'Sales Performance', key: 'sales' },
  { label: 'Revenue Analysis', key: 'revenue' },
  { label: 'Product Comparison', key: 'products' },
  { label: 'Category Distribution', key: 'categories' }
]

// Period states
const basicPeriod = ref('Last 7 Days')
const horizontalPeriod = ref('Last 7 Days')
const stackedPeriod = ref('Last 7 Days')
const groupedPeriod = ref('Last 7 Days')
const selectedDataset = ref('Sales Performance')

// Real-time states
const isRealTimeActive = ref(false)
let realTimeInterval: ReturnType<typeof setInterval> | null = null

// Basic Bar Chart
const basicSeries = ref([
  {
    name: 'Sales',
    data: [44000, 55000, 41000, 67000, 22000, 43000, 21000]
  }
])

const basicChartOptions = computed(() => ({
  chart: {
    type: 'bar' as const,
    height: 300,
    toolbar: { show: false },
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  colors: ['var(--primary-color)'],
  plotOptions: {
    bar: {
      borderRadius: 8,
      horizontal: false,
      columnWidth: '70%',
      dataLabels: {
        position: 'top'
      }
    }
  },
  grid: {
    borderColor: '#f0f0f0',
    strokeDashArray: 0,
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } }
  },
  dataLabels: {
    enabled: true,
    offsetY: -20,
    style: {
      fontSize: '12px',
      colors: ['#304758']
    },
    formatter: function (value: number) {
      return '$' + (value / 1000) + 'K'
    }
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

// Horizontal Bar Chart
const horizontalSeries = ref([
  {
    name: 'Performance',
    data: [44, 55, 41, 67, 22, 43, 21]
  }
])

const horizontalChartOptions = computed(() => ({
  chart: {
    type: 'bar' as const,
    height: 300,
    toolbar: { show: false },
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  colors: ['#22c55e'],
  plotOptions: {
    bar: {
      borderRadius: 8,
      horizontal: true,
      barHeight: '70%',
      dataLabels: {
        position: 'right'
      }
    }
  },
  grid: {
    borderColor: '#f0f0f0',
    strokeDashArray: 0,
    xaxis: { lines: { show: true } },
    yaxis: { lines: { show: false } }
  },
  dataLabels: {
    enabled: true,
    offsetX: 20,
    style: {
      fontSize: '12px',
      colors: ['#304758']
    },
    formatter: function (value: number) {
      return value + '%'
    }
  },
  xaxis: {
    categories: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E', 'Product F', 'Product G'],
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
    y: {
      formatter: function (value: number) {
        return value + '%'
      }
    }
  }
}))

// Stacked Bar Chart
const stackedSeries = ref([
  {
    name: 'Product A',
    data: [44000, 55000, 41000, 67000, 22000, 43000, 21000]
  },
  {
    name: 'Product B',
    data: [33000, 41000, 62000, 33000, 56000, 33000, 81000]
  },
  {
    name: 'Product C',
    data: [12000, 15000, 18000, 25000, 32000, 28000, 35000]
  }
])

const stackedChartOptions = computed(() => ({
  chart: {
    type: 'bar' as const,
    height: 300,
    stacked: true,
    toolbar: { show: false },
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  colors: ['var(--primary-color)', '#22c55e', '#f59e0b'],
  plotOptions: {
    bar: {
      borderRadius: 8,
      horizontal: false,
      columnWidth: '80%'
    }
  },
  grid: {
    borderColor: '#f0f0f0',
    strokeDashArray: 0,
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } }
  },
  dataLabels: { enabled: false },
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

// Grouped Bar Chart
const groupedSeries = ref([
  {
    name: '2022',
    data: [44000, 55000, 41000, 67000]
  },
  {
    name: '2023',
    data: [53000, 62000, 51000, 78000]
  },
  {
    name: '2024',
    data: [61000, 73000, 62000, 91000]
  }
])

const groupedChartOptions = computed(() => ({
  chart: {
    type: 'bar' as const,
    height: 300,
    toolbar: { show: false },
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  colors: ['var(--primary-color)', '#22c55e', '#f59e0b'],
  plotOptions: {
    bar: {
      borderRadius: 8,
      horizontal: false,
      columnWidth: '70%',
      dataLabels: {
        position: 'top'
      }
    }
  },
  grid: {
    borderColor: '#f0f0f0',
    strokeDashArray: 0,
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } }
  },
  dataLabels: {
    enabled: true,
    offsetY: -20,
    style: {
      fontSize: '11px',
      colors: ['#304758']
    },
    formatter: function (value: number) {
      return '$' + (value / 1000) + 'K'
    }
  },
  xaxis: {
    categories: ['Q1', 'Q2', 'Q3', 'Q4'],
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

// Interactive Bar Chart
const interactiveSeries = computed(() => {
  const datasets = {
    sales: [
      {
        name: 'Online Sales',
        data: [44000, 55000, 41000, 67000, 22000, 43000, 21000, 58000, 41000, 63000, 76000, 81000]
      },
      {
        name: 'Offline Sales',
        data: [33000, 41000, 62000, 33000, 56000, 33000, 81000, 49000, 52000, 71000, 68000, 92000]
      }
    ],
    revenue: [
      {
        name: 'Product Revenue',
        data: [120000, 132000, 101000, 134000, 90000, 230000, 210000, 122000, 133000, 201000, 212000, 233000]
      },
      {
        name: 'Service Revenue',
        data: [88000, 94000, 76000, 112000, 98000, 167000, 189000, 145000, 167000, 189000, 201000, 223000]
      }
    ],
    products: [
      {
        name: 'Electronics',
        data: [44, 55, 41, 67, 22, 43, 21, 58, 41, 63, 76, 81]
      },
      {
        name: 'Clothing',
        data: [33, 41, 62, 33, 56, 33, 81, 49, 52, 71, 68, 92]
      },
      {
        name: 'Food',
        data: [12, 15, 18, 25, 32, 28, 35, 42, 38, 51, 48, 62]
      }
    ],
    categories: [
      {
        name: 'Category A',
        data: [144000, 155000, 141000, 167000, 122000, 143000, 121000]
      },
      {
        name: 'Category B',
        data: [133000, 141000, 162000, 133000, 156000, 133000, 181000]
      },
      {
        name: 'Category C',
        data: [112000, 115000, 118000, 125000, 132000, 128000, 135000]
      }
    ]
  }

  const key = selectedDataset.value.toLowerCase().replace(' ', '')
  return datasets[key as keyof typeof datasets] || datasets.sales
})

const interactiveChartOptions = computed(() => ({
  chart: {
    type: 'bar' as const,
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
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  colors: ['var(--primary-color)', '#22c55e', '#f59e0b', '#ef4444'],
  plotOptions: {
    bar: {
      borderRadius: 8,
      horizontal: false,
      columnWidth: '60%',
      dataLabels: {
        position: 'top'
      }
    }
  },
  grid: {
    borderColor: '#f0f0f0',
    strokeDashArray: 0,
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } }
  },
  dataLabels: { enabled: false },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
        if (selectedDataset.value.includes('Performance') || selectedDataset.value.includes('Products')) {
          return value.toLocaleString()
        }
        return '$' + (value / 1000) + 'K'
      }
    }
  },
  tooltip: {
    y: {
      formatter: function (value: number) {
        if (selectedDataset.value.includes('Performance') || selectedDataset.value.includes('Products')) {
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

// Real-time Bar Chart
const realTimeSeries = ref([
  {
    name: 'Live Data',
    data: [] as number[]
  }
])

const realTimeChartOptions = computed(() => ({
  chart: {
    type: 'bar' as const,
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
  colors: ['#06b6d4'],
  plotOptions: {
    bar: {
      borderRadius: 8,
      horizontal: false,
      columnWidth: '80%'
    }
  },
  grid: {
    borderColor: '#f0f0f0',
    strokeDashArray: 0,
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } }
  },
  dataLabels: { enabled: false },
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

// Period handlers
const handleBasicPeriodSelect = (key: string) => {
  const option = periodOptions.find(opt => opt.key === key)
  if (option) {
    basicPeriod.value = option.label
    updateBasicData(key)
  }
}

const handleHorizontalPeriodSelect = (key: string) => {
  const option = periodOptions.find(opt => opt.key === key)
  if (option) {
    horizontalPeriod.value = option.label
    updateHorizontalData(key)
  }
}

const handleStackedPeriodSelect = (key: string) => {
  const option = periodOptions.find(opt => opt.key === key)
  if (option) {
    stackedPeriod.value = option.label
    updateStackedData(key)
  }
}

const handleGroupedPeriodSelect = (key: string) => {
  const option = periodOptions.find(opt => opt.key === key)
  if (option) {
    groupedPeriod.value = option.label
    updateGroupedData(key)
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
    last7days: [44000, 55000, 41000, 67000, 22000, 43000, 21000],
    last14days: [48000, 52000, 45000, 61000, 38000, 47000, 35000, 58000, 49000, 62000, 71000, 68000, 73000, 79000],
    last30days: Array.from({ length: 30 }, () => Math.floor(Math.random() * 50000) + 20000),
    last90days: Array.from({ length: 90 }, () => Math.floor(Math.random() * 60000) + 15000)
  }
  
  basicSeries.value[0].data = dataMap[period as keyof typeof dataMap] || dataMap.last7days
}

const updateHorizontalData = (period: string) => {
  const dataMap = {
    last7days: [44, 55, 41, 67, 22, 43, 21],
    last14days: [48, 52, 45, 61, 38, 47, 35, 58, 49, 62, 71, 68, 73, 79],
    last30days: Array.from({ length: 30 }, () => Math.floor(Math.random() * 80) + 20),
    last90days: Array.from({ length: 90 }, () => Math.floor(Math.random() * 90) + 10)
  }
  
  horizontalSeries.value[0].data = dataMap[period as keyof typeof dataMap] || dataMap.last7days
}

const updateStackedData = (period: string) => {
  const dataMap = {
    last7days: [
      [44000, 55000, 41000, 67000, 22000, 43000, 21000],
      [33000, 41000, 62000, 33000, 56000, 33000, 81000],
      [12000, 15000, 18000, 25000, 32000, 28000, 35000]
    ],
    last14days: [
      Array.from({ length: 14 }, () => Math.floor(Math.random() * 40000) + 20000),
      Array.from({ length: 14 }, () => Math.floor(Math.random() * 35000) + 15000),
      Array.from({ length: 14 }, () => Math.floor(Math.random() * 25000) + 10000)
    ]
  }
  
  const data = dataMap[period as keyof typeof dataMap] || dataMap.last7days
  stackedSeries.value[0].data = data[0]
  stackedSeries.value[1].data = data[1]
  stackedSeries.value[2].data = data[2]
}

const updateGroupedData = (period: string) => {
  const dataMap = {
    last7days: [
      [44000, 55000, 41000, 67000],
      [53000, 62000, 51000, 78000],
      [61000, 73000, 62000, 91000]
    ],
    last14days: [
      Array.from({ length: 14 }, () => Math.floor(Math.random() * 40000) + 20000),
      Array.from({ length: 14 }, () => Math.floor(Math.random() * 45000) + 25000),
      Array.from({ length: 14 }, () => Math.floor(Math.random() * 50000) + 30000)
    ]
  }
  
  const data = dataMap[period as keyof typeof dataMap] || dataMap.last7days
  groupedSeries.value[0].data = data[0]
  groupedSeries.value[1].data = data[1]
  groupedSeries.value[2].data = data[2]
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
.bar-charts-page {
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