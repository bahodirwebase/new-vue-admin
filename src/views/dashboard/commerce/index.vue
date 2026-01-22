<template>
  <div class="analytical-page">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Commerce Dashboard</h1>
        <p class="page-subtitle">Detailed analytics and insights</p>
      </div>
      <n-grid :x-gap="18" :y-gap="18" :cols="4">
        <n-gi :span="3">
          <statisticsCard />
          <NGrid :x-gap="18" :y-gap="18" :cols="3">
            <NGi :span="2">
                <revenueAnalytics style="margin-top: 18px;" />
            </NGi>
            <NGi >
                <monthlyTarget style="margin-top: 18px;" />
            </NGi>
            <NGi >
                <ai5  />
            </NGi>
            <NGi :span="2">
                <ai6  />
            </NGi>
            <NGi :span="3">
                <ai8  />
            </NGi>
          </NGrid>
          
          
        </n-gi>
        <n-gi>
          <topCategories />
          <ai7 style="margin-top: 18px;" />
          <ai9 style="margin-top: 18px;" />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>
<script setup lang="ts">
import { NGrid, NGi } from "naive-ui";
import statisticsCard from "./widgets/statisticsCard.vue";
import revenueAnalytics from "./widgets/revenueAnalytics.vue";
import monthlyTarget from "./widgets/monthlyTarget.vue";
import topCategories from "./widgets/topCategories.vue";
import ai5 from "./widgets/ai5.vue";
import ai6 from "./widgets/ai6.vue";
import ai7 from "./widgets/ai7.vue";
import ai8 from "./widgets/ai8.vue";
import ai9 from "./widgets/ai9.vue";


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

</style>
