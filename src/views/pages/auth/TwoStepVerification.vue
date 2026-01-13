<template>
  <div class="auth-page">
    <n-card class="auth-card">
      <div class="auth-header">
        <h1 class="title">Two Step Verification</h1>
        <p class="subtitle">Enter the 6-digit code sent to your email</p>
      </div>

      <n-form ref="formRef" :model="model" :rules="rules" size="large" @submit.prevent="onSubmit">
        <n-form-item path="code">
          <n-input-otp
            v-model:value="model.code"
            :length="6"
            size="large"
            class="otp-input"
            @focus="onFocus"
            @blur="onBlur"
            @finish="onFinish"
            @update:value="onUpdateValue"
            block
          />
        </n-form-item>

        <n-button type="primary" block size="large" attr-type="submit" :loading="loading">
          Verify Code
        </n-button>

        <div class="actions">
          <n-button text @click="resendCode" :disabled="resendDisabled">
            {{ resendDisabled ? `Resend in ${countdown}s` : 'Resend Code' }}
          </n-button>
          <n-button text @click="goBack">
            Back to Login
          </n-button>
        </div>
      </n-form>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onUnmounted } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'

const router = useRouter()
const message = useMessage()
const loading = ref(false)
const formRef = ref<FormInst | null>(null)

const model = reactive({
  code: ''
})

const rules: FormRules = {
  code: [
    { 
      required: true, 
      message: 'Verification code is required', 
      trigger: ['input', 'blur'],
      validator: () => model.code.length === 6
    }
  ]
}

const countdown = ref(60)
const resendDisabled = ref(true)
let countdownTimer: number | null = null

const onFocus = (event: FocusEvent) => {
  console.log('OTP focused:', event)
}

const onBlur = (event: FocusEvent) => {
  console.log('OTP blurred:', event)
}

const onFinish = (value: string) => {
  console.log('OTP finished:', value)
  message.success('Code completed successfully!')
}

const onUpdateValue = (value: string) => {
  console.log('OTP updated:', value)
}

const startCountdown = () => {
  countdown.value = 60
  resendDisabled.value = true
  
  countdownTimer = window.setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(countdownTimer!)
      resendDisabled.value = false
    }
  }, 1000)
}

const resendCode = () => {
  if (!resendDisabled.value) {
    message.info('Code resent (demo)')
    startCountdown()
  }
}

const goBack = () => {
  router.push({ name: 'LoginSimple' })
}

const onSubmit = async () => {
  const ok = await formRef.value?.validate().then(() => true).catch(() => false)
  if (!ok) return

  loading.value = true
  setTimeout(() => {
    loading.value = false
    message.success('Verification successful (demo)')
    router.push({ name: 'LoginSimple' })
  }, 700)
}

onMounted(() => {
  startCountdown()
})

onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: var(--bg-primary);
}

.auth-card {
  width: 420px;
  max-width: 100%;
}

.auth-header {
  text-align: center;
  margin-bottom: 20px;
}

.title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 8px;
  font-family: var(--font-secondary);
}

.subtitle {
  font-size: 16px;
  color: var(--text-secondary);
  margin: 0;
}

.otp-input {
  margin-bottom: 24px;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

@media (max-width: 480px) {
  .auth-card {
    width: 100%;
  }
  
  .title {
    font-size: 24px;
  }
  
  .subtitle {
    font-size: 14px;
  }
}
</style>
