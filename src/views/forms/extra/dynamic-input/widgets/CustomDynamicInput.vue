<template>
  <n-card title="Dynamic Input with Custom Create">
    <n-space vertical :size="16">
      <n-dynamic-input v-model:value="customValue" placeholder="Enter tag" :on-create="createTag" />
      <n-p>Tags: {{ JSON.stringify(customValue) }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const customValue = ref(['vue', 'react'])

const createTag = (value: string) => {
  if (!value) return null
  return value.toLowerCase().replace(/\s+/g, '-')
}
</script>
