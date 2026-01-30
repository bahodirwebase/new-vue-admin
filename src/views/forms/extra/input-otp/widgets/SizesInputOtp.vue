<template>
  <n-card title="OTP Input Sizes">
    <n-space vertical :size="16">
      <n-space vertical :size="8">
        <span>Small:</span>
        <n-input-otp v-model:value="smallValue" :length="6" size="small" />
      </n-space>
      <n-space vertical :size="8">
        <span>Medium:</span>
        <n-input-otp v-model:value="mediumValue" :length="6" size="medium" />
      </n-space>
      <n-space vertical :size="8">
        <span>Large:</span>
        <n-input-otp v-model:value="largeValue" :length="6" size="large" />
      </n-space>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const smallValue = ref('')
const mediumValue = ref('')
const largeValue = ref('')
</script>
