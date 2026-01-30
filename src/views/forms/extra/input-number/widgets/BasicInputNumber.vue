<template>
  <n-card title="Basic Input Number">
    <n-space vertical :size="16">
      <n-input-number v-model:value="basicValue" placeholder="Enter number" />
      <n-p>Value: {{ basicValue }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const basicValue = ref(42)
</script>
