<template>
  <div class="line-chart">
    <n-card title="Line Charts" class="chart-card">
      <template #header-extra>
        <n-space>
          <n-button @click="refreshCharts" type="primary" size="small">
            <n-icon :component="RefreshOutline" />
            Refresh
          </n-button>
          <n-button @click="downloadChart" type="info" size="small">
            <n-icon :component="DownloadOutline" />
            Download
          </n-button>
        </n-space>
      </template>

      <n-grid :cols="2" :x-gap="16" :y-gap="16">
        <!-- Basic Line Chart -->
        <n-gi>
          <n-card title="Basic Line Chart" size="small">
            <canvas ref="basicLineChart" width="400" height="200"></canvas>
          </n-card>
        </n-gi>

        <!-- Multi Line Chart -->
        <n-gi>
          <n-card title="Multi Line Chart" size="small">
            <canvas ref="multiLineChart" width="400" height="200"></canvas>
          </n-card>
        </n-gi>

        <!-- Gradient Line Chart -->
        <n-gi>
          <n-card title="Gradient Line Chart" size="small">
            <canvas ref="gradientLineChart" width="400" height="200"></canvas>
          </n-card>
        </n-gi>

        <!-- Stepped Line Chart -->
        <n-gi>
          <n-card title="Stepped Line Chart" size="small">
            <canvas ref="steppedLineChart" width="400" height="200"></canvas>
          </n-card>
        </n-gi>
      </n-grid>

      <!-- Real-time Line Chart -->
      <n-divider />
      <n-card title="Real-time Line Chart" size="small">
        <template #header-extra>
          <n-space>
            <n-button @click="toggleRealTime" :type="isRealTimeActive ? 'error' : 'success'" size="small">
              {{ isRealTimeActive ? 'Stop' : 'Start' }} Real-time
            </n-button>
          </n-space>
        </template>
        <canvas ref="realTimeChart" width="800" height="300"></canvas>
      </n-card>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Chart, type ChartConfiguration } from 'chart.js'
import { useMessage } from 'naive-ui'
import { RefreshOutline, DownloadOutline } from '@vicons/ionicons5'

const message = useMessage()

const basicLineChart = ref<HTMLCanvasElement>()
const multiLineChart = ref<HTMLCanvasElement>()
const gradientLineChart = ref<HTMLCanvasElement>()
const steppedLineChart = ref<HTMLCanvasElement>()
const realTimeChart = ref<HTMLCanvasElement>()

let basicChartInstance: Chart | null = null
let multiChartInstance: Chart | null = null
let gradientChartInstance: Chart | null = null
let steppedChartInstance: Chart | null = null
let realTimeChartInstance: Chart | null = null

const isRealTimeActive = ref(false)
let realTimeInterval: ReturnType<typeof setInterval> | null = null

const chartColors = {
  primary: '#6366f1',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#06b6d4'
}

const createBasicLineChart = () => {
  if (!basicLineChart.value) return

  const config: ChartConfiguration = {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: chartColors.primary,
        backgroundColor: `${chartColors.primary}20`,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        }
      }
    }
  }

  basicChartInstance = new Chart(basicLineChart.value, config)
}

const createMultiLineChart = () => {
  if (!multiLineChart.value) return

  const config: ChartConfiguration = {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Product A',
          data: [12, 19, 3, 5, 2, 3],
          borderColor: chartColors.primary,
          backgroundColor: `${chartColors.primary}20`,
          tension: 0.4
        },
        {
          label: 'Product B',
          data: [8, 12, 15, 8, 12, 18],
          borderColor: chartColors.success,
          backgroundColor: `${chartColors.success}20`,
          tension: 0.4
        },
        {
          label: 'Product C',
          data: [5, 8, 12, 15, 10, 8],
          borderColor: chartColors.warning,
          backgroundColor: `${chartColors.warning}20`,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        }
      }
    }
  }

  multiChartInstance = new Chart(multiLineChart.value, config)
}

