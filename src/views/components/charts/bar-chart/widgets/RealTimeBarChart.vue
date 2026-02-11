<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, toRef, watch } from 'vue'
import { NCard, NButton, NSpace } from 'naive-ui'
import VueApexCharts from 'vue3-apexcharts'
import { useThemeStore } from '@/stores/theme'
const apexchart = VueApexCharts

const themeStore = useThemeStore()
const isDark = toRef(themeStore, 'isDark')

// Real-time states
const isRealTimeActive = ref(false)
let realTimeInterval: ReturnType<typeof setInterval> | null = null

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
        theme: isDark.value ? 'dark' : 'light',
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

// Watch theme changes for tooltip
watch(isDark, () => {
    // Tooltip theme computed option orqali avtomatik yangilanadi
})
</script>
<template>
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
</template>