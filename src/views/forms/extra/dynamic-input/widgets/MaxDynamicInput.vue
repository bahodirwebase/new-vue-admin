<script setup lang="ts">
import { ref } from 'vue'

const maxValue = ref(['JavaScript', 'TypeScript'])
</script>

<template>
  <n-card title="Dynamic Input with Max Items">
    <n-space vertical :size="16">
      <n-dynamic-input v-model:value="maxValue" placeholder="Enter skill" :max="3" />
      <n-p>Skills (max 3): {{ JSON.stringify(maxValue) }}</n-p>
    </n-space>
  </n-card>
</template>
