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
  <div class="checkbox-demo">
    <n-space vertical :size="24">
      <n-grid x-gap="12" :cols="2">
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
.checkbox-demo {
  padding: 0;
}
</style>
