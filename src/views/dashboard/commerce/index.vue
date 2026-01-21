<template>
  <div class="analytical-page">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Commerce Dashboard</h1>
        <p class="page-subtitle">Detailed analytics and insights</p>
      </div>
      <n-grid :x-gap="18" :y-gap="18" :cols="4">
        <n-gi :span="3">
          <ai />
          <NGrid :x-gap="18" :y-gap="18" :cols="3">
            <NGi :span="2">
                <ai2 style="margin-top: 18px;" />
            </NGi>
            <NGi >
                <ai3 style="margin-top: 18px;" />
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
          <ai4 />
          <ai7 style="margin-top: 18px;" />
          <ai9 style="margin-top: 18px;" />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>
<script setup lang="ts">
import { NGrid, NGi } from "naive-ui";
import { CashOutline, CartOutline, PeopleOutline } from "@vicons/ionicons5";
import ai from "./components/ai.vue";
import ai2 from "./components/ai2.vue";
import ai3 from "./components/ai3.vue";
import ai4 from "./components/ai4.vue";
import ai5 from "./components/ai5.vue";
import ai6 from "./components/ai6.vue";
import ai7 from "./components/ai7.vue";
import ai8 from "./components/ai8.vue";
import ai9 from "./components/ai9.vue";

interface StatCard {
  title: string;
  value: string;
  change: number;
  icon: typeof CashOutline;
  iconBg: string;
}

const stats: StatCard[] = [
  {
    title: "Total Sales",
    value: "$983,410",
    change: 3.34,
    icon: CashOutline,
    iconBg: "#18a058",
  },
  {
    title: "Total Orders",
    value: "58,375",
    change: -2.89,
    icon: CartOutline,
    iconBg: "#2080f0",
  },
  {
    title: "Total Visitors",
    value: "237,782",
    change: 8.02,
    icon: PeopleOutline,
    iconBg: "#f0a020",
  },
];

// const formatChange = (change: number): string => {
//   const sign = change >= 0 ? "+" : "";
//   return `${sign}${change.toFixed(2)}%`;
// };
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
.stat-card {
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.stat-card :deep(.n-card__content) {
  padding: 20px 24px;
}

.stat-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-title {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.stat-value-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.stat-value :deep(.n-statistic-value) {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
}

.stat-value :deep(.n-statistic-value__content) {
  font-variant-numeric: tabular-nums;
}

.stat-change {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.4;
}

.stat-change.positive {
  color: #18a058;
}

.stat-change.negative {
  color: #d03050;
}

.change-label {
  font-size: 10px;
  font-weight: 400;
  color: #999;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
</style>
