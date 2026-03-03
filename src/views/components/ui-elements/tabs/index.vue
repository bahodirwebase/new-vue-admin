<script setup lang="ts">
import PageHeader from "@/components/custom/PageHeader.vue";

import BasicTabs from './widgets/BasicTabs.vue'
import TabTypes from './widgets/TabTypes.vue'
import AdvancedTabs from './widgets/AdvancedTabs.vue'
import TabFeatures from './widgets/TabFeatures.vue'


</script>
<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <PageHeader title="Tabs" subtitle="Organized content sections with tabbed navigation" />

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
