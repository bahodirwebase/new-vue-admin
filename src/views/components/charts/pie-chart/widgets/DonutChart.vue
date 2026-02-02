<script setup lang="ts">
import { computed, ref } from 'vue'
import { NCard, NButton, NDropdown, NIcon } from 'naive-ui'
import { ChevronDownOutline } from '@vicons/ionicons5'

import { PERIOD_OPTIONS } from '../constants'
import VueApexCharts from 'vue3-apexcharts'
const apexchart = VueApexCharts

const donutPeriod = ref('Last 7 Days')

// Donut Chart
const donutSeries = ref([44, 55, 41, 17, 15])

const donutChartOptions = computed(() => ({
    chart: {
        type: 'donut' as const,
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
    labels: ['Desktop', 'Mobile', 'Tablet', 'Smart TV', 'Others'],
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
                size: '65%',
                labels: {
                    show: true,
                    total: {
                        show: true,
                        showAlways: true,
                        label: 'Total',
                        fontSize: '22px',
                        fontWeight: 600,
                        color: '#666666'
                    }
                }
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
                legend: {
                    position: 'bottom'
                }
            }
        }
    ]
}))

// Period handlers
const handleDonutPeriodSelect = (key: string) => {
    const option = PERIOD_OPTIONS.find(opt => opt.key === key)
    if (option) {
        donutPeriod.value = option.label
        updateDonutData(key)
    }
}

// Data update functions
const updateDonutData = (period: string) => {
    const dataMap = {
        last7days: [44, 55, 41, 17, 15],
        last14days: [38, 42, 35, 20, 15],
        last30days: [32, 28, 30, 25, 15],
        last90days: [28, 25, 28, 27, 12]
    }

    donutSeries.value = dataMap[period as keyof typeof dataMap] || dataMap.last7days
}
</script>
<template>
    <n-card>
        <div class="chart-header">
            <h2 class="chart-title">Donut Chart</h2>
            <n-dropdown :options="PERIOD_OPTIONS" @select="handleDonutPeriodSelect" trigger="click">
                <n-button class="period-button" type="primary" strong size="small">
                    {{ donutPeriod }}
                    <template #icon>
                        <n-icon :component="ChevronDownOutline" />
                    </template>
                </n-button>
            </n-dropdown>
        </div>
        <div class="chart-container">
            <apexchart type="donut" height="300" :options="donutChartOptions" :series="donutSeries" />
        </div>
    </n-card>
</template>
