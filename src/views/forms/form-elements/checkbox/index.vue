<script setup lang="ts">
import BasicCheckbox from './widgets/BasicCheckbox.vue'
import GroupCheckbox from './widgets/GroupCheckbox.vue'
import SizesCheckbox from './widgets/SizesCheckbox.vue'
import StatesCheckbox from './widgets/StatesCheckbox.vue'
import ColorsCheckbox from './widgets/ColorsCheckbox.vue'
import EventsCheckbox from './widgets/EventsCheckbox.vue'
import TodoCheckbox from './widgets/TodoCheckbox.vue'
</script>

<template>
  <div class="checkbox-demo p-0">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Checkbox</h1>
        <p class="page-subtitle">Interactive checkbox components with groups, colors, events, and custom styling</p>
      </div>
      
      <n-grid x-gap="12" cols="1 sm:2" responsive="screen">
        <n-gi>
          <BasicCheckbox />
          <GroupCheckbox />
          <SizesCheckbox />
          <StatesCheckbox />
        </n-gi>
        <n-gi>
          <ColorsCheckbox />
          <EventsCheckbox />
          <TodoCheckbox />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<style scoped>
</style>
