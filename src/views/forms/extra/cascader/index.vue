<script setup lang="ts">
import { NSpace, NGrid, NGi } from 'naive-ui'

import BasicCascader from './widgets/BasicCascader.vue'
import MultipleCascader from './widgets/MultipleCascader.vue'
import HoverCascader from './widgets/HoverCascader.vue'
import CheckableCascader from './widgets/CheckableCascader.vue'
import CustomCascader from './widgets/CustomCascader.vue'
import RealWorldCascader from './widgets/RealWorldCascader.vue'
</script>

<template>
  <div class="cascader-demo">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Cascader</h1>
        <p class="page-subtitle">Advanced cascading selection with hierarchical data and chart analytics</p>
      </div>

      <n-grid :x-gap="18" :y-gap="18" cols="xxs:1 md:2" responsive="screen">
        <n-gi>
          <BasicCascader />
        </n-gi>

        <n-gi>
          <MultipleCascader />
        </n-gi>

        <n-gi>
          <HoverCascader />
        </n-gi>

        <n-gi>
          <CheckableCascader />
        </n-gi>

        <n-gi>
          <CustomCascader />
        </n-gi>

        <n-gi>
          <RealWorldCascader />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<style lang="scss">
@use './styles/cascader.scss';
</style>
