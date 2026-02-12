<script setup lang="ts">
import { ref } from 'vue'

const rangeValue = ref([20, 80])
</script>

<template>
  <n-card title="Slider Range">
    <n-space vertical :size="16">
      <n-slider v-model:value="rangeValue" range :min="0" :max="100" />
      <n-p>Range value: {{ rangeValue[0] }} - {{ rangeValue[1] }}</n-p>
    </n-space>
  </n-card>
</template>