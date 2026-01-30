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
    <n-space vertical :size="24">
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
</style>
