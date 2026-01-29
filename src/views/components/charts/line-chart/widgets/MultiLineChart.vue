<script lang="ts" setup>
import { computed, ref } from 'vue';
import { PERIOD_OPTIONS } from '../constants';
import { ChevronDownOutline } from '@vicons/ionicons5';

import VueApexCharts from 'vue3-apexcharts'
const apexchart = VueApexCharts

// Period states
const multiPeriod = ref('Last 7 Days')

// Multi Line Chart
const multiSeries = ref([
    {
        name: 'Product A',
        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000]
    },
    {
        name: 'Product B',
        data: [8000, 12000, 18000, 15000, 20000, 25000, 22000]
    },
    {
        name: 'Product C',
        data: [5000, 8000, 12000, 10000, 14000, 18000, 16000]
    }
])

const multiChartOptions = computed(() => ({
    chart: {
        type: 'line' as const,
        height: 300,
        toolbar: { show: false },
        zoom: { enabled: false },
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    },
    colors: ['var(--primary-color)', '#22c55e', '#f59e0b'],
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
        size: 4,
        strokeColors: '#fff',
        strokeWidth: 2,
        hover: { size: 6 }
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

const handleMultiPeriodSelect = (key: string) => {
  const option = PERIOD_OPTIONS.find(opt => opt.key === key)
  if (option) {
    multiPeriod.value = option.label
    updateMultiData(key)
  }
}

const updateMultiData = (period: string) => {
  const dataMap = {
    last7days: [
      [12000, 19000, 15000, 25000, 22000, 30000, 28000],
      [8000, 12000, 18000, 15000, 20000, 25000, 22000],
      [5000, 8000, 12000, 10000, 14000, 18000, 16000]
    ],
    last14days: [
      Array.from({ length: 14 }, () => Math.floor(Math.random() * 20000) + 10000),
      Array.from({ length: 14 }, () => Math.floor(Math.random() * 15000) + 5000),
      Array.from({ length: 14 }, () => Math.floor(Math.random() * 10000) + 3000)
    ]
  }
  
  const data = dataMap[period as keyof typeof dataMap] || dataMap.last7days
  multiSeries.value[0].data = data[0]
  multiSeries.value[1].data = data[1]
  multiSeries.value[2].data = data[2]
}
</script>
<template>
    <n-card>
        <div class="chart-header">
            <h2 class="chart-title">Multi Line Chart</h2>
            <n-dropdown :options="PERIOD_OPTIONS" @select="handleMultiPeriodSelect" trigger="click">
                <n-button class="period-button" type="primary" strong size="small">
                    {{ multiPeriod }}
                    <template #icon>
                        <n-icon :component="ChevronDownOutline" />
                    </template>
                </n-button>
            </n-dropdown>
        </div>
        <div class="chart-container">
            <apexchart type="line" height="300" :options="multiChartOptions" :series="multiSeries" />
        </div>
    </n-card>
</template>
