<script setup lang="ts">
import { computed, ref } from 'vue'
import { NCard, NButton, NDropdown, NIcon } from 'naive-ui'
import { ChevronDownOutline } from '@vicons/ionicons5'

import { PERIOD_OPTIONS } from '../constants'
import VueApexCharts from 'vue3-apexcharts'
const apexchart = VueApexCharts

const basicPeriod = ref('Last 7 Days')

// Basic Pie Chart
const basicSeries = ref([44, 55, 13, 43, 22])

const basicChartOptions = computed(() => ({
    chart: {
        type: 'pie' as const,
        height: 300,
        toolbar: { show: false },
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    },
    colors: [
        'var(--primary-color)',
        '#22c55e',
        '#f59e0b',
        '#ef4444',
        '#8b5cf6'
    ],
    labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
    stroke: {
        show: true,
        width: 2,
        colors: ['#fff']
    },
    dataLabels: {
        enabled: true,
        formatter: function (val: number) {
            return val.toFixed(1) + '%'
        },
        dropShadow: {
            enabled: false
        }
    },
    plotOptions: {
        pie: {
            expandOnClick: true,
            donut: {
                size: '0%'
            }
        }
    },
    legend: {
        position: 'bottom' as const,
        horizontalAlign: 'center' as const,
        labels: {
            colors: '#666666',
            useSeriesColors: false,
            fontSize: '12px'
        }
    },
    tooltip: {
        y: {
            formatter: function (val: number) {
                return val.toFixed(1) + '%'
            }
        }
    },
    responsive: [
        {
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    ]
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
        last7days: [44, 55, 13, 43, 22],
        last14days: [38, 42, 15, 35, 20],
        last30days: [32, 28, 18, 28, 24],
        last90days: [28, 25, 22, 25, 20]
    }

    basicSeries.value = dataMap[period as keyof typeof dataMap] || dataMap.last7days
}
</script>
<template>
    <n-card>
        <div class="chart-header">
            <h2 class="chart-title">Basic Pie Chart</h2>
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
            <apexchart type="pie" height="300" :options="basicChartOptions" :series="basicSeries" />
        </div>
    </n-card>
</template>
