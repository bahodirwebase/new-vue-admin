<script lang="ts" setup>
import { computed, ref } from 'vue';
import { PERIOD_OPTIONS } from '../constants';
import { ChevronDownOutline } from '@vicons/ionicons5';

import VueApexCharts from 'vue3-apexcharts'
const apexchart = VueApexCharts

// Period states
const steppedPeriod = ref('Last 7 Days')

const handleSteppedPeriodSelect = (key: string) => {
    const option = PERIOD_OPTIONS.find(opt => opt.key === key)
    if (option) {
        steppedPeriod.value = option.label
        updateSteppedData(key)
    }
}
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

const updateSteppedData = (period: string) => {
    const dataMap = {
        last7days: [10000, 15000, 15000, 25000, 25000, 35000, 35000],
        last14days: [10000, 15000, 15000, 25000, 25000, 35000, 35000, 45000, 45000, 55000, 55000, 65000, 65000, 75000]
    }
  
    steppedSeries.value[0].data = dataMap[period as keyof typeof dataMap] || dataMap.last7days
}
</script>
<template>
    <n-card>
        <div class="chart-header">
            <h2 class="chart-title">Stepped Line Chart</h2>
            <n-dropdown :options="PERIOD_OPTIONS" @select="handleSteppedPeriodSelect" trigger="click">
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
</template>
