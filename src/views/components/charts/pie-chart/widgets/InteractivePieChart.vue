<script setup lang="ts">
import { computed, ref } from 'vue'
import { NCard, NButton, NDropdown, NIcon } from 'naive-ui'
import { ChevronDownOutline } from '@vicons/ionicons5'

import { DATASET_OPTIONS } from '../constants'
import VueApexCharts from 'vue3-apexcharts'
const apexchart = VueApexCharts

const selectedDataset = ref('Sales Distribution')

// Interactive Pie Chart
const interactiveSeries = ref([44, 55, 13, 43, 22])

const interactiveChartOptions = computed(() => {
    const datasets = {
        'Sales Distribution': {
            labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
            colors: ['var(--primary-color)', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6']
        },
        'Traffic Sources': {
            labels: ['Direct', 'Social', 'Organic', 'Referral', 'Email'],
            colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
        },
        'Device Types': {
            labels: ['Desktop', 'Mobile', 'Tablet', 'Smart TV', 'Others'],
            colors: ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6']
        },
        'User Demographics': {
            labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
            colors: ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444']
        }
    }

    const currentDataset = datasets[selectedDataset.value as keyof typeof datasets] || datasets['Sales Distribution']

    return {
        chart: {
            type: 'pie' as const,
            height: 350,
            toolbar: { show: false },
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            events: {
                dataPointSelection: function (_event: any, _chartContext: any, config: any) {
                    // Handle slice click
                    console.log('Slice clicked:', config.dataPointIndex)
                }
            }
        },
        colors: currentDataset.colors,
        labels: currentDataset.labels,
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
        ],
        states: {
            hover: {
                filter: {
                    type: 'darken',
                    value: 0.1
                }
            },
            active: {
                allowMultipleDataPointsSelection: false,
                filter: {
                    type: 'darken',
                    value: 0.2
                }
            }
        }
    }
})

// Dataset handlers
const handleDatasetSelect = (key: string) => {
    const option = DATASET_OPTIONS.find(opt => opt.key === key)
    if (option) {
        selectedDataset.value = option.label
        updateInteractiveData(key)
    }
}

// Data update functions
const updateInteractiveData = (dataset: string) => {
    const dataMap = {
        sales: [44, 55, 13, 43, 22],
        traffic: [35, 25, 20, 15, 5],
        devices: [45, 35, 15, 3, 2],
        demographics: [20, 35, 25, 15, 5]
    }

    interactiveSeries.value = dataMap[dataset as keyof typeof dataMap] || dataMap.sales
}
</script>
<template>
    <n-card>
        <div class="chart-header">
            <h2 class="chart-title">Interactive Pie Chart</h2>
            <n-dropdown :options="DATASET_OPTIONS" @select="handleDatasetSelect" trigger="click">
                <n-button class="period-button" type="primary" strong size="small">
                    {{ selectedDataset }}
                    <template #icon>
                        <n-icon :component="ChevronDownOutline" />
                    </template>
                </n-button>
            </n-dropdown>
        </div>
        <div class="chart-container">
            <apexchart type="pie" height="350" :options="interactiveChartOptions" :series="interactiveSeries" />
        </div>
    </n-card>
</template>
