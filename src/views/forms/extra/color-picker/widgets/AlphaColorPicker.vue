<template>
  <n-card title="Color Picker with Alpha">
    <n-space vertical :size="16">
      <n-color-picker v-model:value="alphaValue" :alpha="true" />
      <n-p>Selected color: {{ alphaValue }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const alphaValue = ref('#6366f180')
</script>
