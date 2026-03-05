<script setup lang="ts">
import { ref } from 'vue'

const normalSwitch = ref(false)
const disabledSwitch = ref(true)
const loadingSwitch = ref(false)
</script>

<template>
  <n-card title="Switch States">
    <n-space vertical :size="16">
      <n-space align="center" :size="12">
        <span>Normal:</span>
        <n-switch v-model:value="normalSwitch" aria-label="Normal switch" />
      </n-space>
      <n-space align="center" :size="12">
        <span>Disabled:</span>
        <n-switch v-model:value="disabledSwitch" disabled aria-label="Disabled switch" />
      </n-space>
      <n-space align="center" :size="12">
        <span>Loading:</span>
        <n-switch v-model:value="loadingSwitch" loading aria-label="Loading switch" />
      </n-space>
    </n-space>
  </n-card>
</template>