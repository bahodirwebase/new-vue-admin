<script setup lang="ts">
import { ref, watch, toRef } from "vue";
import type { ApexOptions } from "apexcharts";

import Statistics from "./widgets/Statistics.vue";
import LatestLeads from "./widgets/LatestLeads.vue";
import LineChart from "./widgets/LineChart.vue";
import CustomerTransaction from "./widgets/CustomerTransaction.vue";
import BrowserUsage from "./widgets/BrowserUsage.vue";
import StatisticsByChart from "./widgets/StatisticsByChart.vue";

import { ChatbubbleOutline, EyeOutline, HeartOutline, ShareSocialOutline, VideocamOutline } from "@vicons/ionicons5";

import { useThemeStore } from "@/stores/theme";



const themeStore = useThemeStore();

// Create a proper ref for isDark
const isDark = toRef(themeStore, 'isDark');

const series = ref([
  {
    name: "Revenue",
    data: [31, 0, 32, 90, 120, 51, 42, 109, 100, 40, 35],
  },
]);

const chartOptionsSuccess = ref<ApexOptions>({
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
  tooltip: {
    theme: isDark.value ? 'dark' : 'light',
  }
});
const chartOptionsError = ref<ApexOptions>({
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
  tooltip: {
    theme: isDark.value ? 'dark' : 'light',
  }
});
const statisticsInfo = ref([
  {
    value: "1m",
    label: "Views",
    icon: EyeOutline
  },
  {
    value: "670k",
    label: "Likes",
    icon: HeartOutline
  },
  {
    value: "100k",
    label: "Shares",
    icon: ShareSocialOutline
  },
  {
    value: "54k",
    label: "Comments",
    icon: ChatbubbleOutline
  },
  {
    value: "98",
    label: "Videos",
    icon: VideocamOutline
  },
  {
    value: "7.6k",
    label: "Profil Views",
    icon: EyeOutline
  },
])
watch(
  isDark,
  (newValue) => {
    if (chartOptionsSuccess.value.tooltip) {
      chartOptionsSuccess.value.tooltip.theme = newValue ? 'dark' : 'light'
    }
    if (chartOptionsError.value.tooltip) {
      chartOptionsError.value.tooltip.theme = newValue ? 'dark' : 'light'
    }
  }
)
</script>
<template>

  <div class="analytical-page">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Analytical Dashboard</h1>
        <p class="page-subtitle">Detailed analytics and insights</p>
      </div>
      <n-grid y-gap="18" x-gap="18" cols="1 xxs:2 sm:3 md:4 lg:5 xl:6"
        responsive="screen">
        <n-gi v-for="(item, index) in statisticsInfo" :key="index">
          <Statistics :value="item.value" :icon="item.icon" :label="item.label" />
        </n-gi>
      </n-grid>
      <n-grid x-gap="18" y-gap="18" cols="1 sm:1 md:2 " responsive="screen">
        <n-gi>
          <n-grid y-gap="18" x-gap="18" cols="1 xs:2" responsive="screen">
            <n-gi>
              <StatisticsByChart :key="(isDark as any)" :series="series" :chartOptions="chartOptionsSuccess"
                :type="'success'" :label="'Users'" :value="'28.05k'" />
            </n-gi>
            <n-gi>
              <StatisticsByChart :key="(isDark as any)" :series="series" :chartOptions="chartOptionsSuccess"
                :type="'success'" :label="'Sessions'" :value="'97.66k'" />
            </n-gi>
            <n-gi>
              <StatisticsByChart :key="(isDark as any)" :series="series" :chartOptions="chartOptionsError"
                :type="'error'" :label="'Avg. Visit Duration'" :value="'3m 40ses'" />
            </n-gi>
            <n-gi>
              <StatisticsByChart :key="(isDark as any)" :series="series" :chartOptions="chartOptionsSuccess"
                :type="'success'" :label="'Bounce rate'" :value="'33.48%'" />
            </n-gi>
          </n-grid>
        </n-gi>
        <n-gi>
          <LineChart />
        </n-gi>
      </n-grid>
      <n-grid y-gap="18" x-gap="18"  responsive="screen" cols="1 xs:2  xl:4">
        <n-gi>
          <LatestLeads />
        </n-gi>
        <n-gi>
          <BrowserUsage />
        </n-gi>
        <n-gi :span="2">
          <CustomerTransaction />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>



<style scoped>
.analytical-page {
  max-width: 100%;
}

:deep(.n-card) {
  height: 100% !important;
  border: 1px solid var(--border-color);
}
</style>
