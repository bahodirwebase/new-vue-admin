<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-container">
      <!-- Top Stats Row -->
      <div class="stats-row">
        <div class="stat-card stat-card-orange">
          <div class="stat-card-top">
            <div>
              <div class="stat-label">Total Sales</div>
              <div class="stat-value">$983,410</div>
            </div>
            <div class="stat-icon">
              <i class="ion ion-md-checkmark-circle-outline"></i>
            </div>
          </div>
          <div class="stat-change positive">+3.3% vs last week</div>
        </div>

        <div class="stat-card">
          <div class="stat-card-top">
            <div>
              <div class="stat-label">Total Orders</div>
              <div class="stat-value">58,375</div>
            </div>
            <div class="stat-icon">
              <i class="ion ion-md-cart"></i>
            </div>
          </div>
          <div class="stat-change negative">-2.89% vs last week</div>
        </div>

        <div class="stat-card">
          <div class="stat-card-top">
            <div>
              <div class="stat-label">Total Visitors</div>
              <div class="stat-value">237,782</div>
            </div>
            <div class="stat-icon">
              <i class="ion ion-md-person"></i>
            </div>
          </div>
          <div class="stat-change positive">+8.02% last week</div>
        </div>

        <!-- Top Categories -->
        <div class="chart-card-small">
          <div class="card-header">
            <h3>Top Categories</h3>
            <a href="#" class="see-all">See All</a>
          </div>
          <div id="topCategoriesChart" class="chart-small"></div>
          <div class="categories-list">
            <div class="category-item" v-for="cat in categories" :key="cat.id">
              <div class="category-color" :style="{ backgroundColor: cat.color }"></div>
              <div class="category-info">
                <span class="category-name">{{ cat.name }}</span>
                <span class="category-value">{{ cat.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Middle Row -->
      <div class="content-row">
        <!-- Revenue Analytics -->
        <div class="chart-card-large">
          <div class="card-header">
            <h3>Revenue Analytics</h3>
            <n-button type="primary" size="small" quaternary>
              <template #icon>
                <i class="ion ion-md-arrow-dropdown"></i>
              </template>
              Last 8 Days
            </n-button>
          </div>
          <div id="revenueChart" class="chart-container"></div>
        </div>

        <!-- Monthly Target -->
        <div class="chart-card-small">
          <div class="card-header">
            <h3>Monthly Target</h3>
            <i class="ion ion-md-more"></i>
          </div>
          <div id="monthlyTargetChart" class="chart-donut"></div>
          <div class="target-info">
            <p class="target-text">Great Progress! 🎉</p>
            <p class="target-desc">Our achievement increased by $200,000. let's reach 100% next month</p>
            <div class="target-stats">
              <div class="target-stat">
                <span class="target-label">Target</span>
                <span class="target-amount">$600,000</span>
              </div>
              <div class="target-stat">
                <span class="target-label">Revenue</span>
                <span class="target-amount">$510,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Row -->
      <div class="content-row">
        <!-- Active User & Conversion Rate -->
        <div class="chart-card-small">
          <div class="card-header">
            <h3>Active User</h3>
            <i class="ion ion-md-more"></i>
          </div>
          <div class="active-user-main">
            <div class="user-value">2,758</div>
            <div class="user-label">Users</div>
            <div class="user-change positive">+8.02% from last month</div>
          </div>
          <div id="activeUserChart" class="chart-small" style="margin-top: 24px;"></div>
        </div>

        <!-- Conversion Rate -->
        <div class="chart-card-small">
          <div class="card-header">
            <h3>Conversion Rate</h3>
            <n-button type="primary" size="small" quaternary>
              <template #icon>
                <i class="ion ion-md-arrow-dropdown"></i>
              </template>
              This Week
            </n-button>
          </div>
          <div id="conversionChart" class="chart-container-small"></div>
        </div>

        <!-- Traffic Sources -->
        <div class="chart-card-small">
          <div class="card-header">
            <h3>Traffic Sources</h3>
            <i class="ion ion-md-more"></i>
          </div>
          <div id="trafficChart" class="chart-small"></div>
          <div class="traffic-list">
            <div class="traffic-item" v-for="traffic in trafficSources" :key="traffic.id">
              <div class="traffic-color" :style="{ backgroundColor: traffic.color }"></div>
              <div class="traffic-info">
                <span class="traffic-name">{{ traffic.name }}</span>
                <span class="traffic-percent">{{ traffic.percent }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { NButton } from 'naive-ui'
import ApexCharts from 'apexcharts'

const categories = ref([
  { id: 1, name: 'Electronics', value: '$1,200,000', color: '#FF8C42' },
  { id: 2, name: 'Fashion', value: '$950,000', color: '#FFB366' },
  { id: 3, name: 'Home & Kitchen', value: '$750,000', color: '#FFD699' },
  { id: 4, name: 'Beauty & Personal Care', value: '$500,000', color: '#FFE6CC' }
])

const trafficSources = ref([
  { id: 1, name: 'Direct Traffic', percent: 40, color: '#FF8C42' },
  { id: 2, name: 'Organic Search', percent: 30, color: '#FFB366' },
  { id: 3, name: 'Social Media', percent: 15, color: '#FFD699' },
  { id: 4, name: 'Referral Traffic', percent: 10, color: '#FFDB99' },
  { id: 5, name: 'Email Campaigns', percent: 5, color: '#FFE6CC' }
])

onMounted(() => {
  initRevenueChart()
  initTopCategoriesChart()
  initMonthlyTargetChart()
  initActiveUserChart()
  initConversionChart()
  initTrafficChart()
})

const initRevenueChart = () => {
  const options = {
    chart: {
      type: 'area',
      height: 300,
      toolbar: { show: false },
      fontFamily: 'inherit'
    },
    colors: ['#FF8C42', '#FFB366'],
    stroke: { curve: 'smooth', width: 2 },
    fill: { type: 'gradient', gradient: { opacityFrom: 0.6, opacityTo: 0 } },
    series: [
      {
        name: 'Revenue',
        data: [10000, 12000, 11000, 13000, 14521, 13000, 12500, 15000]
      },
      {
        name: 'Order',
        data: [5000, 6000, 5500, 7000, 8000, 6500, 6000, 7500]
      }
    ],
    xaxis: {
      categories: ['12 Aug', '13 Aug', '14 Aug', '15 Aug', '16 Aug', '17 Aug', '18 Aug', '19 Aug'],
      labels: { style: { colors: '#999', fontSize: '12px' } }
    },
    yaxis: {
      labels: { style: { colors: '#999', fontSize: '12px' } }
    },
    grid: { borderColor: '#f0f0f0' },
    tooltip: { theme: 'light' },
    legend: { position: 'top' }
  }
  new ApexCharts(document.querySelector('#revenueChart'), options).render()
}

const initTopCategoriesChart = () => {
  const options = {
    chart: {
      type: 'donut',
      height: 200,
      toolbar: { show: false }
    },
    colors: ['#FF8C42', '#FFB366', '#FFD699', '#FFE6CC'],
    series: [1200000, 950000, 750000, 500000],
    labels: ['Electronics', 'Fashion', 'Home', 'Beauty'],
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            name: { fontSize: 11 },
            value: { fontSize: 14, fontWeight: 700, color: '#1a202c' },
            total: { show: true, label: 'Total Sales', fontSize: 12, color: '#999' }
          }
        }
      }
    },
    legend: { show: false }
  }
  new ApexCharts(document.querySelector('#topCategoriesChart'), options).render()
}

