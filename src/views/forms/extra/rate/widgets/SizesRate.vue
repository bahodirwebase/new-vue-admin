<script setup lang="ts">
import { ref } from 'vue'

const smallValue = ref(3)
const mediumValue = ref(3)
const largeValue = ref(3)
</script>

<template>
  <n-card title="Rate Sizes">
    <n-space vertical :size="16">
      <n-space vertical :size="8">
        <span>Small:</span>
        <n-rate v-model:value="smallValue" size="small" />
      </n-space>
      <n-space vertical :size="8">
        <span>Medium:</span>
        <n-rate v-model:value="mediumValue" size="medium" />
      </n-space>
      <n-space vertical :size="8">
        <span>Large:</span>
        <n-rate v-model:value="largeValue" size="large" />
      </n-space>
    </n-space>
  </n-card>
</template>