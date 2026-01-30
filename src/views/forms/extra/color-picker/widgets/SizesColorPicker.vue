<template>
  <n-card title="Color Picker Sizes">
    <n-space vertical :size="16">
      <n-space vertical>
        <n-color-picker v-model:value="smallValue" size="small" />
        <n-color-picker v-model:value="mediumValue" size="medium" />
        <n-color-picker v-model:value="largeValue" size="large" />
      </n-space>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const smallValue = ref('#f0a020')
const mediumValue = ref('#d03050')
const largeValue = ref('#2080f0')
</script>
