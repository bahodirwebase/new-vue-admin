<template>
  <div class="analytical-page">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Commerce Dashboard</h1>
        <p class="page-subtitle">Detailed analytics and insights</p>
      </div>
      <n-grid :x-gap="18" :y-gap="18" cols="xxs:1 md:3 lg:4" responsive="screen">

        <n-gi span="xxs:1 md:2 lg:3">
          <statisticsCard />

          <n-grid :x-gap="18" :y-gap="18" cols="xxs:1 sm:2 md:2 lg:2 xl:3" responsive="screen" style="margin-top: 18px;">
            <n-gi span="xxs:1 sm:2 lg:1 xl:2">
              <revenueAnalytics />
            </n-gi>

            <n-gi span="xxs:1 sm:1 md:1 lg:1 xl:1">
              <monthlyTarget />
            </n-gi>

            <n-gi span="xxs:1 md:1 sm:1 lg:2 xl:1">
              <activeUser />
            </n-gi>

            <n-gi span="xxs:1 md:2 sm:2 xl:2">
              <conversionRate />
            </n-gi>

            <n-gi span="xxs:1 sm:2 md:3 xl:3">
              <recentOrders />
            </n-gi>
          </n-grid>
        </n-gi>

        <n-gi span="xxs:1 md:1 lg:1">
          <n-flex vertical :size="18">
            <topCategories />
            <trafficSources />
            <recentActivity />
          </n-flex>
        </n-gi>

      </n-grid>
    </n-space>
  </div>
</template>
<script setup lang="ts">
import { NGrid, NGi, NFlex } from "naive-ui";
import statisticsCard from "./widgets/statisticsCard.vue";
import revenueAnalytics from "./widgets/revenueAnalytics.vue";
import monthlyTarget from "./widgets/monthlyTarget.vue";
import topCategories from "./widgets/topCategories.vue";
import activeUser from "./widgets/activeUser.vue";
import conversionRate from "./widgets/conversionRate.vue";
import trafficSources from "./widgets/trafficSources.vue";
import recentOrders from "./widgets/recentOrders.vue";
import recentActivity from "./widgets/recentActivity.vue";


</script>
<style scoped>
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
  height: 100% !important;
  border: 1px solid var(--border-color);
}
</style>
