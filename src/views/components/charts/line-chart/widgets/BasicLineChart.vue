<script setup lang="ts">
import { computed, ref } from 'vue'
import { NCard, NButton, NDropdown, NIcon } from 'naive-ui'
import { ChevronDownOutline } from '@vicons/ionicons5'

import { PERIOD_OPTIONS } from '../constants'
import VueApexCharts from 'vue3-apexcharts'
const apexchart = VueApexCharts

const basicPeriod = ref('Last 7 Days')
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
// Period handlers
const handleBasicPeriodSelect = (key: string) => {
    const option = PERIOD_OPTIONS.find(opt => opt.key === key)
    if (option) {
        basicPeriod.value = option.label
        updateBasicData(key)
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
</script>
<template>
    <n-card>
        <div class="chart-header">
            <h2 class="chart-title">Basic Line Chart</h2>
            <n-dropdown :options="PERIOD_OPTIONS" @select="handleBasicPeriodSelect" trigger="click">
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
</template>
