<script lang="ts" setup>
import { computed, ref } from 'vue';
import { PERIOD_OPTIONS } from '../constants';
import { ChevronDownOutline } from '@vicons/ionicons5';

import VueApexCharts from 'vue3-apexcharts'
const apexchart = VueApexCharts

// Period states
const horizontalPeriod = ref('Last 7 Days')

// Horizontal Bar Chart
const horizontalSeries = ref([
  {
    name: 'Performance',
    data: [44, 55, 41, 67, 22, 43, 21]
  }
])

const horizontalChartOptions = computed(() => ({
    chart: {
        type: 'bar' as const,
        height: 300,
        toolbar: { show: false },
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    },
    colors: ['#22c55e'],
    plotOptions: {
        bar: {
            borderRadius: 8,
            horizontal: true,
            barHeight: '70%',
            dataLabels: {
                position: 'right'
            }
        }
    },
    grid: {
        borderColor: '#f0f0f0',
        strokeDashArray: 0,
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: false } }
    },
    dataLabels: {
        enabled: true,
        offsetX: 20,
        style: {
            fontSize: '12px',
            colors: ['#304758']
        },
        formatter: function (value: number) {
            return value + '%'
        }
    },
    xaxis: {
        categories: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E', 'Product F', 'Product G'],
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
            }
        }
    },
    tooltip: {
        y: {
            formatter: function (value: number) {
                return value + '%'
            }
        }
    }
}))

const handleHorizontalPeriodSelect = (key: string) => {
  const option = PERIOD_OPTIONS.find(opt => opt.key === key)
  if (option) {
    horizontalPeriod.value = option.label
    updateHorizontalData(key)
  }
}

const updateHorizontalData = (period: string) => {
  const dataMap = {
    last7days: [44, 55, 41, 67, 22, 43, 21],
    last14days: [48, 52, 45, 61, 38, 47, 35, 58, 49, 62, 71, 68, 73, 79],
    last30days: Array.from({ length: 30 }, () => Math.floor(Math.random() * 80) + 20),
    last90days: Array.from({ length: 90 }, () => Math.floor(Math.random() * 90) + 10)
  }
  
  horizontalSeries.value[0].data = dataMap[period as keyof typeof dataMap] || dataMap.last7days
}
</script>
<template>
    <n-card>
        <div class="chart-header">
            <h2 class="chart-title">Horizontal Bar Chart</h2>
            <n-dropdown :options="PERIOD_OPTIONS" @select="handleHorizontalPeriodSelect" trigger="click">
                <n-button class="period-button" type="primary" strong size="small">
                    {{ horizontalPeriod }}
                    <template #icon>
                        <n-icon :component="ChevronDownOutline" />
                    </template>
                </n-button>
            </n-dropdown>
        </div>
        <div class="chart-container">
            <apexchart type="bar" height="300" :options="horizontalChartOptions" :series="horizontalSeries" />
        </div>
    </n-card>
</template>