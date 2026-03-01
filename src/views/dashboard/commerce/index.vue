<script setup lang="ts">
import { NGrid, NGi, NFlex } from "naive-ui";
import StatisticsCard from "./widgets/StatisticsCard.vue";
import RevenueAnalytics from "./widgets/RevenueAnalytics.vue";
import MonthlyTarget from "./widgets/MonthlyTarget.vue";
import TopCategories from "./widgets/TopCategories.vue";
import ActiveUser from "./widgets/ActiveUser.vue";
import ConversionRate from "./widgets/ConversionRate.vue";
import TrafficSources from "./widgets/TrafficSources.vue";
import RecentOrders from "./widgets/RecentOrders.vue";
import RecentActivity from "./widgets/RecentActivity.vue";


</script>

<template>
  <div class="analytical-page">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Commerce Dashboard</h1>
        <p class="page-subtitle">Detailed analytics and insights</p>
      </div>
      <n-grid :x-gap="18" :y-gap="18" cols="xxs:1 md:3 lg:4" responsive="screen">

        <n-gi span="xxs:1 md:2 lg:3">
          <StatisticsCard />

          <n-grid :x-gap="18" :y-gap="18" cols="xxs:1 sm:2 md:2 lg:2 xl:3" responsive="screen"
            style="margin-top: 18px;">
            <n-gi span="xxs:1 sm:2 lg:1 xl:2">
              <RevenueAnalytics />
            </n-gi>

            <n-gi span="xxs:1 sm:1 md:1 lg:1 xl:1">
              <MonthlyTarget />
            </n-gi>

            <n-gi span="xxs:1 md:1 sm:1 lg:2 xl:1">
              <ActiveUser />
            </n-gi>

            <n-gi span="xxs:1 md:2 sm:2 xl:2">
              <ConversionRate />
            </n-gi>

            <n-gi span="xxs:1 sm:2 md:3 xl:3">
              <RecentOrders />
            </n-gi>
          </n-grid>
        </n-gi>

        <n-gi span="xxs:1 md:1 lg:1">
          <n-flex vertical :size="18">
            <TopCategories />
            <TrafficSources />
            <RecentActivity />
          </n-flex>
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
