<template>
  <n-card title="Date Picker Events">
    <n-space vertical :size="16">
      <n-date-picker v-model:value="eventValue" type="date" placeholder="Select date"
        @update:value="handleDateChange" @panel-visible-change="handlePanelVisible" />
      <n-p>Last event: {{ lastEvent || 'No events yet' }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const eventValue = ref(null)
const lastEvent = ref('')

const handleDateChange = (value: number | null) => {
  lastEvent.value = `Date changed to: ${value ? new Date(value).toLocaleString() : 'null'}`
}

const handlePanelVisible = (visible: boolean) => {
  lastEvent.value = `Panel ${visible ? 'opened' : 'closed'}`
}
</script>
