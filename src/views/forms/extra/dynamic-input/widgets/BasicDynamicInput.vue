<template>
  <n-card title="Basic Dynamic Input">
    <n-space vertical :size="16">
      <n-dynamic-input v-model:value="basicValue" placeholder="Enter item" />
      <n-p>Items: {{ JSON.stringify(basicValue) }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const basicValue = ref(['Item 1', 'Item 2'])
</script>
