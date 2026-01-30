<template>
  <n-card title="Multiple Selection">
    <n-space vertical :size="16">
      <n-auto-complete v-model:value="multipleValue" :options="multipleOptions" multiple
        placeholder="Select multiple options..." />
      <n-p>Selected values: {{ JSON.stringify(multipleValue) }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const multipleValue = ref([])
const multipleOptions = [
  { label: 'JavaScript', value: 'js' },
  { label: 'TypeScript', value: 'ts' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' }
]
</script>
