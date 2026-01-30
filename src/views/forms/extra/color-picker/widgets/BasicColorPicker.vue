<template>
  <n-card title="Basic Color Picker">
    <n-space vertical :size="16">
      <n-color-picker v-model:value="basicValue" />
      <n-p>Selected color: {{ basicValue }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const basicValue = ref('#6366f1')
</script>
