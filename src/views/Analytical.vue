<template>
  <div class="analytical-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Analytical Dashboard</h1>
        <p class="page-subtitle">Detailed analytics and insights</p>
      </div>

      <n-card title="Analytical Overview">
        <n-grid :cols="4" :x-gap="16" :y-gap="16">
          <n-grid-item>
            <n-statistic label="Total Revenue" :value="125430">
              <template #prefix>$</template>
              <template #suffix>
                <span style="color: #10b981; font-size: 14px">+15.3%</span>
              </template>
            </n-statistic>
          </n-grid-item>
          <n-grid-item>
            <n-statistic label="Active Users" :value="8945">
              <template #suffix>
                <span style="color: #10b981; font-size: 14px">+8.7%</span>
              </template>
            </n-statistic>
          </n-grid-item>
          <n-grid-item>
            <n-statistic label="Conversion Rate" :value="12.5">
              <template #suffix>%</template>
            </n-statistic>
          </n-grid-item>
          <n-grid-item>
            <n-statistic label="Avg. Session" :value="4.2">
              <template #suffix>min</template>
            </n-statistic>
          </n-grid-item>
        </n-grid>
      </n-card>

      <n-card title="Analytics Charts">
        <div class="chart-placeholder">
          <p>Analytical charts and graphs would be displayed here</p>
        </div>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
// Analytical page component
</script>

<style scoped>
.analytical-page {
  max-width: 100%;
}

.page-header {
  margin-bottom: 8px;
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

.chart-placeholder {
  padding: 60px 20px;
  text-align: center;
  color: var(--text-secondary);
  background: var(--bg-tertiary);
  border-radius: 8px;
}
</style>
