<script setup lang="ts">
import { NPageHeader, NSpace, NButton, NIcon, NStatistic } from 'naive-ui'
import { Grid } from '@vicons/ionicons5'
</script>

<template>
  <n-space vertical :size="16">
    <div class="example-section">
      <h3>Custom Header Content</h3>
      <n-page-header title="Dashboard" subtitle="Analytics and monitoring">
        <template #header>
          <div class="header-content">
            <n-icon size="24" color="#2080f0">
              <Grid />
            </n-icon>
            <div class="header-text">
              <div class="title">Analytics Dashboard</div>
              <div class="subtitle">Real-time data monitoring</div>
            </div>
          </div>
        </template>
        <template #extra>
          <n-space>
            <n-button secondary>Export</n-button>
            <n-button type="primary">New Report</n-button>
          </n-space>
        </template>
      </n-page-header>
    </div>

    <div class="example-section">
      <h3>With Statistics</h3>
      <n-page-header title="Sales Report" subtitle="Monthly performance overview">
        <template #extra>
          <n-space>
            <n-statistic label="Total Sales" value="125,430" />
            <n-statistic label="Growth" value="+23.5%" />
          </n-space>
        </template>
      </n-page-header>
    </div>
  </n-space>
</template>
