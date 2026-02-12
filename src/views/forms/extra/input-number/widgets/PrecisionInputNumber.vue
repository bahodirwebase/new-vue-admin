<script setup lang="ts">
import { ref } from 'vue'

const precisionValue = ref(3.14159)
</script>

<template>
  <n-card title="Input Number with Precision">
    <n-space vertical :size="16">
      <n-input-number v-model:value="precisionValue" :precision="2" placeholder="2 decimal places" />
      <n-p>Value: {{ precisionValue }}</n-p>
    </n-space>
  </n-card>
</template>


