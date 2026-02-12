<script setup lang="ts">
import { ref, computed } from 'vue'
import { NButton, NDropdown, NIcon } from 'naive-ui'
import { ChevronDownOutline } from '@vicons/ionicons5'
import VueApexCharts from 'vue3-apexcharts'

const apexchart = VueApexCharts

interface Stat {
  label: string
  value: number
  trend: number
}

const selectedPeriod = ref('This Week')

const periodOptions = [
  { label: 'Today', key: 'today' },
  { label: 'This Week', key: 'thisweek' },
  { label: 'This Month', key: 'thismonth' },
  { label: 'This Year', key: 'thisyear' }
]

const handlePeriodSelect = (key: string) => {
  const option = periodOptions.find(opt => opt.key === key)
  if (option) {
    selectedPeriod.value = option.label
  }
}

const stats = ref<Stat[]>([
  { label: 'Product Views', value: 25000, trend: 9 },
  { label: 'Add to Cart', value: 12000, trend: 6 },
  { label: 'Proceed to Checkout', value: 8500, trend: 4 },
  { label: 'Completed Purchases', value: 6200, trend: 7 },
  { label: 'Abandoned Carts', value: 3000, trend: -5 }
])

const series = computed(() => [{
  name: 'Conversion',
  data: stats.value.map(stat => stat.value)
}])

const chartOptions = computed(() => ({
  chart: {
    type: 'bar',
    toolbar: {
      show: false
    },
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '100%',
      distributed: true,
      borderRadius: 8,
      borderRadiusApplication: 'end',
      dataLabels: {
        position: 'top'
      }
    }
  },
  colors: ['var(--primary-color-800)', 'var(--primary-color-600)', 'var(--primary-color-400)', 'var(--primary-color-200)', 'var(--primary-color)'],
  dataLabels: {
    enabled: false
  },
  legend: {
    show: false
  },
  grid: {
    show: false,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  },
  xaxis: {
    categories: stats.value.map(stat => stat.label),
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: false
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: function (val: number) {
        return val.toLocaleString()
      }
    },
    style: {
      fontSize: '13px'
    }
  },
  states: {
    hover: {
      filter: {
        type: 'lighten',
        value: 0.1
      }
    }
  }
}))
</script>

<template>
  <n-card>
    <div class="conversion-rate__header">
      <h2 class="conversion-rate__title">Convertion Rate</h2>
      <n-dropdown :options="periodOptions" @select="handlePeriodSelect" trigger="click">
        <n-button class="period-button" type="primary" strong>
          {{ selectedPeriod }}
          <template #icon>
            <n-icon :component="ChevronDownOutline" />
          </template>
        </n-button>
      </n-dropdown>
    </div>

    <div class="conversion-rate__stats">
      <div v-for="stat in stats" :key="stat.label" class="stat-box">
        <div class="stat-box__header">
          <span class="stat-box__label">{{ stat.label }}</span>
        </div>
        <div class="stat-box__value">{{ stat.value.toLocaleString() }}</div>
        <div class="stat-box__trend"
          :class="stat.trend >= 0 ? 'stat-box__trend--positive' : 'stat-box__trend--negative'">
          {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
        </div>
      </div>
    </div>

    <div class="conversion-rate__chart">
      <apexchart type="bar" height="200" :options="(chartOptions as any)" :series="series" />
    </div>
  </n-card>
</template>

<style scoped>
.conversion-rate__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.conversion-rate__title {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

.period-button {
  border-radius: 8px;
  height: 40px;
  padding: 0 16px;
  font-weight: 600;
  font-size: 14px;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-600) 100%);
  border: none !important;
  box-shadow: 0 2px 8px var(--primary-color-600);
  transition: all 0.3s ease;
}

.period-button:hover {
  box-shadow: 0 4px 12px var(--primary-color-600);
  transform: translateY(-1px);
}

.conversion-rate__stats {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-box__header {
  min-height: 36px;
  display: flex;
  align-items: flex-start;
}

.stat-box__label {
  font-size: 12px;
  color: #999999;
  font-weight: 400;
  line-height: 1.4;
}

.stat-box__value {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.stat-box__trend {
  font-size: 13px;
  font-weight: 600;
}

.stat-box__trend--positive {
  color: #22c55e;
}

.stat-box__trend--negative {
  color: #ef4444;
}

.conversion-rate__chart {
  margin: 0 -12px;
  border-radius: 12px;
  padding: 16px 12px 8px 12px;
}

/* ApexCharts customization */
:deep(.apexcharts-bar-area) {
  transition: all 0.3s ease;
}

/* Responsive */
@media (max-width: 1200px) {
  .conversion-rate__stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .conversion-rate {
    padding: 20px;
  }

  .conversion-rate__header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .conversion-rate__title {
    font-size: 18px;
  }

  .conversion-rate__stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .stat-box__value {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .conversion-rate__stats {
    grid-template-columns: 1fr;
  }
}
</style>