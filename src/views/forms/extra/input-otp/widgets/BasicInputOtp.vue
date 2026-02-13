<script setup lang="ts">
import { ref } from 'vue'

const basicValue = ref([])
</script>

<template>
  <n-card title="Basic OTP Input">
    <n-space vertical :size="16">
      <n-input-otp v-model:value="basicValue" :length="6" />
      <n-p>OTP: {{ basicValue.join('') }}</n-p>
    </n-space>
  </n-card>
</template>


