<template>
  <n-card title="Grouped Options">
    <n-space vertical :size="16">
      <n-auto-complete v-model:value="groupedValue" :options="groupedOptions"
        placeholder="Search in groups..." />
      <n-p>Selected value: {{ groupedValue || 'None' }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const groupedValue = ref('')
const groupedOptions = [
  {
    label: 'Frontend',
    type: 'group',
    children: [
      { label: 'Vue.js', value: 'vue' },
      { label: 'React', value: 'react' },
      { label: 'Angular', value: 'angular' }
    ]
  },
  {
    label: 'Backend',
    type: 'group',
    children: [
      { label: 'Node.js', value: 'node' },
      { label: 'Python', value: 'python' },
      { label: 'Java', value: 'java' }
    ]
  }
]
</script>
