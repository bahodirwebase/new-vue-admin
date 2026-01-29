<script lang="ts" setup>
import { computed, ref } from 'vue';
import { PERIOD_OPTIONS } from '../constants';
import { ChevronDownOutline } from '@vicons/ionicons5';

import VueApexCharts from 'vue3-apexcharts'
const apexchart = VueApexCharts

// Period states
const multiYPeriod = ref('Last 7 Days')

const handleMultiYPeriodSelect = (key: string) => {
    const option = PERIOD_OPTIONS.find(opt => opt.key === key)
    if (option) {
        multiYPeriod.value = option.label
        updateMultiYData(key)
    }
}
// Multiple Y-Axes Chart
const multiYSeries = ref([
    {
        name: 'Revenue',
        type: 'column',
        data: [45000, 52000, 48000, 61000, 58000, 67000, 72000]
    },
    {
        name: 'Profit Margin',
        type: 'line',
        data: [25, 28, 22, 32, 30, 35, 38]
    },
    {
        name: 'Growth Rate',
        type: 'area',
        data: [5, 8, 6, 12, 10, 15, 18]
    }
])

const multiYOptions = computed(() => ({
    chart: {
        type: 'line' as const,
        height: 350,
        toolbar: { show: false },
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    },
    colors: ['var(--primary-color)', '#22c55e', '#f59e0b'],
    stroke: {
        curve: 'smooth' as const,
        width: 3
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
        size: [0, 5, 5],
        colors: ['#22c55e', '#f59e0b'],
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
    yaxis: [
        {
            title: {
                text: 'Revenue ($)',
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
                    return '$' + (value / 1000) + 'K'
                }
            }
        },
        {
            opposite: true,
            title: {
                text: 'Profit Margin (%)',
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
        {
            opposite: true,
            title: {
                text: 'Growth Rate (%)',
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
        }
    ],
    tooltip: {
        y: {
            formatter: function (value: number, opts: any) {
                if (opts.seriesIndex === 0) return '$' + value.toLocaleString()
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
    }
}))

const updateMultiYData = (period: string) => {
  const dataMap = {
    last7days: {
      revenue: [45000, 52000, 48000, 61000, 58000, 67000, 72000],
      profit: [25, 28, 22, 32, 30, 35, 38],
      growth: [5, 8, 6, 12, 10, 15, 18]
    },
    last14days: {
      revenue: Array.from({ length: 14 }, () => Math.floor(Math.random() * 30000) + 40000),
      profit: Array.from({ length: 14 }, () => Math.floor(Math.random() * 20) + 20),
      growth: Array.from({ length: 14 }, () => Math.floor(Math.random() * 15) + 5)
    }
  }
  
  const data = dataMap[period as keyof typeof dataMap] || dataMap.last7days
  multiYSeries.value[0].data = data.revenue
  multiYSeries.value[1].data = data.profit
  multiYSeries.value[2].data = data.growth
}
</script>
<template>
    <n-card>
        <div class="chart-header">
            <h2 class="chart-title">Multiple Y-Axes Chart</h2>
            <n-dropdown :options="PERIOD_OPTIONS" @select="handleMultiYPeriodSelect" trigger="click">
                <n-button class="period-button" type="primary" strong size="small">
                    {{ multiYPeriod }}
                    <template #icon>
                        <n-icon :component="ChevronDownOutline" />
                    </template>
                </n-button>
            </n-dropdown>
        </div>
        <div class="chart-container">
            <apexchart type="line" height="350" :options="multiYOptions" :series="multiYSeries" />
        </div>
    </n-card>
</template>
