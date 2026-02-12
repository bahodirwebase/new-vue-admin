<script setup lang="ts">
import { ref } from 'vue'

const separatedValue = ref('')
</script>

<template>
  <n-card title="OTP Input with Separator">
    <n-space vertical :size="16">
      <n-input-otp v-model:value="separatedValue" :length="6" separator="-" />
      <n-p>OTP: {{ separatedValue }}</n-p>
    </n-space>
  </n-card>
</template>


