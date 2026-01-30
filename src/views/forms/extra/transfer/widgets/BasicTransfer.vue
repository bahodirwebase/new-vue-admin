<template>
  <n-card title="Basic Transfer">
    <n-space vertical :size="16">
      <n-transfer v-model:value="basicValue" :options="basicOptions" />
      <n-p>Selected: {{ JSON.stringify(basicValue) }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const basicValue = ref(['option1', 'option3'])
const basicOptions = [
  { label: 'Frontend Development', value: 'option1' },
  { label: 'Backend Development', value: 'option2' },
  { label: 'UI/UX Design', value: 'option3' },
  { label: 'DevOps', value: 'option4' },
  { label: 'Testing', value: 'option5' }
]
</script>
