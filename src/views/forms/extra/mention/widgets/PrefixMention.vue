<template>
  <n-card title="Mention with Different Prefixes">
    <n-space vertical :size="16">
      <n-mention v-model:value="prefixValue" :options="prefixOptions" :prefix="['@', '#']"
        placeholder="Type @ or # to mention..." />
      <n-p>Text: {{ prefixValue }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const prefixValue = ref('')
const prefixOptions = [
  // Users
  { label: 'John Doe', value: 'john', type: 'user' },
  { label: 'Jane Smith', value: 'jane', type: 'user' },
  // Tags
  { label: 'urgent', value: 'urgent', type: 'tag' },
  { label: 'important', value: 'important', type: 'tag' },
  { label: 'review', value: 'review', type: 'tag' }
]
</script>
