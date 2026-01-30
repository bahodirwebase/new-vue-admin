<template>
  <n-card title="Dynamic Input with Validation">
    <n-space vertical :size="16">
      <n-dynamic-input v-model:value="validatedValue" placeholder="Enter valid email"
        :on-create="validateEmail" />
      <n-p>Valid emails: {{ JSON.stringify(validatedValue) }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const validatedValue = ref(['valid@example.com'])

const validateEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value)) {
    return null
  }
  return value
}
</script>
