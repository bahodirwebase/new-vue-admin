<script lang="ts" setup>
import { computed, ref } from 'vue';
import { PERIOD_OPTIONS } from '../constants';
import { ChevronDownOutline } from '@vicons/ionicons5';

import VueApexCharts from 'vue3-apexcharts'
const apexchart = VueApexCharts

// Period states
const groupedPeriod = ref('Last 7 Days')

const handleGroupedPeriodSelect = (key: string) => {
    const option = PERIOD_OPTIONS.find(opt => opt.key === key)
    if (option) {
        groupedPeriod.value = option.label
        updateGroupedData(key)
    }
}
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
</script>
<template>
    <n-card>
        <div class="chart-header">
            <h2 class="chart-title">Grouped Bar Chart</h2>
            <n-dropdown :options="PERIOD_OPTIONS" @select="handleGroupedPeriodSelect" trigger="click">
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
</template>