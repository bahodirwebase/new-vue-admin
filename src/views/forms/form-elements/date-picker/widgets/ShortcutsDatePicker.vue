<script setup lang="ts">
import { ref } from 'vue'

const shortcutsValue = ref(null)

const shortcuts = {
  'Today': () => new Date(),
  'Yesterday': () => {
    const date = new Date()
    date.setDate(date.getDate() - 1)
    return date
  },
  'Last Week': () => {
    const date = new Date()
    date.setDate(date.getDate() - 7)
    return date
  }
}

const formatDate = (timestamp: number | null) => {
  return timestamp ? new Date(timestamp).toLocaleDateString() : 'No date selected'
}
</script>

<template>
  <n-card title="Shortcuts">
    <n-space vertical :size="16">
      <n-date-picker v-model:value="shortcutsValue" type="date" placeholder="Select date with shortcuts"
        :shortcuts="shortcuts" />
      <n-p>Selected date: {{ formatDate(shortcutsValue) }}</n-p>
    </n-space>
  </n-card>
</template>