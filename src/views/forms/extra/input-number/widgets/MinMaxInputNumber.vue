<script setup lang="ts">
import { ref } from 'vue'

const minMaxValue = ref(50)
</script>

<template>
  <n-card title="Input Number with Min/Max">
    <n-space vertical :size="16">
      <n-input-number v-model:value="minMaxValue" :min="0" :max="100" placeholder="0-100" />
      <n-p>Value: {{ minMaxValue }}</n-p>
    </n-space>
  </n-card>
</template>