const createGradientLineChart = () => {
  if (!gradientLineChart.value) return

  const ctx = gradientLineChart.value.getContext('2d')
  if (!ctx) return

  const gradient = ctx.createLinearGradient(0, 0, 0, 400)
  gradient.addColorStop(0, chartColors.primary)
  gradient.addColorStop(1, `${chartColors.primary}20`)

  const config: ChartConfiguration = {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      datasets: [{
        label: 'Revenue',
        data: [30, 45, 60, 70, 85, 95, 110, 125],
        borderColor: chartColors.primary,
        backgroundColor: gradient,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        }
      }
    }
  }

  gradientChartInstance = new Chart(gradientLineChart.value, config)
}

const createSteppedLineChart = () => {
  if (!steppedLineChart.value) return

  const config: ChartConfiguration = {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Stepped Data',
        data: [10, 20, 15, 25, 30, 35],
        borderColor: chartColors.error,
        backgroundColor: `${chartColors.error}20`,
        stepped: true,
        tension: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        }
      }
    }
  }

  steppedChartInstance = new Chart(steppedLineChart.value, config)
}

const createRealTimeChart = () => {
  if (!realTimeChart.value) return

  const config: ChartConfiguration = {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Live Data',
        data: [],
        borderColor: chartColors.info,
        backgroundColor: `${chartColors.info}20`,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          display: true
        },
        y: {
          display: true,
          min: 0,
          max: 100
        }
      },
      plugins: {
        legend: {
          position: 'top',
        }
      }
    }
  }

  realTimeChartInstance = new Chart(realTimeChart.value, config)
}

const updateRealTimeChart = () => {
  if (!realTimeChartInstance) return

  const now = new Date()
  const timeLabel = now.toLocaleTimeString()
  const newValue = Math.floor(Math.random() * 100)

  const chart = realTimeChartInstance
  chart.data.labels!.push(timeLabel)
  chart.data.datasets[0].data.push(newValue)

  // Keep only last 20 data points
  if (chart.data.labels!.length > 20) {
    chart.data.labels!.shift()
    chart.data.datasets[0].data.shift()
  }

  chart.update('none')
}

const toggleRealTime = () => {
  isRealTimeActive.value = !isRealTimeActive.value

  if (isRealTimeActive.value) {
    realTimeInterval = setInterval(updateRealTimeChart, 1000)
    message.success('Real-time updates started')
  } else {
    if (realTimeInterval) {
      clearInterval(realTimeInterval)
      realTimeInterval = null
    }
    message.info('Real-time updates stopped')
  }
}

const refreshCharts = () => {
  // Destroy existing charts
  basicChartInstance?.destroy()
  multiChartInstance?.destroy()
  gradientChartInstance?.destroy()
  steppedChartInstance?.destroy()

  // Recreate charts with new random data
  createBasicLineChart()
  createMultiLineChart()
  createGradientLineChart()
  createSteppedLineChart()

  message.success('Charts refreshed successfully!')
}

const downloadChart = () => {
  if (basicChartInstance) {
    const url = basicChartInstance.toBase64Image()
    const link = document.createElement('a')
    link.download = 'line-chart.png'
    link.href = url
    link.click()
    message.success('Chart downloaded successfully!')
  }
}

onMounted(() => {
  createBasicLineChart()
  createMultiLineChart()
  createGradientLineChart()
  createSteppedLineChart()
  createRealTimeChart()
})

onUnmounted(() => {
  if (realTimeInterval) {
    clearInterval(realTimeInterval)
  }
  
  basicChartInstance?.destroy()
  multiChartInstance?.destroy()
  gradientChartInstance?.destroy()
  steppedChartInstance?.destroy()
  realTimeChartInstance?.destroy()
})
</script>

<style scoped>
.line-chart {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chart-card {
  background: white;
}
</style>
