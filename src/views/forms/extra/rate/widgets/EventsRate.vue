<template>
  <n-card title="Rate with Events">
    <n-space vertical :size="16">
      <n-rate v-model:value="eventValue" @update:value="handleRateChange" />
      <n-p>Rating: {{ eventValue }}</n-p>
      <n-p>Last change: {{ lastChange || 'No changes yet' }}</n-p>
      <n-p>Total changes: {{ changeCount }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const eventValue = ref(3)
const lastChange = ref('')
const changeCount = ref(0)

const handleRateChange = (value: number) => {
  lastChange.value = `Rating changed to: ${value} at ${new Date().toLocaleTimeString()}`
  changeCount.value++
}
</script>
