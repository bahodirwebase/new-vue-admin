<script setup lang="ts">
import { ref } from 'vue'

const rangeValue = ref(null)

const formatDateRange = (range: number[] | null) => {
  if (!range || range.length !== 2) return 'No range selected'
  const start = new Date(range[0]).toLocaleDateString()
  const end = new Date(range[1]).toLocaleDateString()
  return `${start} - ${end}`
}
</script>

<template>
  <n-card title="Date Range">
    <n-space vertical :size="16">
      <n-date-picker v-model:value="rangeValue" type="daterange" placeholder="Select date range" />
      <n-p>Range: {{ formatDateRange(rangeValue) }}</n-p>
    </n-space>
  </n-card>
</template>