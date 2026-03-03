<script setup lang="ts">
import PageHeader from "@/components/custom/PageHeader.vue";

import BasicCollapse from './widgets/BasicCollapse.vue'
import CollapseFeatures from './widgets/CollapseFeatures.vue'
import CollapseStyles from './widgets/CollapseStyles.vue'
import RichContent from './widgets/RichContent.vue'
import CustomCollapseWidget from './widgets/CustomCollapseWidget.vue'
import AccordionMode from './widgets/AccordionMode.vue'

</script>
<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <PageHeader title="Collapse" subtitle="Accordion components for building collapsible content sections" />

      <n-grid x-gap="12" cols="1 sm:2" responsive="screen">
        <n-gi>
          <BasicCollapse />
          <CollapseFeatures />
        </n-gi>
        <n-gi>
          <CollapseStyles />
          <RichContent />
        </n-gi>
        <n-gi>
          <CustomCollapseWidget />
        </n-gi>
        <n-gi>
          <AccordionMode />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>
