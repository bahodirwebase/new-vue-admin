<script setup lang="ts">
import { NSpace, NGrid, NGi } from 'naive-ui'

import PageHeader from "@/components/custom/PageHeader.vue";
import BasicPieChart from './widgets/BasicPieChart.vue'
import DonutChart from './widgets/DonutChart.vue'
import Pie3DChart from './widgets/Pie3DChart.vue'
import SemiCircleDonutChart from './widgets/SemiCircleDonutChart.vue'
import InteractivePieChart from './widgets/InteractivePieChart.vue'
import AdvancedPieChart from './widgets/AdvancedPieChart.vue'

</script>
<template>
  <div class="pie-charts-page">
    <n-space vertical :size="18">
      <PageHeader title="Pie Charts" subtitle="Advanced pie chart visualizations with ApexCharts" />

      <!-- Basic Pie and Donut Charts -->
      <n-grid :x-gap="18" :y-gap="18" cols="xxs:1 md:2" responsive="screen">
        <n-gi>
          <BasicPieChart />
        </n-gi>

        <n-gi>
          <DonutChart />
        </n-gi>
      </n-grid>

      <!-- 3D Pie and Semi Circle Donut -->
      <n-grid :x-gap="18" :y-gap="18" cols="xxs:1 md:2" responsive="screen">
        <n-gi>
          <Pie3DChart />
        </n-gi>

        <n-gi>
          <SemiCircleDonutChart />
        </n-gi>
      </n-grid>

      <!-- Interactive Pie Chart -->
      <InteractivePieChart />

      <!-- Advanced Pie Chart -->
      <AdvancedPieChart />
    </n-space>
  </div>
</template>

<style lang="scss">
@use './styles/pie-chart.scss';
</style>
