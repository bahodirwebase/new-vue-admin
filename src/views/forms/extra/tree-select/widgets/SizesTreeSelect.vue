<template>
  <n-card title="Tree Select Sizes">
    <n-space vertical :size="16">
      <n-tree-select v-model:value="smallValue" size="small" placeholder="Small" />
      <n-tree-select v-model:value="mediumValue" size="medium" placeholder="Medium" />
      <n-tree-select v-model:value="largeValue" size="large" placeholder="Large" />
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const smallValue = ref('')
const mediumValue = ref('')
const largeValue = ref('')
</script>
