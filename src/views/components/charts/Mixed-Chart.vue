<template>
  <div class="mixed-chart">
    <n-card title="Mixed Charts" class="chart-card">
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
        <!-- Line + Bar Chart -->
        <n-gi>
          <n-card title="Line + Bar Chart" size="small">
            <canvas ref="lineBarChart" width="400" height="200"></canvas>
          </n-card>
        </n-gi>

        <!-- Bar + Area Chart -->
        <n-gi>
          <n-card title="Bar + Area Chart" size="small">
            <canvas ref="barAreaChart" width="400" height="200"></canvas>
          </n-card>
        </n-gi>

        <!-- Multi-type Chart -->
        <n-gi>
          <n-card title="Multi-type Chart" size="small">
            <canvas ref="multiTypeChart" width="400" height="200"></canvas>
          </n-card>
        </n-gi>

        <!-- Combo Chart -->
        <n-gi>
          <n-card title="Combo Chart" size="small">
            <canvas ref="comboChart" width="400" height="200"></canvas>
          </n-card>
        </n-gi>
      </n-grid>

      <!-- Advanced Mixed Chart -->
      <n-divider />
      <n-card title="Advanced Mixed Chart" size="small">
        <template #header-extra>
          <n-space>
            <n-select v-model:value="chartType" :options="chartTypeOptions" @update:value="updateChartType" />
          </n-space>
        </template>
        <canvas ref="advancedChart" width="800" height="300"></canvas>
      </n-card>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Chart, type ChartConfiguration, type ChartTypeRegistry } from 'chart.js'
import { useMessage } from 'naive-ui'
import { RefreshOutline, DownloadOutline } from '@vicons/ionicons5'

const message = useMessage()

const lineBarChart = ref<HTMLCanvasElement>()
const barAreaChart = ref<HTMLCanvasElement>()
const multiTypeChart = ref<HTMLCanvasElement>()
const comboChart = ref<HTMLCanvasElement>()
const advancedChart = ref<HTMLCanvasElement>()

let lineBarInstance: Chart | null = null
let barAreaInstance: Chart | null = null
let multiTypeInstance: Chart | null = null
let comboInstance: Chart | null = null
let advancedInstance: Chart | null = null

const chartType = ref('combined')
const chartTypeOptions = [
  { label: 'Combined', value: 'combined' },
  { label: 'Separated', value: 'separated' },
  { label: 'Overlay', value: 'overlay' }
]

const chartColors = {
  primary: '#6366f1',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#06b6d4'
}

const createLineBarChart = () => {
  if (!lineBarChart.value) return

  const config: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Sales',
          data: [65, 59, 80, 81, 56, 55],
          backgroundColor: chartColors.primary,
          order: 2
        },
        {
          label: 'Profit',
          data: [28, 48, 40, 19, 86, 27],
          type: 'line',
          borderColor: chartColors.error,
          backgroundColor: `${chartColors.error}20`,
          tension: 0.4,
          order: 1
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

  lineBarInstance = new Chart(lineBarChart.value, config)
}

const createBarAreaChart = () => {
  if (!barAreaChart.value) return

  const config: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Revenue',
          data: [65, 59, 80, 81, 56, 55],
          backgroundColor: chartColors.success
        },
        {
          label: 'Cost',
          data: [45, 39, 60, 61, 36, 35],
          type: 'line',
          borderColor: chartColors.warning,
          backgroundColor: `${chartColors.warning}40`,
          fill: true,
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

  barAreaInstance = new Chart(barAreaChart.value, config)
}

const createMultiTypeChart = () => {
  if (!multiTypeChart.value) return

  const config: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Sales',
          data: [65, 59, 80, 81, 56, 55],
          backgroundColor: chartColors.primary
        },
        {
          label: 'Target',
          data: [70, 65, 85, 85, 60, 60],
          type: 'line',
          borderColor: chartColors.error,
          borderDash: [5, 5],
          tension: 0,
          fill: false
        },
        {
          label: 'Average',
          data: [60, 60, 60, 60, 60, 60],
          type: 'line',
          borderColor: chartColors.info,
          borderDash: [2, 2],
          tension: 0,
          fill: false
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

  multiTypeInstance = new Chart(multiTypeChart.value, config)
}

const createComboChart = () => {
  if (!comboChart.value) return

  const config: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Product A',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: chartColors.primary
        },
        {
          label: 'Product B',
          data: [8, 12, 15, 8, 12, 18],
          backgroundColor: chartColors.success
        },
        {
          label: 'Total',
          data: [20, 31, 18, 13, 14, 21],
          type: 'line',
          borderColor: chartColors.error,
          backgroundColor: `${chartColors.error}20`,
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

  comboInstance = new Chart(comboChart.value, config)
}

const createAdvancedChart = () => {
  if (!advancedChart.value) return

  const baseData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Revenue',
        data: [65, 59, 80, 81, 56, 55, 40, 75],
        backgroundColor: chartColors.primary,
        borderColor: chartColors.primary
      },
      {
        label: 'Profit',
        data: [28, 48, 40, 19, 86, 27, 90, 60],
        type: 'line' as keyof ChartTypeRegistry,
        borderColor: chartColors.success,
        backgroundColor: `${chartColors.success}20`,
        tension: 0.4
      },
      {
        label: 'Expenses',
        data: [45, 39, 60, 61, 36, 35, 50, 40],
        backgroundColor: chartColors.error,
        borderColor: chartColors.error
      }
    ]
  }

  const config: ChartConfiguration = {
    type: 'bar',
    data: baseData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        },
        x: {
          stacked: chartType.value === 'stacked'
        }
      },
      plugins: {
        legend: {
          position: 'top',
        }
      }
    }
  }

  advancedInstance = new Chart(advancedChart.value, config)
}

const updateChartType = () => {
  if (!advancedInstance) return

  // Update chart configuration based on selected type
  const isStacked = chartType.value === 'stacked'
  if (advancedInstance.options.scales && 'x' in advancedInstance.options.scales) {
    (advancedInstance.options.scales.x as any).stacked = isStacked
  }
  if (advancedInstance.options.scales && 'y' in advancedInstance.options.scales) {
    (advancedInstance.options.scales.y as any).stacked = isStacked
  }
  advancedInstance.update()
}

const refreshCharts = () => {
  // Destroy existing charts
  lineBarInstance?.destroy()
  barAreaInstance?.destroy()
  multiTypeInstance?.destroy()
  comboInstance?.destroy()

  // Recreate charts with new random data
  createLineBarChart()
  createBarAreaChart()
  createMultiTypeChart()
  createComboChart()

  message.success('Charts refreshed successfully!')
}

const downloadChart = () => {
  if (lineBarInstance) {
    const url = lineBarInstance.toBase64Image()
    const link = document.createElement('a')
    link.download = 'mixed-chart.png'
    link.href = url
    link.click()
    message.success('Chart downloaded successfully!')
  }
}

onMounted(() => {
  createLineBarChart()
  createBarAreaChart()
  createMultiTypeChart()
  createComboChart()
  createAdvancedChart()
})

onUnmounted(() => {
  lineBarInstance?.destroy()
  barAreaInstance?.destroy()
  multiTypeInstance?.destroy()
  comboInstance?.destroy()
  advancedInstance?.destroy()
})
</script>

<style scoped>
.mixed-chart {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chart-card {
  background: white;
}
</style>
