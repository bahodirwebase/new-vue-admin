<template>
  <div class="input-otp-demo">
    <n-space vertical :size="24">
      <n-card title="Basic OTP Input">
        <n-space vertical :size="16">
          <n-input-otp
            v-model:value="basicValue"
            :length="6"
          />
          <n-p>OTP: {{ basicValue }}</n-p>
        </n-space>
      </n-card>

      <n-card title="OTP Input with Different Lengths">
        <n-space vertical :size="16">
          <n-space vertical :size="8">
            <span>4 digits:</span>
            <n-input-otp
              v-model:value="fourDigitValue"
              :length="4"
            />
          </n-space>
          <n-space vertical :size="8">
            <span>6 digits:</span>
            <n-input-otp
              v-model:value="sixDigitValue"
              :length="6"
            />
          </n-space>
          <n-space vertical :size="8">
            <span>8 digits:</span>
            <n-input-otp
              v-model:value="eightDigitValue"
              :length="8"
            />
          </n-space>
        </n-space>
      </n-card>

      <n-card title="OTP Input with Validation">
        <n-space vertical :size="16">
          <n-input-otp
            v-model:value="validatedValue"
            :length="6"
            :on-complete="validateOtp"
          />
          <n-p>OTP: {{ validatedValue }}</n-p>
          <n-p v-if="validationMessage" :style="{ color: validationColor }">
            {{ validationMessage }}
          </n-p>
        </n-space>
      </n-card>

      <n-card title="OTP Input with Auto Focus">
        <n-space vertical :size="16">
          <n-input-otp
            v-model:value="autoFocusValue"
            :length="6"
            :auto-focus="true"
          />
          <n-p>OTP: {{ autoFocusValue }}</n-p>
        </n-space>
      </n-card>

      <n-card title="OTP Input with Separator">
        <n-space vertical :size="16">
          <n-input-otp
            v-model:value="separatedValue"
            :length="6"
            separator="-"
          />
          <n-p>OTP: {{ separatedValue }}</n-p>
        </n-space>
      </n-card>

      <n-card title="OTP Input Sizes">
        <n-space vertical :size="16">
          <n-space vertical :size="8">
            <span>Small:</span>
            <n-input-otp
              v-model:value="smallValue"
              :length="6"
              size="small"
            />
          </n-space>
          <n-space vertical :size="8">
            <span>Medium:</span>
            <n-input-otp
              v-model:value="mediumValue"
              :length="6"
              size="medium"
            />
          </n-space>
          <n-space vertical :size="8">
            <span>Large:</span>
            <n-input-otp
              v-model:value="largeValue"
              :length="6"
              size="large"
            />
          </n-space>
        </n-space>
      </n-card>

      <n-card title="Real World Example - Two-Factor Authentication">
        <n-space vertical :size="16">
          <div class="two-factor">
            <n-space vertical :size="12">
              <span>Enter the 6-digit code sent to your email:</span>
              <n-input-otp
                v-model:value="twoFactorValue"
                :length="6"
                :on-complete="handleTwoFactor"
                :auto-focus="true"
              />
            </n-space>
            <n-space vertical :size="12">
              <span>Backup code (8 digits):</span>
              <n-input-otp
                v-model:value="backupCodeValue"
                :length="8"
                :on-complete="handleBackupCode"
              />
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
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMessage } from 'naive-ui'

const message = useMessage()

// Basic OTP Input
const basicValue = ref('')

// OTP Input with Different Lengths
const fourDigitValue = ref('')
const sixDigitValue = ref('')
const eightDigitValue = ref('')

// OTP Input with Validation
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

// OTP Input with Auto Focus
const autoFocusValue = ref('')

// OTP Input with Separator
const separatedValue = ref('')

// OTP Input Sizes
const smallValue = ref('')
const mediumValue = ref('')
const largeValue = ref('')

// Real World Example - Two-Factor Authentication
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
.input-otp-demo {
  padding: 0;
}

.n-card {
  margin-bottom: 16px;
}

.n-p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
}

.two-factor {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  background: var(--bg-secondary);
}
</style>