const initMonthlyTargetChart = () => {
  const options = {
    chart: {
      type: 'radialBar',
      height: 220,
      toolbar: { show: false }
    },
    colors: ['#FF8C42'],
    series: [85],
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: '#f0f0f0',
          strokeWidth: '100%',
          margin: 5
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: 12,
            color: '#999'
          },
          value: {
            show: true,
            fontSize: 32,
            fontWeight: 700,
            color: '#FF8C42'
          }
        }
      }
    },
    labels: ['Progress']
  }
  new ApexCharts(document.querySelector('#monthlyTargetChart'), options).render()
}

const initActiveUserChart = () => {
  const options = {
    chart: {
      type: 'bar',
      height: 200,
      toolbar: { show: false },
      stacked: true
    },
    colors: ['#FF8C42'],
    series: [
      {
        name: 'Users',
        data: [990, 661, 481, 429]
      }
    ],
    xaxis: {
      categories: ['United States (36%)', 'United Kingdom (24%)', 'Indonesia (17.5%)', 'Russia (15%)'],
      labels: { style: { fontSize: '12px' } }
    },
    grid: { show: false },
    legend: { show: false },
    tooltip: { theme: 'light' }
  }
  new ApexCharts(document.querySelector('#activeUserChart'), options).render()
}

const initConversionChart = () => {
  const options = {
    chart: {
      type: 'bar',
      height: 250,
      toolbar: { show: false }
    },
    colors: ['#FF8C42', '#FFB366', '#FFD699', '#FFDB99', '#FFE6CC', '#FFF0E6'],
    series: [
      { name: 'Product Cart', data: [25000] },
      { name: 'Add to Cart', data: [12000] },
      { name: 'Proceed to Checkout', data: [8500] },
      { name: 'Completed Purchases', data: [6200] },
      { name: 'Abandoned Carts', data: [3000] }
    ],
    xaxis: {
      categories: ['Conversion'],
      labels: { style: { fontSize: '12px' } }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%'
      }
    },
    dataLabels: { enabled: true, style: { fontSize: '11px' } },
    grid: { show: false },
    tooltip: { theme: 'light', shared: false }
  }
  new ApexCharts(document.querySelector('#conversionChart'), options).render()
}

