<template>
  <div class="pie-chart">
    <n-card title="Pie Charts" class="chart-card">
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
        <!-- Basic Pie Chart -->
        <n-gi>
          <n-card title="Basic Pie Chart" size="small">
            <canvas ref="basicPieChart" width="400" height="200"></canvas>
          </n-card>
        </n-gi>

        <!-- Doughnut Chart -->
        <n-gi>
          <n-card title="Doughnut Chart" size="small">
            <canvas ref="doughnutChart" width="400" height="200"></canvas>
          </n-card>
        </n-gi>

        <!-- Polar Area Chart -->
        <n-gi>
          <n-card title="Polar Area Chart" size="small">
            <canvas ref="polarAreaChart" width="400" height="200"></canvas>
          </n-card>
        </n-gi>

        <!-- Semi-circle Donut -->
        <n-gi>
          <n-card title="Semi-circle Donut" size="small">
            <canvas ref="semiCircleChart" width="400" height="200"></canvas>
          </n-card>
        </n-gi>
      </n-grid>

      <!-- Interactive Pie Chart -->
      <n-divider />
      <n-card title="Interactive Pie Chart" size="small">
        <template #header-extra>
          <n-space>
            <n-button @click="addSegment" type="success" size="small">
              Add Segment
            </n-button>
            <n-button @click="removeSegment" type="error" size="small">
              Remove Segment
            </n-button>
          </n-space>
        </template>
        <canvas ref="interactivePieChart" width="800" height="300"></canvas>
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

const basicPieChart = ref<HTMLCanvasElement>()
const doughnutChart = ref<HTMLCanvasElement>()
const polarAreaChart = ref<HTMLCanvasElement>()
const semiCircleChart = ref<HTMLCanvasElement>()
const interactivePieChart = ref<HTMLCanvasElement>()

let basicPieInstance: Chart | null = null
let doughnutInstance: Chart | null = null
let polarAreaInstance: Chart | null = null
let semiCircleInstance: Chart | null = null
let interactivePieInstance: Chart | null = null

const chartColors = [
  '#6366f1',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#06b6d4',
  '#8b5cf6',
  '#ec4899',
  '#14b8a6'
]

const pieData = {
  labels: ['Desktop', 'Mobile', 'Tablet', 'Smart TV'],
  datasets: [{
    data: [45, 30, 20, 5],
    backgroundColor: chartColors.slice(0, 4),
    borderWidth: 2,
    borderColor: '#fff'
  }]
}

const doughnutData = {
  labels: ['Completed', 'In Progress', 'Pending', 'Cancelled'],
  datasets: [{
    data: [65, 20, 10, 5],
    backgroundColor: chartColors.slice(0, 4),
    borderWidth: 2,
    borderColor: '#fff'
  }]
}

const polarAreaData = {
  labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
  datasets: [{
    data: [11, 16, 7, 3, 14],
    backgroundColor: chartColors.slice(0, 5),
    borderWidth: 1,
    borderColor: '#fff'
  }]
}

const interactiveData = ref({
  labels: ['Product A', 'Product B', 'Product C', 'Product D'],
  datasets: [{
    data: [30, 25, 20, 25],
    backgroundColor: chartColors.slice(0, 4),
    borderWidth: 2,
    borderColor: '#fff'
  }]
})

const createBasicPieChart = () => {
  if (!basicPieChart.value) return

  const config: ChartConfiguration = {
    type: 'pie',
    data: pieData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
        }
      }
    }
  }

  basicPieInstance = new Chart(basicPieChart.value, config)
}

const createDoughnutChart = () => {
  if (!doughnutChart.value) return

  const config: ChartConfiguration = {
    type: 'doughnut',
    data: doughnutData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
        }
      }
    }
  }

  doughnutInstance = new Chart(doughnutChart.value, config)
}

const createPolarAreaChart = () => {
  if (!polarAreaChart.value) return

  const config: ChartConfiguration = {
    type: 'polarArea',
    data: polarAreaData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
        }
      }
    }
  }

  polarAreaInstance = new Chart(polarAreaChart.value, config)
}

const createSemiCircleChart = () => {
  if (!semiCircleChart.value) return

  const config: ChartConfiguration = {
    type: 'doughnut',
    data: {
      labels: ['Completed', 'Remaining'],
      datasets: [{
        data: [75, 25],
        backgroundColor: [chartColors[0], '#e5e7eb'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
        }
      }
    }
  }

  semiCircleInstance = new Chart(semiCircleChart.value, config)
}

const createInteractivePieChart = () => {
  if (!interactivePieChart.value) return

  const config: ChartConfiguration = {
    type: 'pie',
    data: interactiveData.value,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      onClick: (_, elements) => {
        if (elements.length > 0) {
          const index = elements[0].index
          const label = interactiveData.value.labels[index]
          const value = interactiveData.value.datasets[0].data[index]
          message.info(`${label}: ${value}%`)
        }
      },
      plugins: {
        legend: {
          position: 'right',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.parsed}%`
            }
          }
        }
      }
    }
  }

  interactivePieInstance = new Chart(interactivePieChart.value, config)
}

const addSegment = () => {
  if (!interactivePieInstance || interactiveData.value.labels.length >= 8) {
    message.warning('Maximum segments reached!')
    return
  }

  const newLabel = `Product ${String.fromCharCode(65 + interactiveData.value.labels.length)}`
  const newValue = Math.floor(Math.random() * 30) + 10
  
  interactiveData.value.labels.push(newLabel)
  interactiveData.value.datasets[0].data.push(newValue)
  interactiveData.value.datasets[0].backgroundColor.push(chartColors[interactiveData.value.labels.length - 1])
  
  interactivePieInstance.update()
  message.success('Segment added successfully!')
}

const removeSegment = () => {
  if (!interactivePieInstance || interactiveData.value.labels.length <= 2) {
    message.warning('Minimum segments required!')
    return
  }

  interactiveData.value.labels.pop()
  interactiveData.value.datasets[0].data.pop()
  interactiveData.value.datasets[0].backgroundColor.pop()
  
  interactivePieInstance.update()
  message.success('Segment removed successfully!')
}

const refreshCharts = () => {
  // Destroy existing charts
  basicPieInstance?.destroy()
  doughnutInstance?.destroy()
  polarAreaInstance?.destroy()
  semiCircleInstance?.destroy()

  // Recreate charts with new random data
  createBasicPieChart()
  createDoughnutChart()
  createPolarAreaChart()
  createSemiCircleChart()

  message.success('Charts refreshed successfully!')
}

const downloadChart = () => {
  if (basicPieInstance) {
    const url = basicPieInstance.toBase64Image()
    const link = document.createElement('a')
    link.download = 'pie-chart.png'
    link.href = url
    link.click()
    message.success('Chart downloaded successfully!')
  }
}

onMounted(() => {
  createBasicPieChart()
  createDoughnutChart()
  createPolarAreaChart()
  createSemiCircleChart()
  createInteractivePieChart()
})

onUnmounted(() => {
  basicPieInstance?.destroy()
  doughnutInstance?.destroy()
  polarAreaInstance?.destroy()
  semiCircleInstance?.destroy()
  interactivePieInstance?.destroy()
})
</script>

<style scoped>
.pie-chart {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chart-card {
  background: white;
}
</style>
