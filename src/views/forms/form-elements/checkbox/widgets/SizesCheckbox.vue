<script setup lang="ts">
import { ref } from 'vue'

const smallValue = ref(false)
const mediumValue = ref(false)
const largeValue = ref(false)
</script>

<template>
  <n-card title="Checkbox Sizes">
    <n-space vertical :size="16">
      <n-space align="center" :size="12">
        <span>Small:</span>
        <n-checkbox v-model:checked="smallValue" size="small">Small</n-checkbox>
      </n-space>
      <n-space align="center" :size="12">
        <span>Medium:</span>
        <n-checkbox v-model:checked="mediumValue" size="medium">Medium</n-checkbox>
      </n-space>
      <n-space align="center" :size="12">
        <span>Large:</span>
        <n-checkbox v-model:checked="largeValue" size="large">Large</n-checkbox>
      </n-space>
    </n-space>
  </n-card>
</template>