<script setup lang="ts">

import BasicCollapse from './widgets/BasicCollapse.vue'
import CollapseFeatures from './widgets/CollapseFeatures.vue'
import CollapseStyles from './widgets/CollapseStyles.vue'
import RichContent from './widgets/RichContent.vue'


</script>
<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Collapse</h1>
        <p class="page-subtitle">
          Accordion components for building collapsible content sections
        </p>
      </div>

      <n-grid x-gap="12" cols="1 sm:2" responsive="screen">
        <n-gi>
          <BasicCollapse />
          <CollapseFeatures />
        </n-gi>
        <n-gi>
          <CollapseStyles />
          <RichContent />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>
