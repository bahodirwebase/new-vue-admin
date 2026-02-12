<script setup lang="ts">
import { ref } from 'vue'

const eventSwitch = ref(false)
const lastChange = ref('')
const changeCount = ref(0)

const handleSwitchChange = (value: boolean) => {
  lastChange.value = `Switch changed to: ${value ? 'ON' : 'OFF'} at ${new Date().toLocaleTimeString()}`
  changeCount.value++
}
</script>

<template>
  <n-card title="Switch with Events">
    <n-space vertical :size="16">
      <n-switch v-model:value="eventSwitch" @update:value="handleSwitchChange" />
      <n-p>Last change: {{ lastChange || 'No changes yet' }}</n-p>
      <n-p>Change count: {{ changeCount }}</n-p>
    </n-space>
  </n-card>
</template>