<template>
  <n-card title="OTP Input with Validation">
    <n-space vertical :size="16">
      <n-input-otp v-model:value="validatedValue" :length="6" :on-complete="validateOtp" />
      <n-p>OTP: {{ validatedValue }}</n-p>
      <n-p v-if="validationMessage" :style="{ color: validationColor }">
        {{ validationMessage }}
      </n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const validatedValue = ref('')
const validationMessage = ref('')
const validationColor = ref('')

const validateOtp = (value: string) => {
  if (value === '123456') {
    validationMessage.value = '✓ Valid OTP code'
    validationColor.value = '#18a058'
  } else {
    validationMessage.value = '✗ Invalid OTP code'
    validationColor.value = '#d03050'
  }
}
</script>
