<template>
  <div class="traffic-sources">
    <div class="traffic-sources__header">
      <h2 class="traffic-sources__title">Traffic Sources</h2>
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

    <div class="traffic-sources__chart">
      <apexchart
        :type="('treemap' as any)"
        height="80"
        :options="(chartOptions as any)"
        :series="series"
      />
    </div>

    <div class="traffic-sources__legend">
      <div 
        v-for="(source, index) in trafficSources" 
        :key="source.name"
        class="legend-item"
      >
        <div class="legend-item__info">
          <span 
            class="legend-item__color"
            :style="{ backgroundColor: colors[index] }"
          ></span>
          <span class="legend-item__name">{{ source.name }}</span>
        </div>
        <span class="legend-item__percentage">{{ source.percentage }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { NButton, NDropdown, NIcon } from 'naive-ui'
import { EllipsisHorizontalOutline } from '@vicons/ionicons5'
import VueApexCharts from 'vue3-apexcharts'

const apexchart = VueApexCharts

interface TrafficSource {
  name: string
  percentage: number
}

const trafficSources = ref<TrafficSource[]>([
  { name: 'Direct Traffic', percentage: 40 },
  { name: 'Organic Search', percentage: 30 },
  { name: 'Social Media', percentage: 15 },
  { name: 'Referral Traffic', percentage: 10 },
  { name: 'Email Campaigns', percentage: 5 }
])

const colors = ['#ffe0c2', '#ffd9b3', '#ffca99', '#ffb366', '#ff8c1a']

const menuOptions = [
  { label: 'View Details', key: 'details' },
  { label: 'Export Data', key: 'export' },
  { label: 'Settings', key: 'settings' }
]

const handleMenuSelect = (key: string) => {
  console.log('Menu selected:', key)
}

const series = computed(() => [{
  data: trafficSources.value.map((source, index) => ({
    x: source.name,
    y: source.percentage,
    fillColor: colors[index]
  }))
}])

const chartOptions = computed(() => ({
  chart: {
    type: 'treemap' as const,
    toolbar: {
      show: false
    },
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  legend: {
    show: false
  },
  dataLabels: {
    enabled: false
  },
  plotOptions: {
    treemap: {
      distributed: true,
      enableShades: false,
      borderRadius: 8,
      dataLabels: {
        format: 'truncate'
      }
    }
  },
  colors: colors,
  tooltip: {
    enabled: true,
    y: {
      formatter: function(val: number) {
        return val + '%'
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

<style scoped>
.traffic-sources {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  max-width: 520px;
}

.traffic-sources__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.traffic-sources__title {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.menu-button {
  color: #999999;
  padding: 4px;
  transition: color 0.3s ease;
}

.menu-button:hover {
  color: #666666;
}

.traffic-sources__chart {
  margin: 0 -8px 24px -8px;
  background: #fafafa;
  border-radius: 12px;
  padding: 12px 8px;
}

.traffic-sources__legend {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.legend-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
  transition: all 0.3s ease;
}

.legend-item:last-child {
  border-bottom: none;
}

.legend-item:hover {
  padding-left: 8px;
  background: linear-gradient(90deg, #fff5eb 0%, transparent 100%);
  margin: 0 -8px;
  padding-left: 16px;
  padding-right: 8px;
  border-radius: 8px;
}

.legend-item__info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.legend-item__color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  display: block;
  flex-shrink: 0;
}

.legend-item__name {
  font-size: 14px;
  color: #666666;
  font-weight: 400;
}

.legend-item__percentage {
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
}

/* ApexCharts customization */
:deep(.apexcharts-treemap) {
  cursor: pointer;
}

:deep(.apexcharts-treemap-rect) {
  transition: all 0.3s ease;
}

/* Responsive */
@media (max-width: 480px) {
  .traffic-sources {
    padding: 20px;
  }

  .traffic-sources__title {
    font-size: 18px;
  }

  .traffic-sources__chart {
    margin-bottom: 20px;
  }

  .legend-item {
    padding: 10px 0;
  }

  .legend-item__name {
    font-size: 13px;
  }

  .legend-item__percentage {
    font-size: 15px;
  }
}
</style>