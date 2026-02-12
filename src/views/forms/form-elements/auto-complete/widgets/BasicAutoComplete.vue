<script setup lang="ts">
import { ref } from 'vue'

const basicValue = ref('')
const basicOptions = [
  { label: 'Vue.js', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' }
]
</script>

<template>
  <n-card title="Basic AutoComplete">
    <n-space vertical :size="16">
      <n-auto-complete v-model:value="basicValue" :options="basicOptions" placeholder="Type to search..." />
      <n-p>Selected value: {{ basicValue || 'None' }}</n-p>
    </n-space>
  </n-card>
</template>