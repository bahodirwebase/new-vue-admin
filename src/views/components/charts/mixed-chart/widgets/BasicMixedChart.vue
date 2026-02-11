<script setup lang="ts">
import { computed, ref, toRef } from 'vue'
import { NCard, NButton, NDropdown, NIcon } from 'naive-ui'
import { ChevronDownOutline } from '@vicons/ionicons5'
import { PERIOD_OPTIONS } from '../constants'
import VueApexCharts from 'vue3-apexcharts'
import { useThemeStore } from '@/stores/theme'
const apexchart = VueApexCharts

const themeStore = useThemeStore()
const isDark = toRef(themeStore, 'isDark')

const basicPeriod = ref('Last 7 Days')
// Basic Mixed Chart
const basicMixedSeries = ref([
  {
    name: 'Revenue',
    type: 'column',
    data: [44000, 55000, 41000, 67000, 22000, 43000, 21000]
  },
  {
    name: 'Profit',
    type: 'line',
    data: [12000, 15000, 13000, 18000, 16000, 22000, 25000]
  }
])
const basicMixedOptions = computed(() => ({
    chart: {
        type: 'line' as const,
        height: 350,
        toolbar: { show: false },
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    },
    colors: ['var(--primary-color)', '#22c55e'],
    stroke: {
        curve: 'smooth' as const,
        width: 3
    },
    plotOptions: {
        bar: {
            borderRadius: 8,
            columnWidth: '60%'
        }
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
        colors: ['#22c55e'],
        strokeColors: '#fff',
        strokeWidth: 2,
        hover: { size: 7 }
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
        theme: isDark.value ? 'dark' : 'light',
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
        last7days: {
            revenue: [44000, 55000, 41000, 67000, 22000, 43000, 21000],
            profit: [12000, 15000, 13000, 18000, 16000, 22000, 25000]
        },
        last14days: {
            revenue: Array.from({ length: 14 }, () => Math.floor(Math.random() * 40000) + 20000),
            profit: Array.from({ length: 14 }, () => Math.floor(Math.random() * 15000) + 8000)
        },
        last30days: {
            revenue: Array.from({ length: 30 }, () => Math.floor(Math.random() * 50000) + 25000),
            profit: Array.from({ length: 30 }, () => Math.floor(Math.random() * 20000) + 10000)
        },
        last90days: {
            revenue: Array.from({ length: 90 }, () => Math.floor(Math.random() * 60000) + 20000),
            profit: Array.from({ length: 90 }, () => Math.floor(Math.random() * 25000) + 8000)
        }
    }

    const data = dataMap[period as keyof typeof dataMap] || dataMap.last7days
    basicMixedSeries.value[0].data = data.revenue
    basicMixedSeries.value[1].data = data.profit
}
</script>
<template>
    <n-card>
        <div class="chart-header">
            <h2 class="chart-title">Basic Mixed Chart</h2>
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
            <apexchart type="line" height="350" :options="basicMixedOptions" :series="basicMixedSeries" />
        </div>
    </n-card>
</template>
