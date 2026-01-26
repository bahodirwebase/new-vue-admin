<template>
  <n-card>
    <div class="top-categories__header">
      <h2 class="top-categories__title">Top Categories</h2>
      <n-button text class="see-all-button" @click="handleSeeAll">
        See All
      </n-button>
    </div>

    <div class="top-categories__chart">
      <apexchart
        type="donut"
        height="320"
        :options="(chartOptions as any)"
        :series="series"
      />
    </div>

    <div class="top-categories__legend">
      <div 
        v-for="(category, index) in categories" 
        :key="category.name"
        class="category-item"
      >
        <div class="category-item__info">
          <span 
            class="category-item__color"
            :style="{ backgroundColor: colors[index] }"
          ></span>
          <span class="category-item__name">{{ category.name }}</span>
        </div>
        <span class="category-item__value">{{ formatCurrency(category.value) }}</span>
      </div>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { NButton } from 'naive-ui'
import VueApexCharts from 'vue3-apexcharts'

const apexchart = VueApexCharts

interface Category {
  name: string
  value: number
}

const categories = ref<Category[]>([
  { name: 'Electronics', value: 1200000 },
  { name: 'Fashion', value: 950000 },
  { name: 'Home & Kitchen', value: 750000 },
  { name: 'Beauty & Personal Care', value: 500000 }
])

const colors = ['var(--primary-color)', 'var(--primary-color-800)', 'var(--primary-color-500)', 'var(--primary-color-300)']

const series = computed(() => categories.value.map(cat => cat.value))

const totalSales = computed(() => {
  return categories.value.reduce((sum, cat) => sum + cat.value, 0)
})

const chartOptions = computed(() => ({
  chart: {
    type: 'donut',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  colors: colors,
  labels: categories.value.map(cat => cat.name),
  dataLabels: {
    enabled: false
  },
  plotOptions: {
    pie: {
      donut: {
        size: '75%',
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: '14px',
            fontWeight: 400,
            color: '#999999',
            offsetY: -10
          },
          value: {
            show: true,
            fontSize: '28px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            offsetY: 10,
            formatter: function (val: any) {
              return '$' + Number(val).toLocaleString()
            }
          },
          total: {
            show: true,
            label: 'Total Sales',
            fontSize: '14px',
            fontWeight: 400,
            color: '#999999',
            formatter: function () {
              return '$' + totalSales.value.toLocaleString()
            }
          }
        }
      }
    }
  },
  stroke: {
    width: 0
  },
  legend: {
    show: false
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: function(val: number) {
        return '$' + val.toLocaleString()
      }
    },
    style: {
      fontSize: '13px',
      fontFamily: 'Inter, sans-serif'
    }
  },
  states: {
    hover: {
      filter: {
        type: 'lighten',
        value: 0.1
      }
    },
    active: {
      filter: {
        type: 'darken',
        value: 0.1
      }
    }
  }
}))

const formatCurrency = (value: number) => {
  return '$' + value.toLocaleString()
}

const handleSeeAll = () => {
  console.log('See all categories clicked')
}
</script>

<style scoped>


.top-categories__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.top-categories__title {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

.see-all-button {
  color: #999999;
  font-size: 14px;
  font-weight: 500;
  padding: 0;
  transition: color 0.3s ease;
}

.see-all-button:hover {
  color: var(--primary-color);
}

.top-categories__chart {
  margin: 0 -8px 24px -8px;
}

.top-categories__legend {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.category-item:last-child {
  border-bottom: none;
}

.category-item:hover {
  padding-left: 8px;
  background: linear-gradient(90deg, var(--primary-color-900) 0%, transparent 100%);
  margin: 0 -8px;
  padding-left: 16px;
  padding-right: 8px;
}

.category-item__info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.category-item__color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  display: block;
  flex-shrink: 0;
}

.category-item__name {
  font-size: 14px;
  color: #666666;
  font-weight: 400;
}

.category-item__value {
  font-size: 15px;
  font-weight: 600;
}


:deep(.apexcharts-datalabel-label) {
  fill: #999999 !important;
}


/* Responsive */
@media (max-width: 480px) {
  .top-categories {
    padding: 20px;
  }

  .top-categories__title {
    font-size: 18px;
  }

  .category-item {
    padding: 10px 0;
  }

  .category-item__name {
    font-size: 13px;
  }

  .category-item__value {
    font-size: 14px;
  }
}
</style>