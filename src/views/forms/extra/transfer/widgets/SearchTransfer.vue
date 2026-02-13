<script setup lang="ts">
import { ref } from 'vue'

const searchValue = ref(['option2'])
const basicOptions = [
  { label: 'Frontend Development', value: 'option1' },
  { label: 'Backend Development', value: 'option2' },
  { label: 'UI/UX Design', value: 'option3' },
  { label: 'DevOps', value: 'option4' },
  { label: 'Testing', value: 'option5' }
]
</script>

<template>
  <n-card title="Transfer with Search">
    <n-space vertical :size="16">
      <n-transfer size="small" v-model:value="searchValue" :options="basicOptions" source-filterable target-filterable />
      <n-p>Selected: {{ JSON.stringify(searchValue) }}</n-p>
    </n-space>
  </n-card>
</template>