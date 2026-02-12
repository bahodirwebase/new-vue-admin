<script setup lang="ts">
import { ref } from 'vue'

const basicValue = ref(null)

const formatDate = (timestamp: number | null) => {
  return timestamp ? new Date(timestamp).toLocaleDateString() : 'No date selected'
}
</script>

<template>
  <n-card title="Basic DatePicker">
    <n-space vertical :size="16">
      <n-date-picker v-model:value="basicValue" type="date" placeholder="Select date" />
      <n-p>Selected date: {{ formatDate(basicValue) }}</n-p>
    </n-space>
  </n-card>
</template>