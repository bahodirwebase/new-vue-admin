<script setup lang="ts">
import Statistics from "./widgets/Statistics.vue";
import LatestLeads from "./widgets/LatestLeads.vue";
import LineChart from "./widgets/LineChart.vue";
import CustomerTransaction from "./widgets/CustomerTransaction.vue";
import BrowserUsage from "./widgets/BrowserUsage.vue";
import StatisticsByChart from "./widgets/StatisticsByChart.vue";

import PageHeader from "@/components/custom/PageHeader.vue";
import { STATISTICS_INFO, STATS_BY_CHART_SERIES, STATS_BY_CHART_ITEMS } from "./constants";
import { useAnalytical } from "./composables/useAnalytical";

const { isDark, chartOptionsSuccess, chartOptionsError } = useAnalytical()
</script>

<template>
  <div class="analytical-page">
    <n-space vertical :size="18">
      <PageHeader title="Analytical Dashboard" subtitle="Detailed analytics and insights" />
      <n-grid y-gap="18" x-gap="18" cols="1 xxs:2 sm:3 md:4 lg:5 xl:6" responsive="screen">
        <n-gi v-for="(item, index) in STATISTICS_INFO" :key="index">
          <Statistics :value="item.value" :icon="item.icon" :label="item.label" />
        </n-gi>
      </n-grid>
      <n-grid x-gap="18" y-gap="18" cols="1 sm:1 md:2" responsive="screen">
        <n-gi>
          <n-grid y-gap="18" x-gap="18" cols="1 xs:2" responsive="screen">
            <n-gi v-for="item in STATS_BY_CHART_ITEMS" :key="item.label">
              <StatisticsByChart
                :key="(isDark as any)"
                :series="STATS_BY_CHART_SERIES"
                :chartOptions="item.type === 'error' ? chartOptionsError : chartOptionsSuccess"
                :type="item.type"
                :label="item.label"
                :value="item.value"
              />
            </n-gi>
          </n-grid>
        </n-gi>
        <n-gi>
          <LineChart />
        </n-gi>
      </n-grid>
      <n-grid y-gap="18" x-gap="18" responsive="screen" cols="1 xs:2 xl:4">
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
