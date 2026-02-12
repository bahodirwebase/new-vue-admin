<script setup lang="ts">
import { ref } from 'vue'

const swatchValue = ref('#6366f1')

const swatches = [
  '#6366f1', // Primary
  '#18a058', // Success
  '#f0a020', // Warning
  '#d03050', // Error
  '#2080f0', // Info
  '#7c3aed', // Purple
  '#ec4899', // Pink
  '#f59e0b', // Amber
  '#10b981', // Emerald
  '#6b7280'  // Gray
]
</script>

<template>
  <n-card title="Color Picker with Swatches">
    <n-space vertical :size="16">
      <n-color-picker v-model:value="swatchValue" :swatches="swatches" />
      <n-p>Selected: {{ swatchValue }}</n-p>
    </n-space>
  </n-card>
</template>