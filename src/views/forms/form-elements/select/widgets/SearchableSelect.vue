<script setup lang="ts">
import { ref } from 'vue'

const searchValue = ref(null)
const searchOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date' },
  { label: 'Elderberry', value: 'elderberry' },
  { label: 'Fig', value: 'fig' },
  { label: 'Grape', value: 'grape' }
]
</script>

<template>
  <n-card title="Searchable Select">
    <n-space vertical :size="16">
      <n-select v-model:value="searchValue" :options="searchOptions" filterable placeholder="Search and select"
        clearable />
      <n-p>Selected value: {{ searchValue || 'None' }}</n-p>
    </n-space>
  </n-card>
</template>