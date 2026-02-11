<script lang="ts" setup>
import { ChevronDownOutline } from '@vicons/ionicons5';
import { computed, ref, toRef } from 'vue';
import { PERIOD_OPTIONS } from '../constants';
import VueApexCharts from 'vue3-apexcharts'
import { useThemeStore } from '@/stores/theme'
const apexchart = VueApexCharts

const themeStore = useThemeStore()
const isDark = toRef(themeStore, 'isDark')

// Period states
const areaColumnPeriod = ref('Last 7 Days')

const handleAreaColumnPeriodSelect = (key: string) => {
    const option = PERIOD_OPTIONS.find(opt => opt.key === key)
    if (option) {
        areaColumnPeriod.value = option.label
        updateAreaColumnData(key)
    }
}

// Area + Column Chart
const areaColumnSeries = ref([
  {
    name: 'Users',
    type: 'area',
    data: [2500, 2800, 2600, 3200, 3000, 3600, 3900]
  },
  {
    name: 'Sessions',
    type: 'column',
    data: [4500, 5200, 4800, 6100, 5800, 6700, 7200]
  }
])

const areaColumnOptions = computed(() => ({
  chart: {
    type: 'line' as const,
    height: 300,
    toolbar: { show: false },
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  colors: ['var(--primary-color)', '#f59e0b'],
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
    size: 5,
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
  yaxis: [
    {
      title: {
        text: 'Users',
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
        text: 'Sessions',
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
    }
  ],
  tooltip: {
    theme: isDark.value ? 'dark' : 'light',
    y: {
      formatter: function (value: number, opts: any) {
        if (opts.seriesIndex === 0) return value.toLocaleString()
        return value.toLocaleString()
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

const updateAreaColumnData = (period: string) => {
  const dataMap = {
    last7days: {
      users: [2500, 2800, 2600, 3200, 3000, 3600, 3900],
      sessions: [4500, 5200, 4800, 6100, 5800, 6700, 7200]
    },
    last14days: {
      users: Array.from({ length: 14 }, () => Math.floor(Math.random() * 2000) + 2000),
      sessions: Array.from({ length: 14 }, () => Math.floor(Math.random() * 3000) + 4000)
    }
  }
  
  const data = dataMap[period as keyof typeof dataMap] || dataMap.last7days
  areaColumnSeries.value[0].data = data.users
  areaColumnSeries.value[1].data = data.sessions
}
</script>
<template>
    <n-card>
        <div class="chart-header">
            <h2 class="chart-title">Area + Column Chart</h2>
            <n-dropdown :options="PERIOD_OPTIONS" @select="handleAreaColumnPeriodSelect" trigger="click">
                <n-button class="period-button" type="primary" strong size="small">
                    {{ areaColumnPeriod }}
                    <template #icon>
                        <n-icon :component="ChevronDownOutline" />
                    </template>
                </n-button>
            </n-dropdown>
        </div>
        <div class="chart-container">
            <apexchart type="line" height="300" :options="areaColumnOptions" :series="areaColumnSeries" />
        </div>
    </n-card>
</template>
