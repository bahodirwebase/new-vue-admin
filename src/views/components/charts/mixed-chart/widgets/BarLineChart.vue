<script lang="ts" setup>
import { computed, ref } from 'vue';
import { PERIOD_OPTIONS } from '../constants';
import { ChevronDownOutline } from '@vicons/ionicons5';

import VueApexCharts from 'vue3-apexcharts'
const apexchart = VueApexCharts

// Period states
const barLinePeriod = ref('Last 7 Days')

// Bar + Line Chart
const barLineSeries = ref([
    {
        name: 'Sales',
        type: 'column',
        data: [120, 135, 125, 155, 145, 175, 185]
    },
    {
        name: 'Revenue',
        type: 'line',
        data: [45000, 52000, 48000, 61000, 58000, 67000, 72000]
    }
])

const barLineOptions = computed(() => ({
    chart: {
        type: 'line' as const,
        height: 300,
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
    yaxis: [
        {
            title: {
                text: 'Sales',
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
                }
            }
        },
        {
            opposite: true,
            title: {
                text: 'Revenue',
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
        }
    ],
    tooltip: {
        y: {
            formatter: function (value: number, opts: any) {
                if (opts.seriesIndex === 0) return value.toLocaleString()
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

const handleBarLinePeriodSelect = (key: string) => {
  const option = PERIOD_OPTIONS.find(opt => opt.key === key)
  if (option) {
    barLinePeriod.value = option.label
    updateBarLineData(key)
  }
}

const updateBarLineData = (period: string) => {
  const dataMap = {
    last7days: {
      sales: [120, 135, 125, 155, 145, 175, 185],
      revenue: [45000, 52000, 48000, 61000, 58000, 67000, 72000]
    },
    last14days: {
      sales: Array.from({ length: 14 }, () => Math.floor(Math.random() * 100) + 80),
      revenue: Array.from({ length: 14 }, () => Math.floor(Math.random() * 30000) + 40000)
    }
  }
  
  const data = dataMap[period as keyof typeof dataMap] || dataMap.last7days
  barLineSeries.value[0].data = data.sales
  barLineSeries.value[1].data = data.revenue
}
</script>
<template>
    <n-card>
        <div class="chart-header">
            <h2 class="chart-title">Bar + Line Chart</h2>
            <n-dropdown :options="PERIOD_OPTIONS" @select="handleBarLinePeriodSelect" trigger="click">
                <n-button class="period-button" type="primary" strong size="small">
                    {{ barLinePeriod }}
                    <template #icon>
                        <n-icon :component="ChevronDownOutline" />
                    </template>
                </n-button>
            </n-dropdown>
        </div>
        <div class="chart-container">
            <apexchart type="line" height="300" :options="barLineOptions" :series="barLineSeries" />
        </div>
    </n-card>
</template>
