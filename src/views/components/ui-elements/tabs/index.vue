<script setup lang="ts">

import BasicTabs from './widgets/BasicTabs.vue'
import TabTypes from './widgets/TabTypes.vue'
import AdvancedTabs from './widgets/AdvancedTabs.vue'
import TabFeatures from './widgets/TabFeatures.vue'


</script>
<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Tabs</h1>
        <p class="page-subtitle">Organized content sections with tabbed navigation</p>
      </div>

      <n-grid x-gap="12" cols="1 sm:2" responsive="screen">
        <n-gi>
          <BasicTabs />
          <TabTypes />
        </n-gi>
        <n-gi>
          <AdvancedTabs />
          <TabFeatures />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>
