<template>

  <div class="analytical-page">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Analytical Dashboard</h1>
        <p class="page-subtitle">Detailed analytics and insights</p>
      </div>
      <n-grid y-gap="18" x-gap="18" :cols="6">
        <n-gi v-for="value in 6" :key="value">
          <statistics />
        </n-gi>
      </n-grid>
      <n-grid x-gap="18" y-gap="18" cols="2">
        <n-gi>
          <n-grid y-gap="18" x-gap="18" :cols="2">
            <n-gi>
              <n-card>
                <div class="card-header">
                  <h3>Users</h3>
                  <div>
                    <n-icon :component="TrendingUpOutline" size="18" color="var(--color-success)"></n-icon>
                    <span class="custom-badge bg-success">+12.5%</span>
                  </div>
                </div>
                <h1>28.05k</h1>
                <div class="chart-wrapper">
                  <apexchart type="area" height="150" :options="(chartOptions as ApexOptions)" :series="series">
                  </apexchart>
                </div>
              </n-card>
            </n-gi>
            <n-gi>
              <n-card>
                <div class="card-header">
                  <h3>Sessions</h3>
                  <div>
                    <n-icon :component="TrendingUpOutline" size="18" color="var(--color-success)"></n-icon>
                    <span class="custom-badge bg-success">+12.5%</span>
                  </div>
                </div>
                <h1>97.66k</h1>
                <div class="chart-wrapper">
                  <apexchart type="area" height="150" :options="(chartOptions as ApexOptions)" :series="series">
                  </apexchart>
                </div>
              </n-card>
            </n-gi>
            <n-gi>
              <n-card>
                <div class="card-header">
                  <h3>Av. Visit Duration</h3>
                  <div>
                    <n-icon :component="TrendingDownOutline" size="18" color="var(--color-error)"></n-icon>
                    <span class="custom-badge bg-error">-5.2%</span>
                  </div>
                </div>
                <h1>3m 40ses</h1>
                <div class="chart-wrapper">
                  <apexchart type="area" height="150" :options="(chartOptions3 as ApexOptions)" :series="series3">
                  </apexchart>
                </div>
              </n-card>
            </n-gi>
            <n-gi>
              <n-card>
                <div class="card-header">
                  <h3>Bounce rate</h3>
                  <div>
                    <n-icon :component="TrendingUpOutline" size="18" color="var(--color-success)"></n-icon>
                    <span class="custom-badge bg-success">+12.5%</span>
                  </div>
                </div>
                <h1>33.48%</h1>
                <div class="chart-wrapper">
                  <apexchart type="area" height="150" :options="(chartOptions as ApexOptions)" :series="series">
                  </apexchart>
                </div>
              </n-card>
            </n-gi>
          </n-grid>
        </n-gi>
        <n-gi>
          <lineChart />
        </n-gi>
      </n-grid>
      <n-grid y-gap="18" x-gap="18" :cols="4">
        <n-gi>
          <latestLeads />
        </n-gi>
        <n-gi>
          <browserUsage />
        </n-gi>
        <n-gi :span="2">
          <customerTransaction />
        </n-gi>
      </n-grid>

    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import VueApexCharts from "vue3-apexcharts";
import type { ApexOptions } from "apexcharts";
import statistics from "./components/statistics.vue";
import latestLeads from "./components/latestLeads.vue";
import lineChart from "./components/lineChart.vue";
import { TrendingDownOutline, TrendingUpOutline } from "@vicons/ionicons5";
import customerTransaction from "./components/customerTransaction.vue";
import browserUsage from "./components/browserUsage.vue";

const apexchart = VueApexCharts;


const series = ref([
  {
    name: "Revenue",
    data: [31, 0, 32, 90, 120, 51, 42, 109, 100, 40, 35],
  },
]);

const series3 = ref([
  {
    name: "Revenue",
    data: [31, 0, 32, 90, 120, 51, 42, 109, 100, 40, 35],
  },
]);


const chartOptions = ref<ApexOptions>({
  chart: {
    toolbar: { show: false }, // Ortiqcha tugmalarni o'chirish
    sparkline: { enabled: false }, // Card ichiga to'liq sig'ishi uchun
    dropShadow: {
      enabled: true,
      top: 10,
      left: 0,
      blur: 4,
      color: "var(--color-success)", // Soya rangi
      opacity: 0.25,
    },
  },
  colors: ["var(--color-success)"],
  stroke: {
    curve: "smooth", // Yumshoq chiziqlar
    width: 2,
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.5,
      opacityTo: 0, // Pastga qarab yo'qolib boruvchi gradient
    },
  },
  dataLabels: { enabled: false },
  grid: { show: false }, // Setka chiziqlarini o'chirish (toza ko'rinish uchun)
  xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
  yaxis: { show: false },
});
const chartOptions3 = ref<ApexOptions>({
  chart: {
    toolbar: { show: false }, // Ortiqcha tugmalarni o'chirish
    sparkline: { enabled: false }, // Card ichiga to'liq sig'ishi uchun
    dropShadow: {
      enabled: true,
      top: 10,
      left: 0,
      blur: 4,
      color: "var(--color-error)", // Soya rangi
      opacity: 0.25,
    },
  },
  colors: ["var(--color-error)"],
  stroke: {
    curve: "smooth", // Yumshoq chiziqlar
    width: 2,
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.5,
      opacityTo: 0, // Pastga qarab yo'qolib boruvchi gradient
    },
  },
  dataLabels: { enabled: false },
  grid: { show: false }, // Setka chiziqlarini o'chirish (toza ko'rinish uchun)
  xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
  yaxis: { show: false },
});
</script>

<style scoped>
.stats-card {
  background: var(--bg-primary);
  border-radius: 16px;
  box-shadow: var(--shadow-md);
  padding: 20px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.chart-wrapper {
  margin: -40px -20px;
}

.avatar-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: color-mix(in srgb, var(--primary-color), var(--bg-primary) 75%);
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

}

.card-header h3 {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary) !important;
}

.card-header-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background-color: color-mix(in srgb, var(--primary-color), var(--bg-primary) 75%);
  border-radius: 18px;
}

.card-header-actions .n-icon {
  color: var(--primary-color);
  font-size: 24px;
}

.analytical-page {
  max-width: 100%;
}

.page-title {
  font-family: var(--font-secondary);
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
}

:deep(.n-card) {
  height: 100%;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
}

:deep(.n-card .n-card__content) {
  padding: 16px;
}

.custom-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  color: white;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  margin-left: 8px;
}

.bg-success {
  background-color: var(--color-success);
}

.bg-error {
  background-color: var(--color-error);
}

/* Dark mode specific styles */
[data-theme="dark"] .stats-card {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

[data-theme="dark"] .card-header-actions:hover {
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
}

[data-theme="dark"] .avatar-wrapper:hover {
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
}


@media (max-width: 768px) {
  :deep(.n-grid) {
    grid-template-columns: 1fr !important;
  }
}
</style>
