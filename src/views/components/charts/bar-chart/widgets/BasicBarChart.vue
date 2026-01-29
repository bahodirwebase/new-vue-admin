<script setup lang="ts">
import { computed, ref } from 'vue'
import { NCard, NButton, NDropdown, NIcon } from 'naive-ui'
import { ChevronDownOutline } from '@vicons/ionicons5'

import { PERIOD_OPTIONS } from '../constants'
import VueApexCharts from 'vue3-apexcharts'
const apexchart = VueApexCharts

const basicPeriod = ref('Last 7 Days')
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
        last7days: [44000, 55000, 41000, 67000, 22000, 43000, 21000],
        last14days: [48000, 52000, 45000, 61000, 38000, 47000, 35000, 58000, 49000, 62000, 71000, 68000, 73000, 79000],
        last30days: Array.from({ length: 30 }, () => Math.floor(Math.random() * 50000) + 20000),
        last90days: Array.from({ length: 90 }, () => Math.floor(Math.random() * 60000) + 15000)
    }

    basicSeries.value[0].data = dataMap[period as keyof typeof dataMap] || dataMap.last7days
}
</script>
<template>
    <n-card>
        <div class="chart-header">
            <h2 class="chart-title">Basic Bar Chart</h2>
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
            <apexchart type="bar" height="300" :options="basicChartOptions" :series="basicSeries" />
        </div>
    </n-card>
</template>