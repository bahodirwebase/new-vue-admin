<script setup lang="ts">
import BasicInputOtp from './widgets/BasicInputOtp.vue'
import LengthsInputOtp from './widgets/LengthsInputOtp.vue'
import ValidationInputOtp from './widgets/ValidationInputOtp.vue'
import AutoFocusInputOtp from './widgets/AutoFocusInputOtp.vue'
import SeparatorInputOtp from './widgets/SeparatorInputOtp.vue'
import SizesInputOtp from './widgets/SizesInputOtp.vue'
import TwoFactorInputOtp from './widgets/TwoFactorInputOtp.vue'
</script>

<template>
  <div class="input-otp-demo">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Input OTP</h1>
        <p class="page-subtitle">One-time password input components with validation, auto-focus, and two-factor authentication</p>
      </div>
      
      <n-grid :cols="2" :x-gap="12">
        <n-gi>
          <BasicInputOtp />
          <LengthsInputOtp />
          <ValidationInputOtp />
          <AutoFocusInputOtp />
        </n-gi>
        <n-gi>
          <SeparatorInputOtp />
          <SizesInputOtp />
          <TwoFactorInputOtp />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<style scoped>
.input-otp-demo {
  padding: 0;
}

.page-title {
  font-family: var(--font-secondary);
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
}
</style>
