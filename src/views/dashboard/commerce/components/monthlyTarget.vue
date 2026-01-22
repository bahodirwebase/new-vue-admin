<template>
  <div class="monthly-target">
    <div class="monthly-target__header">
      <h2 class="monthly-target__title">Monthly Target</h2>
      <n-dropdown
        :options="menuOptions"
        @select="handleMenuSelect"
        trigger="click"
      >
        <n-button text class="menu-button">
          <n-icon :size="20" :component="EllipsisHorizontalOutline" />
        </n-button>
      </n-dropdown>
    </div>

    <div class="monthly-target__chart">
      <apexchart
        type="radialBar"
        height="280"
        :options="(chartOptions as any)"
        :series="[85]"
      />
    </div>

    <div class="monthly-target__info">
      <div class="progress-info">
        <span class="progress-info__trend">+8.02%</span>
        <span class="progress-info__period">from last month</span>
      </div>

      <div class="achievement">
        <h3 class="achievement__title">Great Progress! 🎉</h3>
        <p class="achievement__description">
          Our achievement increased by <span class="achievement__amount">$200,000</span>,
          let's reach 100% next month.
        </p>
      </div>

      <div class="stats-grid">
        <div class="stat-box stat-box--target">
          <span class="stat-box__label">Target</span>
          <span class="stat-box__value">$600,000</span>
        </div>
        <div class="stat-box stat-box--revenue">
          <span class="stat-box__label">Revenue</span>
          <span class="stat-box__value">$510,000</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {  computed } from 'vue'
import { NButton, NDropdown, NIcon } from 'naive-ui'
import { EllipsisHorizontalOutline } from '@vicons/ionicons5'
import VueApexCharts from 'vue3-apexcharts'

const apexchart = VueApexCharts

const menuOptions = [
  {
    label: 'View Details',
    key: 'details'
  },
  {
    label: 'Export Report',
    key: 'export'
  },
  {
    label: 'Settings',
    key: 'settings'
  }
]

const handleMenuSelect = (key: string) => {
  console.log('Menu selected:', key)
}

const chartOptions = computed(() => ({
  chart: {
    type: 'radialBar',
    offsetY: -10,
    sparkline: {
      enabled: false
    }
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      track: {
        background: '#ffe8d1',
        strokeWidth: '100%',
        margin: 5
      },
      hollow: {
        size: '70%',
        position: 'front'
      },
      dataLabels: {
        name: {
          show: false
        },
        value: {
          offsetY: -5,
          fontSize: '48px',
          fontWeight: 700,
          color: 'var(--text-secondary)',
          formatter: function (val: number) {
            return val + '%'
          }
        }
      }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'horizontal',
      shadeIntensity: 0.5,
      gradientToColors: ['var(--primary-color)'],
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100]
    }
  },
  colors: ['var(--primary-color)'],
  stroke: {
    lineCap: 'round'
  },
  labels: ['Progress']
}))
</script>

<style scoped>
.monthly-target {
  background: var(--bg-primary);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  max-width: 450px;
}

.monthly-target__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.monthly-target__title {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

.menu-button {
  color: #999999;
  padding: 4px;
  transition: color 0.3s ease;
}

.menu-button:hover {
  color: var(--text-secondary);
}

.monthly-target__chart {
  margin: 0 -12px;
}

.monthly-target__info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-top: -40px;
}

.progress-info {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}

.progress-info__trend {
  color: #22c55e;
  font-weight: 600;
}

.progress-info__period {
  color: #999999;
  font-weight: 400;
}

.achievement {
  text-align: center;
  padding: 0 16px;
}

.achievement__title {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.achievement__description {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

.achievement__amount {
  color: #ff8c1a;
  font-weight: 600;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.stat-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px 16px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.stat-box--target {
  background: linear-gradient(135deg, #fff5eb 0%, #ffe8d1 100%);
}

.stat-box--revenue {
  background: linear-gradient(135deg, #fff5eb 0%, #ffe8d1 100%);
}

.stat-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 140, 26, 0.15);
}

.stat-box__label {
  font-size: 13px;
  color: #999999;
  font-weight: 500;
  text-align: center;
}

.stat-box__value {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
}

/* ApexCharts customization */
:deep(.apexcharts-text) {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Responsive */
@media (max-width: 480px) {
  .monthly-target {
    padding: 20px;
  }

  .monthly-target__title {
    font-size: 18px;
  }

  .achievement__title {
    font-size: 16px;
  }

  .achievement__description {
    font-size: 13px;
  }

  .stat-box {
    padding: 16px 12px;
  }

  .stat-box__value {
    font-size: 18px;
  }
}
</style>