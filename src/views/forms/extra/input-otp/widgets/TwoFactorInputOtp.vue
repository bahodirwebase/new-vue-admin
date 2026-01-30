<template>
  <n-card title="Real World Example - Two-Factor Authentication">
    <n-space vertical :size="16">
      <div class="two-factor">
        <n-space vertical :size="12">
          <span>Enter the 6-digit code sent to your email:</span>
          <n-input-otp v-model:value="twoFactorValue" :length="6" :on-complete="handleTwoFactor"
            :auto-focus="true" />
        </n-space>
        <n-space vertical :size="12">
          <span>Backup code (8 digits):</span>
          <n-input-otp v-model:value="backupCodeValue" :length="8" :on-complete="handleBackupCode" />
        </n-space>
        <n-space :size="12">
          <n-button @click="resendCode" :loading="resendLoading">
            Resend Code
          </n-button>
          <n-button @click="useBackupCode">
            Use Backup Code
          </n-button>
        </n-space>
      </div>
      <n-p v-if="authMessage" :style="{ color: authColor }">
        {{ authMessage }}
      </n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMessage } from 'naive-ui'

const message = useMessage()
const twoFactorValue = ref('')
const backupCodeValue = ref('')
const resendLoading = ref(false)
const authMessage = ref('')
const authColor = ref('')

const handleTwoFactor = (value: string) => {
  if (value === '654321') {
    authMessage.value = '✓ Authentication successful!'
    authColor.value = '#18a058'
    message.success('Two-factor authentication successful')
  } else {
    authMessage.value = '✗ Invalid code. Please try again.'
    authColor.value = '#d03050'
    message.error('Invalid authentication code')
  }
}

const handleBackupCode = (value: string) => {
  if (value === '87654321') {
    authMessage.value = '✓ Backup code verified!'
    authColor.value = '#18a058'
    message.success('Backup code verified')
  } else {
    authMessage.value = '✗ Invalid backup code'
    authColor.value = '#d03050'
    message.error('Invalid backup code')
  }
}

const resendCode = () => {
  resendLoading.value = true
  setTimeout(() => {
    resendLoading.value = false
    message.success('Code sent to your email')
    authMessage.value = 'New code sent to your email'
    authColor.value = '#2080f0'
  }, 2000)
}

const useBackupCode = () => {
  message.info('Please enter your 8-digit backup code')
}
</script>

<style scoped>
.two-factor {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  background: var(--bg-secondary);
}
</style>
