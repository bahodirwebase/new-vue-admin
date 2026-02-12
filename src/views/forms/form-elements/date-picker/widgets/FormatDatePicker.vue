<script setup lang="ts">
import { ref } from 'vue'

const formatValue = ref(null)

const formatDate = (timestamp: number | null) => {
  return timestamp ? new Date(timestamp).toLocaleDateString() : 'No date selected'
}
</script>

<template>
  <n-card title="Custom Format">
    <n-space vertical :size="16">
      <n-date-picker v-model:value="formatValue" type="date" format="yyyy-MM-dd" placeholder="YYYY-MM-DD" />
      <n-p>Formatted: {{ formatDate(formatValue) }}</n-p>
    </n-space>
  </n-card>
</template>