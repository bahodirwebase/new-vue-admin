<script setup lang="ts">
import { ref } from 'vue'

const eventValue = ref(false)
const lastChange = ref('')
const changeCount = ref(0)

const handleCheckboxChange = (value: boolean) => {
  lastChange.value = `Checkbox ${value ? 'checked' : 'unchecked'} at ${new Date().toLocaleTimeString()}`
  changeCount.value++
}
</script>

<template>
  <n-card title="Checkbox with Events">
    <n-space vertical :size="16">
      <n-checkbox v-model:value="eventValue" @update:value="handleCheckboxChange">
        Click me to see events
      </n-checkbox>
      <n-p>Last change: {{ lastChange || 'No changes yet' }}</n-p>
      <n-p>Change count: {{ changeCount }}</n-p>
    </n-space>
  </n-card>
</template>