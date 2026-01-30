<template>
  <n-card title="DateTime Picker">
    <n-space vertical :size="16">
      <n-date-picker v-model:value="datetimeValue" type="datetime" placeholder="Select date and time" />
      <n-p>Selected datetime: {{ formatDateTime(datetimeValue) }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const datetimeValue = ref(null)

const formatDateTime = (timestamp: number | null) => {
  return timestamp ? new Date(timestamp).toLocaleString() : 'No datetime selected'
}
</script>
