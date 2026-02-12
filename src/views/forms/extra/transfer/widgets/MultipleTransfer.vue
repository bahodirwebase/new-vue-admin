<script setup lang="ts">
import { ref } from 'vue'

const multipleValue = ref(['option1', 'option3'])
const basicOptions = [
  { label: 'Frontend Development', value: 'option1' },
  { label: 'Backend Development', value: 'option2' },
  { label: 'UI/UX Design', value: 'option3' },
  { label: 'DevOps', value: 'option4' },
  { label: 'Testing', value: 'option5' }
]
</script>

<template>
  <n-card title="Transfer with Multiple Selection">
    <n-space vertical :size="16">
      <n-transfer size="small" v-model:value="multipleValue" :options="basicOptions" source-filterable target-filterable />
      <n-p>Selected: {{ JSON.stringify(multipleValue) }}</n-p>
    </n-space>
  </n-card>
</template>