<script setup lang="ts">

import BasicTooltips from './widgets/BasicTooltips.vue'
import TooltipTriggers from './widgets/TooltipTriggers.vue'
import TooltipPlacements from './widgets/TooltipPlacements.vue'
import AdvancedTooltips from './widgets/AdvancedTooltips.vue'


</script>
<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Tooltip</h1>
        <p class="page-subtitle">Contextual hints and additional information on hover or focus</p>
      </div>

      <n-grid x-gap="12" cols="1 sm:2" responsive="screen">
        <n-gi>
          <BasicTooltips />
          <TooltipTriggers />
        </n-gi>
        <n-gi>
          <TooltipPlacements />
          <AdvancedTooltips />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>
