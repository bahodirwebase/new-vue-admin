<script setup lang="ts">
import { ref } from 'vue'

const basicSwitch = ref(false)
</script>

<template>
  <n-card title="Basic Switch">
    <n-space vertical :size="16">
      <n-switch v-model:value="basicSwitch" />
      <n-p>Switch state: {{ basicSwitch ? 'ON' : 'OFF' }}</n-p>
    </n-space>
  </n-card>
</template>