<script setup lang="ts">
import { NSpace, NGrid, NGi } from 'naive-ui'

import BasicBarChart from './widgets/BasicBarChart.vue'
import HorizontalBarChart from './widgets/HorizontalBarChart.vue'
import StackedBarChart from './widgets/StackedBarChart.vue'
import GroupedBarChart from './widgets/GroupedBarChart.vue'
import InteractiveBarChart from './widgets/InteractiveBarChart.vue'
import RealTimeBarChart from './widgets/RealTimeBarChart.vue'

</script>
<template>
  <div class="bar-charts-page">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Bar Charts</h1>
        <p class="page-subtitle">Advanced bar chart visualizations with ApexCharts</p>
      </div>

      <!-- Basic Bar Chart -->
      <n-grid :x-gap="18" :y-gap="18" cols="xxs:1 md:2" responsive="screen">
        <n-gi>
          <BasicBarChart />
        </n-gi>

        <!-- Horizontal Bar Chart -->
        <n-gi>
          <HorizontalBarChart />
        </n-gi>
      </n-grid>

      <!-- Stacked Bar Chart -->
      <n-grid :x-gap="18" :y-gap="18" cols="xxs:1 md:2" responsive="screen">
        <n-gi>
          <StackedBarChart />
        </n-gi>

        <!-- Grouped Bar Chart -->
        <n-gi>
          <GroupedBarChart />
        </n-gi>
      </n-grid>

      <!-- Interactive Bar Chart -->
      <InteractiveBarChart />

      <!-- Real-time Bar Chart -->
      <RealTimeBarChart />
    </n-space>
  </div>
</template>



<style lang="scss">
@use './styles/bar-chart.scss';
</style>