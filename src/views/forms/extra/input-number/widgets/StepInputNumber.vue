<template>
  <n-card title="Input Number with Step">
    <n-space vertical :size="16">
      <n-input-number v-model:value="stepValue" :step="5" placeholder="Step 5" />
      <n-p>Value: {{ stepValue }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const stepValue = ref(25)
</script>
