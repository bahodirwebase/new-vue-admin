<template>
  <n-card title="Basic Input">
    <n-space vertical :size="16">
      <n-input v-model:value="basicInput" placeholder="Basic input" clearable />
      <n-p>Input value: {{ basicInput || 'Empty' }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const basicInput = ref('')
</script>