const initTrafficChart = () => {
  const options = {
    chart: {
      type: 'bar',
      height: 200,
      toolbar: { show: false },
      stacked: true
    },
    colors: ['#FF8C42', '#FFB366', '#FFD699', '#FFDB99', '#FFE6CC'],
    series: [
      { name: 'Direct Traffic', data: [40] },
      { name: 'Organic Search', data: [30] },
      { name: 'Social Media', data: [15] },
      { name: 'Referral Traffic', data: [10] },
      { name: 'Email Campaigns', data: [5] }
    ],
    xaxis: {
      categories: ['Traffic']
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: '55%'
      }
    },
    dataLabels: { enabled: false },
    grid: { show: false },
    legend: { show: false },
    tooltip: { theme: 'light' }
  }
  new ApexCharts(document.querySelector('#trafficChart'), options).render()
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.dashboard-wrapper {
  background: linear-gradient(135deg, #f8f9fa 0%, #f0f2f5 100%);
  min-height: 100vh;
  padding: 24px;
}

.dashboard-container {
  max-width: 1600px;
  margin: 0 auto;
}

/* Stats Row */
.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-card-orange {
  background: linear-gradient(135deg, #FFF5E6 0%, #FFF9F0 100%);
}

.stat-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.stat-label {
  font-size: 12px;
  color: #999;
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #1a202c;
}

.stat-icon {
  width: 44px;
  height: 44px;
  background: #FF8C42;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
}

.stat-change {
  font-size: 12px;
  font-weight: 600;
}

.stat-change.positive {
  color: #4CAF50;
}

.stat-change.negative {
  color: #F44336;
}

/* Chart Cards */
.chart-card-large {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  grid-column: span 2;
}

.chart-card-small {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.card-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
}

.see-all {
  color: #FF8C42;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
}

.see-all:hover {
  text-decoration: underline;
}

.chart-container {
  min-height: 300px;
}

.chart-container-small {
  min-height: 250px;
}

.chart-small {
  min-height: 180px;
}

.chart-donut {
  min-height: 200px;
}

/* Categories List */
.categories-list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.category-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}

.category-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}

.category-name {
  font-size: 13px;
  color: #666;
}

.category-value {
  font-size: 13px;
  font-weight: 600;
  color: #1a202c;
}

/* Content Row */
.content-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

/* Active User */
.active-user-main {
  text-align: center;
  padding: 20px 0;
}

.user-value {
  font-size: 32px;
  font-weight: 700;
  color: #1a202c;
}

.user-label {
  font-size: 13px;
  color: #999;
  margin-top: 4px;
}

.user-change {
  font-size: 12px;
  color: #4CAF50;
  margin-top: 8px;
  font-weight: 600;
}

/* Target Info */
.target-info {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.target-text {
  font-size: 14px;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 8px;
}

.target-desc {
  font-size: 12px;
  color: #999;
  margin-bottom: 16px;
  line-height: 1.5;
}

.target-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.target-stat {
  background: #FFF5E6;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
}

.target-label {
  display: block;
  font-size: 11px;
  color: #999;
  margin-bottom: 4px;
}

.target-amount {
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: #FF8C42;
}

/* Traffic List */
.traffic-list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.traffic-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.traffic-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}

.traffic-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}

.traffic-name {
  font-size: 13px;
  color: #666;
}

.traffic-percent {
  font-size: 13px;
  font-weight: 600;
  color: #1a202c;
}

/* Responsive */
@media (max-width: 1200px) {
  .chart-card-large {
    grid-column: span 1;
  }

  .content-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .stats-row,
  .content-row {
    grid-template-columns: 1fr;
  }

  .dashboard-wrapper {
    padding: 12px;
  }

  .dashboard-container {
    max-width: 100%;
  }
}
</style>