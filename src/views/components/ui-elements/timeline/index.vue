<script setup lang="ts">
import PageHeader from "@/components/custom/PageHeader.vue";

import BasicTimeline from './widgets/BasicTimeline.vue'
import TimelineTypes from './widgets/TimelineTypes.vue'
import TimelineFeatures from './widgets/TimelineFeatures.vue'
import AdvancedTimeline from './widgets/AdvancedTimeline.vue'


</script>
<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <PageHeader title="Timeline" subtitle="Chronological sequences for events, history, and progress tracking" />

      <n-grid x-gap="12" cols="1 sm:2" responsive="screen">
        <n-gi>
          <BasicTimeline />
          <TimelineTypes />
        </n-gi>
        <n-gi>
          <TimelineFeatures />
          <AdvancedTimeline />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>
