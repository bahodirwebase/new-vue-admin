<script setup lang="ts">
import BasicDatePicker from './widgets/BasicDatePicker.vue'
import RangeDatePicker from './widgets/RangeDatePicker.vue'
import DateTimePicker from './widgets/DateTimePicker.vue'
import FormatDatePicker from './widgets/FormatDatePicker.vue'
import DisabledDatePicker from './widgets/DisabledDatePicker.vue'
import ShortcutsDatePicker from './widgets/ShortcutsDatePicker.vue'
import SizesDatePicker from './widgets/SizesDatePicker.vue'
import EventsDatePicker from './widgets/EventsDatePicker.vue'
import EventDatePicker from './widgets/EventDatePicker.vue'
</script>

<template>
  <div class="datepicker-demo p-0">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Date Picker</h1>
        <p class="page-subtitle">Advanced date selection components with ranges, shortcuts, and custom formatting</p>
      </div>
      
      <n-grid x-gap="12" :cols="2">
        <n-gi>
          <BasicDatePicker />
          <RangeDatePicker />
          <DateTimePicker />
          <FormatDatePicker />
          <DisabledDatePicker />
        </n-gi>
        <n-gi>
          <ShortcutsDatePicker />
          <SizesDatePicker />
          <EventsDatePicker />
          <EventDatePicker />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<style scoped>
</style>
