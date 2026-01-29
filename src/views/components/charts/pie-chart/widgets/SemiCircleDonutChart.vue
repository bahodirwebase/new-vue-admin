<script setup lang="ts">
import { computed, ref } from 'vue'
import { NCard, NButton, NDropdown, NIcon } from 'naive-ui'
import { ChevronDownOutline } from '@vicons/ionicons5'

import { PERIOD_OPTIONS } from '../constants'
import VueApexCharts from 'vue3-apexcharts'
const apexchart = VueApexCharts

const semiCirclePeriod = ref('Last 7 Days')

// Semi Circle Donut
const semiCircleSeries = ref([76])

const semiCircleChartOptions = computed(() => ({
    chart: {
        type: 'donut' as const,
        height: 300,
        toolbar: { show: false },
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    },
    colors: [
        'var(--primary-color)',
        '#f3f4f6'
    ],
    labels: ['Completed', 'Remaining'],
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
                size: '85%',
                labels: {
                    show: true,
                    total: {
                        show: true,
                        showAlways: true,
                        label: 'Progress',
                        fontSize: '22px',
                        fontWeight: 600,
                        color: '#666666',
                        formatter: function () {
                            return semiCircleSeries.value[0] + '%'
                        }
                    }
                }
            },
            startAngle: -90,
            endAngle: 90
        }
    },
    legend: {
        show: false
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
                }
            }
        }
    ]
}))

// Period handlers
const handleSemiCirclePeriodSelect = (key: string) => {
    const option = PERIOD_OPTIONS.find(opt => opt.key === key)
    if (option) {
        semiCirclePeriod.value = option.label
        updateSemiCircleData(key)
    }
}

// Data update functions
const updateSemiCircleData = (period: string) => {
    const dataMap = {
        last7days: [76],
        last14days: [82],
        last30days: [68],
        last90days: [71]
    }

    semiCircleSeries.value = dataMap[period as keyof typeof dataMap] || dataMap.last7days
}
</script>
<template>
    <n-card>
        <div class="chart-header">
            <h2 class="chart-title">Semi Circle Donut</h2>
            <n-dropdown :options="PERIOD_OPTIONS" @select="handleSemiCirclePeriodSelect" trigger="click">
                <n-button class="period-button" type="primary" strong size="small">
                    {{ semiCirclePeriod }}
                    <template #icon>
                        <n-icon :component="ChevronDownOutline" />
                    </template>
                </n-button>
            </n-dropdown>
        </div>
        <div class="chart-container">
            <apexchart type="donut" height="300" :options="semiCircleChartOptions" :series="semiCircleSeries" />
        </div>
    </n-card>
</template>
