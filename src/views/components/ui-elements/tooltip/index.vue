<script setup lang="ts">
import PageHeader from "@/components/custom/PageHeader.vue";

import BasicTooltips from './widgets/BasicTooltips.vue'
import TooltipTriggers from './widgets/TooltipTriggers.vue'
import TooltipPlacements from './widgets/TooltipPlacements.vue'
import AdvancedTooltips from './widgets/AdvancedTooltips.vue'


</script>
<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <PageHeader title="Tooltip" subtitle="Contextual hints and additional information on hover or focus" />

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
