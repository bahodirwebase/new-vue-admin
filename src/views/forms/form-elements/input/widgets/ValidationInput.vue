<script setup lang="ts">
import { ref } from 'vue'

const requiredValue = ref('')
const minLengthValue = ref('')
const patternValue = ref('')
</script>

<template>
  <n-card title="Input Validation">
    <n-space vertical :size="16">
      <n-input v-model:value="requiredValue" placeholder="Required field"
        :status="requiredValue ? 'success' : 'error'" />
      <n-input v-model:value="minLengthValue" placeholder="Min 5 characters"
        :status="minLengthValue.length >= 5 ? 'success' : 'warning'" />
      <n-input v-model:value="patternValue" placeholder="Numbers only"
        :status="/^\d+$/.test(patternValue) ? 'success' : 'error'" />
    </n-space>
  </n-card>
</template>