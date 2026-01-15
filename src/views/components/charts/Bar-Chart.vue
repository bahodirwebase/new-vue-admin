<template>
  <div class="bar-chart">
    <n-card title="Bar Charts" class="chart-card">
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
        <!-- Basic Bar Chart -->
        <n-gi>
          <n-card title="Basic Bar Chart" size="small">
            <canvas ref="basicBarChart" width="400" height="200"></canvas>
          </n-card>
        </n-gi>

        <!-- Horizontal Bar Chart -->
        <n-gi>
          <n-card title="Horizontal Bar Chart" size="small">
            <canvas ref="horizontalBarChart" width="400" height="200"></canvas>
          </n-card>
        </n-gi>

        <!-- Stacked Bar Chart -->
        <n-gi>
          <n-card title="Stacked Bar Chart" size="small">
            <canvas ref="stackedBarChart" width="400" height="200"></canvas>
          </n-card>
        </n-gi>

        <!-- Grouped Bar Chart -->
        <n-gi>
          <n-card title="Grouped Bar Chart" size="small">
            <canvas ref="groupedBarChart" width="400" height="200"></canvas>
          </n-card>
        </n-gi>
      </n-grid>

      <!-- Interactive Bar Chart -->
      <n-divider />
      <n-card title="Interactive Bar Chart" size="small">
        <template #header-extra>
          <n-space>
            <n-select v-model:value="selectedDataset" :options="datasetOptions" @update:value="updateDataset" />
          </n-space>
        </template>
        <canvas ref="interactiveBarChart" width="800" height="300"></canvas>
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

const basicBarChart = ref<HTMLCanvasElement>()
const horizontalBarChart = ref<HTMLCanvasElement>()
const stackedBarChart = ref<HTMLCanvasElement>()
const groupedBarChart = ref<HTMLCanvasElement>()
const interactiveBarChart = ref<HTMLCanvasElement>()

let basicChartInstance: Chart | null = null
let horizontalChartInstance: Chart | null = null
let stackedChartInstance: Chart | null = null
let groupedChartInstance: Chart | null = null
let interactiveChartInstance: Chart | null = null

const selectedDataset = ref('sales')
const datasetOptions = [
  { label: 'Sales', value: 'sales' },
  { label: 'Revenue', value: 'revenue' },
  { label: 'Profit', value: 'profit' }
]

const chartColors = {
  primary: '#6366f1',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#06b6d4'
}

const datasets = {
  sales: {
    label: 'Sales',
    data: [65, 59, 80, 81, 56, 55, 40],
    backgroundColor: chartColors.primary
  },
  revenue: {
    label: 'Revenue',
    data: [28, 48, 40, 19, 86, 27, 90],
    backgroundColor: chartColors.success
  },
  profit: {
    label: 'Profit',
    data: [45, 25, 35, 51, 42, 65, 75],
    backgroundColor: chartColors.warning
  }
}

const createBasicBarChart = () => {
  if (!basicBarChart.value) return

  const config: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: chartColors.primary
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

  basicChartInstance = new Chart(basicBarChart.value, config)
}

const createHorizontalBarChart = () => {
  if (!horizontalBarChart.value) return

  const config: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
      datasets: [{
        label: 'Sales',
        data: [65, 59, 80, 81, 56],
        backgroundColor: chartColors.success
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        }
      }
    }
  }

  horizontalChartInstance = new Chart(horizontalBarChart.value, config)
}

const createStackedBarChart = () => {
  if (!stackedBarChart.value) return

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
          label: 'Product C',
          data: [5, 8, 12, 15, 10, 8],
          backgroundColor: chartColors.warning
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true
        },
        y: {
          stacked: true
        }
      },
      plugins: {
        legend: {
          position: 'top',
        }
      }
    }
  }

  stackedChartInstance = new Chart(stackedBarChart.value, config)
}

const createGroupedBarChart = () => {
  if (!groupedBarChart.value) return

  const config: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: '2022',
          data: [65, 59, 80, 81],
          backgroundColor: chartColors.primary
        },
        {
          label: '2023',
          data: [75, 69, 90, 91],
          backgroundColor: chartColors.success
        },
        {
          label: '2024',
          data: [85, 79, 100, 101],
          backgroundColor: chartColors.warning
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

  groupedChartInstance = new Chart(groupedBarChart.value, config)
}

const createInteractiveBarChart = () => {
  if (!interactiveBarChart.value) return

  const config: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [datasets[selectedDataset.value as keyof typeof datasets]]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      onClick: (_, elements) => {
        if (elements.length > 0) {
          const index = elements[0].index
          const value = datasets[selectedDataset.value as keyof typeof datasets].data[index]
          message.info(`${datasets[selectedDataset.value as keyof typeof datasets].label}: ${value}`)
        }
      },
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.parsed.y}`
            }
          }
        }
      }
    }
  }

  interactiveChartInstance = new Chart(interactiveBarChart.value, config)
}

const updateDataset = () => {
  if (!interactiveChartInstance) return

  interactiveChartInstance.data.datasets = [datasets[selectedDataset.value as keyof typeof datasets]]
  interactiveChartInstance.update()
}

const refreshCharts = () => {
  // Destroy existing charts
  basicChartInstance?.destroy()
  horizontalChartInstance?.destroy()
  stackedChartInstance?.destroy()
  groupedChartInstance?.destroy()

  // Recreate charts with new random data
  createBasicBarChart()
  createHorizontalBarChart()
  createStackedBarChart()
  createGroupedBarChart()

  message.success('Charts refreshed successfully!')
}

const downloadChart = () => {
  if (basicChartInstance) {
    const url = basicChartInstance.toBase64Image()
    const link = document.createElement('a')
    link.download = 'bar-chart.png'
    link.href = url
    link.click()
    message.success('Chart downloaded successfully!')
  }
}

onMounted(() => {
  createBasicBarChart()
  createHorizontalBarChart()
  createStackedBarChart()
  createGroupedBarChart()
  createInteractiveBarChart()
})

onUnmounted(() => {
  basicChartInstance?.destroy()
  horizontalChartInstance?.destroy()
  stackedChartInstance?.destroy()
  groupedChartInstance?.destroy()
  interactiveChartInstance?.destroy()
})
</script>

<style scoped>
.bar-chart {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chart-card {
  background: white;
}
</style>
