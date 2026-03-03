<script setup lang="ts">
import PageHeader from "@/components/custom/PageHeader.vue"
import BasicSwitch from './widgets/BasicSwitch.vue'
import LabelsSwitch from './widgets/LabelsSwitch.vue'
import SizesSwitch from './widgets/SizesSwitch.vue'
import StatesSwitch from './widgets/StatesSwitch.vue'
import GroupSwitch from './widgets/GroupSwitch.vue'
import ValuesSwitch from './widgets/ValuesSwitch.vue'
import EventsSwitch from './widgets/EventsSwitch.vue'
import FormSwitch from './widgets/FormSwitch.vue'
</script>

<template>
  <div class="switch-demo p-0">
    <n-space vertical :size="18">
      <PageHeader title="Switch" subtitle="Toggle switch components with labels, custom values, events, and form integration" />
      
      <n-grid cols="1 sm:2" responsive="screen" :x-gap="12">
        <n-gi>
          <BasicSwitch />
          <LabelsSwitch />
          <SizesSwitch />
          <StatesSwitch />
        </n-gi>
        <n-gi>
          <GroupSwitch />
          <ValuesSwitch />
          <EventsSwitch />
          <FormSwitch />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<style scoped>
</style>
