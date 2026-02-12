<script setup lang="ts">
import { ref } from 'vue'

const stepValue = ref(30)
const stepValue2 = ref(0.5)
</script>

<template>
  <n-card title="Slider Steps">
    <n-space vertical :size="16">
      <n-slider v-model:value="stepValue" :step="10" />
      <n-p>Step value (10): {{ stepValue }}</n-p>
      <n-slider v-model:value="stepValue2" :step="0.1" :min="0" :max="1" />
      <n-p>Step value (0.1): {{ stepValue2 }}</n-p>
    </n-space>
  </n-card>
</template>