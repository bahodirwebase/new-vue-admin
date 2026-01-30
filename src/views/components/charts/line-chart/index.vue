<script setup lang="ts">
import { NSpace, NGrid, NGi } from 'naive-ui'

import BasicLineChart from './widgets/BasicLineChart.vue'
import MultiLineChart from './widgets/MultiLineChart.vue'
import GradientLineChart from './widgets/GradientLineChart.vue'
import SteppedLineChart from './widgets/SteppedLineChart.vue'
import InteractiveLineChart from './widgets/InteractiveLineChart.vue'
import RealTimeLineChart from './widgets/RealTimeLineChart.vue'
</script>
<template>
  <div class="line-charts-page">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Line Charts</h1>
        <p class="page-subtitle">Advanced line chart visualizations with ApexCharts</p>
      </div>

      <!-- Basic Line Chart -->
      <n-grid :x-gap="18" :y-gap="18" cols="xxs:1 md:2" responsive="screen">
        <n-gi>
          <BasicLineChart />
        </n-gi>

        <!-- Multi Line Chart -->
        <n-gi>
          <MultiLineChart />
        </n-gi>
      </n-grid>

      <!-- Gradient Line Chart -->
      <n-grid :x-gap="18" :y-gap="18" cols="xxs:1 md:2" responsive="screen">
        <n-gi>
          <GradientLineChart />
        </n-gi>

        <!-- Stepped Line Chart -->
        <n-gi>
          <SteppedLineChart />
        </n-gi>
      </n-grid>

      <!-- Interactive Line Chart -->
      <InteractiveLineChart />

      <!-- Real-time Line Chart -->
      <RealTimeLineChart />
    </n-space>
  </div>
</template>



<style lang="scss">
@use './styles/line-chart.scss';
</style>