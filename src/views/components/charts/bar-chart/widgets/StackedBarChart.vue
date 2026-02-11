<script lang="ts" setup>
import { ChevronDownOutline } from '@vicons/ionicons5';
import { computed, ref, toRef, watch } from 'vue';
import { PERIOD_OPTIONS } from '../constants';
import VueApexCharts from 'vue3-apexcharts'
import { useThemeStore } from '@/stores/theme'
const apexchart = VueApexCharts

const themeStore = useThemeStore()
const isDark = toRef(themeStore, 'isDark')

// Period states
const stackedPeriod = ref('Last 7 Days')

const handleStackedPeriodSelect = (key: string) => {
    const option = PERIOD_OPTIONS.find(opt => opt.key === key)
    if (option) {
        stackedPeriod.value = option.label
        updateStackedData(key)
    }
}

// Stacked Bar Chart
const stackedSeries = ref([
  {
    name: 'Product A',
    data: [44000, 55000, 41000, 67000, 22000, 43000, 21000]
  },
  {
    name: 'Product B',
    data: [33000, 41000, 62000, 33000, 56000, 33000, 81000]
  },
  {
    name: 'Product C',
    data: [12000, 15000, 18000, 25000, 32000, 28000, 35000]
  }
])

const stackedChartOptions = computed(() => ({
  chart: {
    type: 'bar' as const,
    height: 300,
    stacked: true,
    toolbar: { show: false },
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  colors: ['var(--primary-color)', '#22c55e', '#f59e0b'],
  plotOptions: {
    bar: {
      borderRadius: 8,
      horizontal: false,
      columnWidth: '80%'
    }
  },
  grid: {
    borderColor: '#f0f0f0',
    strokeDashArray: 0,
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } }
  },
  dataLabels: { enabled: false },
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

const updateStackedData = (period: string) => {
  const dataMap = {
    last7days: [
      [44000, 55000, 41000, 67000, 22000, 43000, 21000],
      [33000, 41000, 62000, 33000, 56000, 33000, 81000],
      [12000, 15000, 18000, 25000, 32000, 28000, 35000]
    ],
    last14days: [
      Array.from({ length: 14 }, () => Math.floor(Math.random() * 40000) + 20000),
      Array.from({ length: 14 }, () => Math.floor(Math.random() * 35000) + 15000),
      Array.from({ length: 14 }, () => Math.floor(Math.random() * 25000) + 10000)
    ]
  }
  
  const data = dataMap[period as keyof typeof dataMap] || dataMap.last7days
  stackedSeries.value[0].data = data[0]
  stackedSeries.value[1].data = data[1]
  stackedSeries.value[2].data = data[2]
}

// Watch theme changes for tooltip
watch(isDark, () => {
    // Tooltip theme computed option orqali avtomatik yangilanadi
})
</script>
<template>
    <n-card>
        <div class="chart-header">
            <h2 class="chart-title">Stacked Bar Chart</h2>
            <n-dropdown :options="PERIOD_OPTIONS" @select="handleStackedPeriodSelect" trigger="click">
                <n-button class="period-button" type="primary" strong size="small">
                    {{ stackedPeriod }}
                    <template #icon>
                        <n-icon :component="ChevronDownOutline" />
                    </template>
                </n-button>
            </n-dropdown>
        </div>
        <div class="chart-container">
            <apexchart type="bar" height="300" :options="stackedChartOptions" :series="stackedSeries" />
        </div>
    </n-card>
</template>