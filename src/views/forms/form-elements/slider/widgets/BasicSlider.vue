<template>
  <n-card title="Basic Slider">
    <n-space vertical :size="16">
      <n-slider v-model:value="basicValue" />
      <n-p>Slider value: {{ basicValue }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const basicValue = ref(50)
</script>
