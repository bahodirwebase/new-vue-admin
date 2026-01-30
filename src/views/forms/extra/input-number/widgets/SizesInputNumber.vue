<template>
  <n-card title="Input Number Sizes">
    <n-space vertical :size="16">
      <n-space>
        <n-input-number v-model:value="smallValue" size="small" placeholder="Small" />
        <n-input-number v-model:value="mediumValue" size="medium" placeholder="Medium" />
        <n-input-number v-model:value="largeValue" size="large" placeholder="Large" />
      </n-space>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const smallValue = ref(null)
const mediumValue = ref(null)
const largeValue = ref(null)
</script>
