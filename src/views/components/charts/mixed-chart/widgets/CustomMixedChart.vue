<script lang="ts" setup>
import { computed, ref, toRef } from 'vue';
import { PERIOD_OPTIONS } from '../constants';
import { ChevronDownOutline } from '@vicons/ionicons5';
import VueApexCharts from 'vue3-apexcharts'
import { useThemeStore } from '@/stores/theme'
const apexchart = VueApexCharts

const themeStore = useThemeStore()
const isDark = toRef(themeStore, 'isDark')

// Period states
const customPeriod = ref('Last 7 Days')

const handleCustomPeriodSelect = (key: string) => {
    const option = PERIOD_OPTIONS.find(opt => opt.key === key)
    if (option) {
        customPeriod.value = option.label
        updateCustomData(key)
    }
}
// Custom Mixed Chart
const customSeries = ref([
    {
        name: 'Target',
        type: 'line',
        data: [100, 100, 100, 100, 100, 100, 100]
    },
    {
        name: 'Actual',
        type: 'area',
        data: [85, 92, 88, 95, 98, 102, 105]
    },
    {
        name: 'Minimum',
        type: 'line',
        data: [70, 70, 70, 70, 70, 70, 70]
    }
])

const customOptions = computed(() => ({
    chart: {
        type: 'line' as const,
        height: 300,
        toolbar: { show: false },
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    },
    colors: ['#ef4444', 'var(--primary-color)', '#f59e0b'],
    stroke: {
        curve: 'smooth' as const,
        width: [3, 3, 2],
        dashArray: [0, 0, 5]
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.1,
            stops: [0, 90, 100]
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
        size: [0, 5, 0],
        colors: ['var(--primary-color)'],
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
        title: {
            text: 'Performance (%)',
            style: {
                color: '#999999',
                fontSize: '12px'
            }
        },
        labels: {
            style: {
                colors: '#999999',
                fontSize: '12px',
                fontWeight: 400
            },
            formatter: function (value: number) {
                return value + '%'
            }
        }
    },
    tooltip: {
        theme: isDark.value ? 'dark' : 'light',
        y: {
            formatter: function (value: number) {
                return value + '%'
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
    },
    annotations: {
        yaxis: [
            {
                y: 100,
                borderColor: '#ef4444',
                borderWidth: 2,
                strokeDashArray: 0,
                label: {
                    borderColor: '#ef4444',
                    style: {
                        color: '#fff',
                        background: '#ef4444'
                    },
                    text: 'Target',
                    position: 'left' as const
                }
            },
            {
                y: 70,
                borderColor: '#f59e0b',
                borderWidth: 2,
                strokeDashArray: 5,
                label: {
                    borderColor: '#f59e0b',
                    style: {
                        color: '#fff',
                        background: '#f59e0b'
                    },
                    text: 'Minimum',
                    position: 'left' as const
                }
            }
        ]
    }
}))

const updateCustomData = (period: string) => {
  const dataMap = {
    last7days: {
      target: [100, 100, 100, 100, 100, 100, 100],
      actual: [85, 92, 88, 95, 98, 102, 105],
      minimum: [70, 70, 70, 70, 70, 70, 70]
    },
    last14days: {
      target: Array.from({ length: 14 }, () => 100),
      actual: Array.from({ length: 14 }, () => Math.floor(Math.random() * 30) + 80),
      minimum: Array.from({ length: 14 }, () => 70)
    }
  }
  
  const data = dataMap[period as keyof typeof dataMap] || dataMap.last7days
  customSeries.value[0].data = data.target
  customSeries.value[1].data = data.actual
  customSeries.value[2].data = data.minimum
}
</script>
<template>
    <n-card>
        <div class="chart-header">
            <h2 class="chart-title">Custom Mixed Chart</h2>
            <n-dropdown :options="PERIOD_OPTIONS" @select="handleCustomPeriodSelect" trigger="click">
                <n-button class="period-button" type="primary" strong size="small">
                    {{ customPeriod }}
                    <template #icon>
                        <n-icon :component="ChevronDownOutline" />
                    </template>
                </n-button>
            </n-dropdown>
        </div>
        <div class="chart-container">
            <apexchart type="line" height="300" :options="customOptions" :series="customSeries" />
        </div>
    </n-card>
</template>
