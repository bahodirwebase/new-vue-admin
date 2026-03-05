<script setup lang="ts">
import { ref } from 'vue'

const sizeSwitch = ref(false)
</script>

<template>
  <n-card title="Switch Sizes">
    <n-space vertical :size="16">
      <n-space align="center" :size="12">
        <span>Small:</span>
        <n-switch v-model:value="sizeSwitch" size="small" aria-label="Small switch" />
      </n-space>
      <n-space align="center" :size="12">
        <span>Medium:</span>
        <n-switch v-model:value="sizeSwitch" size="medium" aria-label="Medium switch" />
      </n-space>
      <n-space align="center" :size="12">
        <span>Large:</span>
        <n-switch v-model:value="sizeSwitch" size="large" aria-label="Large switch" />
      </n-space>
    </n-space>
  </n-card>
</template>