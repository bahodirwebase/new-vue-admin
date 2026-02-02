<script setup lang="ts">
import { computed, ref } from 'vue'
import { NCard, NButton, NDropdown, NIcon } from 'naive-ui'
import { ChevronDownOutline } from '@vicons/ionicons5'

import { PERIOD_OPTIONS } from '../constants'
import VueApexCharts from 'vue3-apexcharts'
const apexchart = VueApexCharts

const advancedPeriod = ref('Last 7 Days')

// Advanced Pie Chart with custom features
const advancedSeries = ref([44, 55, 13, 43, 22])

const advancedChartOptions = computed(() => ({
    chart: {
        type: 'pie' as const,
        height: 350,
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
        },
        style: {
            fontSize: '12px',
            colors: ['#fff']
        }
    },
    plotOptions: {
        pie: {
            expandOnClick: true,
            donut: {
                size: '0%'
            },
            offsetY: 0,
            startAngle: 0,
            endAngle: 360
        }
    },
    legend: {
        position: 'right' as const,
        horizontalAlign: 'center' as const,
        floating: false,
        labels: {
            colors: '#666666',
            useSeriesColors: false,
            fontSize: '12px'
        },
        markers: {
            width: 12,
            height: 12,
            strokeWidth: 0,
            strokeColor: '#fff',
            radius: 12,
            offsetX: 0,
            offsetY: 0
        },
        itemMargin: {
            horizontal: 5,
            vertical: 5
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
            breakpoint: 768,
            options: {
                legend: {
                    position: 'bottom'
                }
            }
        },
        {
            breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    ],
    states: {
        hover: {
            filter: {
                type: 'darken',
                value: 0.1
            }
        }
    },
    animations: {
        enabled: true,
        easing: 'easeinout' as const,
        speed: 800,
        animateGradually: {
            enabled: true,
            delay: 150
        },
        dynamicAnimation: {
            enabled: true,
            speed: 350
        }
    }
}))

// Period handlers
const handleAdvancedPeriodSelect = (key: string) => {
    const option = PERIOD_OPTIONS.find(opt => opt.key === key)
    if (option) {
        advancedPeriod.value = option.label
        updateAdvancedData(key)
    }
}

// Data update functions
const updateAdvancedData = (period: string) => {
    const dataMap = {
        last7days: [44, 55, 13, 43, 22],
        last14days: [38, 42, 15, 35, 20],
        last30days: [32, 28, 18, 28, 24],
        last90days: [28, 25, 22, 25, 20]
    }

    advancedSeries.value = dataMap[period as keyof typeof dataMap] || dataMap.last7days
}
</script>
<template>
    <n-card>
        <div class="chart-header">
            <h2 class="chart-title">Advanced Pie Chart</h2>
            <n-dropdown :options="PERIOD_OPTIONS" @select="handleAdvancedPeriodSelect" trigger="click">
                <n-button class="period-button" type="primary" strong size="small">
                    {{ advancedPeriod }}
                    <template #icon>
                        <n-icon :component="ChevronDownOutline" />
                    </template>
                </n-button>
            </n-dropdown>
        </div>
        <div class="chart-container">
            <apexchart type="pie" height="350" :options="advancedChartOptions" :series="advancedSeries" />
        </div>
    </n-card>
</template>
