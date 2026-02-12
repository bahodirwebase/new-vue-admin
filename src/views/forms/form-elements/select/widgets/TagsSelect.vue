<script setup lang="ts">
import { ref } from 'vue'

const tagValues = ref([])
const tagOptions = [
  { label: 'Vue.js', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Next.js', value: 'nextjs' }
]
</script>

<template>
  <n-card title="Select with Tags">
    <n-space vertical :size="16">
      <n-select v-model:value="tagValues" :options="tagOptions" multiple placeholder="Select with tags"
        :tag="true" />
    </n-space>
  </n-card>
</template>