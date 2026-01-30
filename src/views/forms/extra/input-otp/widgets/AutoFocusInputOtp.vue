<template>
  <n-card title="OTP Input with Auto Focus">
    <n-space vertical :size="16">
      <n-input-otp v-model:value="autoFocusValue" :length="6" :auto-focus="true" />
      <n-p>OTP: {{ autoFocusValue }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const autoFocusValue = ref('')
</script>
