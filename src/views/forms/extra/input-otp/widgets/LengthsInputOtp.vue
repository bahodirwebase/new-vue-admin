<script setup lang="ts">
import { ref } from 'vue'

const fourDigitValue = ref('')
const sixDigitValue = ref('')
const eightDigitValue = ref('')
</script>

<template>
  <n-card title="OTP Input with Different Lengths">
    <n-space vertical :size="16">
      <n-space vertical :size="8">
        <span>4 digits:</span>
        <n-input-otp v-model:value="fourDigitValue" :length="4" />
      </n-space>
      <n-space vertical :size="8">
        <span>6 digits:</span>
        <n-input-otp v-model:value="sixDigitValue" :length="6" />
      </n-space>
      <n-space vertical :size="8">
        <span>8 digits:</span>
        <n-input-otp v-model:value="eightDigitValue" :length="8" />
      </n-space>
    </n-space>
  </n-card>
</template>


