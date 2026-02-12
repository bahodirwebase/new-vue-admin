<script setup lang="ts">
import { ref } from 'vue'

const filterValue = ref('')
const filterOptions = [
  { label: 'Frontend Developer', value: 'frontend' },
  { label: 'Backend Developer', value: 'backend' },
  { label: 'Full Stack Developer', value: 'fullstack' },
  { label: 'UI/UX Designer', value: 'designer' }
]

const customFilter = (inputValue: string, option: any) => {
  return option.label.toLowerCase().includes(inputValue.toLowerCase())
}
</script>

<template>
  <n-card title="Custom Filter">
    <n-space vertical :size="16">
      <n-auto-complete v-model:value="filterValue" :options="filterOptions" :filter-option="customFilter"
        placeholder="Custom filter..." />
      <n-p>Selected value: {{ filterValue || 'None' }}</n-p>
    </n-space>
  </n-card>
</template>