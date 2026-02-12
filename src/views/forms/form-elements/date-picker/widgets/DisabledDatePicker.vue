<script setup lang="ts">
import { ref } from 'vue'

const disabledValue = ref(null)

const disabledDate = (timestamp: number) => {
  const date = new Date(timestamp)
  const day = date.getDay()
  return day === 0 || day === 6 // Disable weekends
}

const formatDate = (timestamp: number | null) => {
  return timestamp ? new Date(timestamp).toLocaleDateString() : 'No date selected'
}
</script>

<template>
  <n-card title="Disabled Dates">
    <n-space vertical :size="16">
      <n-date-picker v-model:value="disabledValue" type="date" :disabled-date="disabledDate"
        placeholder="Select date (weekends disabled)" />
      <n-p>Selected date: {{ formatDate(disabledValue) }}</n-p>
    </n-space>
  </n-card>
</template>