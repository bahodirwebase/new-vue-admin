<script setup lang="ts">
import { NSpace, NGrid, NGi } from 'naive-ui'

import BasicMixedChart from './widgets/BasicMixedChart.vue'
import BarLineChart from './widgets/BarLineChart.vue'
import AreaColumnChart from './widgets/AreaColumnChart.vue'
import MultiYAxisChart from './widgets/MultiYAxisChart.vue'
import RealTimeMixedChart from './widgets/RealTimeMixedChart.vue'
import CustomMixedChart from './widgets/CustomMixedChart.vue'

</script>
<template>
  <div class="mixed-charts-page">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Mixed Charts</h1>
        <p class="page-subtitle">Advanced mixed chart visualizations with ApexCharts</p>
      </div>

      <!-- Basic Mixed Chart -->
      <BasicMixedChart />

      <!-- Bar + Line Chart -->
      <n-grid :x-gap="18" :y-gap="18" cols="xxs:1 md:2" responsive="screen">
        <n-gi>
          <BarLineChart />
        </n-gi>

        <!-- Area + Column Chart -->
        <n-gi>
          <AreaColumnChart />
        </n-gi>
      </n-grid>

      <!-- Multiple Y-Axes -->
      <MultiYAxisChart />

      <!-- Real-time Mixed Chart -->
      <RealTimeMixedChart />

      <!-- Custom Mixed Charts -->
      <n-grid :x-gap="18" :y-gap="18" cols="1" responsive="screen">

        <n-gi>
          <CustomMixedChart />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<style lang="scss">
@use './styles/mixed-chart.scss';
</style>
