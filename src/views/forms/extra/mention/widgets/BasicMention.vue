<script setup lang="ts">
import { ref } from 'vue'

const basicValue = ref('')
const basicOptions = [
  { label: 'John Doe', value: 'john' },
  { label: 'Jane Smith', value: 'jane' },
  { label: 'Bob Johnson', value: 'bob' },
  { label: 'Alice Brown', value: 'alice' }
]
</script>

<template>
  <n-card title="Basic Mention">
    <n-space vertical :size="16">
      <n-mention v-model:value="basicValue" :options="basicOptions" placeholder="Type @ to mention..." />
      <n-p>Text: {{ basicValue }}</n-p>
    </n-space>
  </n-card>
</template>


