<script setup lang="ts">
import { NSpace, NGrid, NGi } from 'naive-ui'

import BasicEllipsis from './widgets/BasicEllipsis.vue'
import ExpandableEllipsis from './widgets/ExpandableEllipsis.vue'
import TooltipEllipsis from './widgets/TooltipEllipsis.vue'
import RealWorldEllipsis from './widgets/RealWorldEllipsis.vue'

</script>
<template>
  <div class="ellipsis-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Ellipsis</h1>
        <p class="page-subtitle">Text truncation with expandable content and tooltip support</p>
      </div>

      <!-- Basic and Expandable Ellipsis -->
      <n-grid :x-gap="18" :y-gap="18" cols="xxs:1 md:2" responsive="screen">
        <n-gi>
          <BasicEllipsis />
        </n-gi>

        <n-gi>
          <ExpandableEllipsis />
        </n-gi>
      </n-grid>

      <!-- Tooltip and Real-world Examples -->
      <n-grid :x-gap="18" :y-gap="18" cols="xxs:1 md:2" responsive="screen">
        <n-gi>
          <TooltipEllipsis />
        </n-gi>

        <n-gi>
          <RealWorldEllipsis />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<style lang="scss">
@use './styles/ellipsis.scss';
</style>
