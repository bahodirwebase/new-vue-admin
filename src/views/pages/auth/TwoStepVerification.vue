<template>
  <div class="auth-page">
    <n-card class="auth-card" :bordered="false">
      <div class="auth-header">
        <n-icon size="64" :component="ShieldCheckmarkOutline" class="auth-icon" />
        <h1 class="title">Two Step Verification</h1>
        <p class="subtitle">Enter the 6-digit code sent to your email</p>
      </div>

      <n-form ref="formRef" :model="model" :rules="rules" size="large" @submit.prevent="onSubmit">
        <n-form-item path="code" :show-label="false">
          <n-input-otp
            v-model:value="model.code"
            :length="6"
            size="large"
            @focus="onFocus"
            @blur="onBlur"
            @finish="onFinish"
            @update:value="onUpdateValue"
            block
          />
        </n-form-item>

        <n-button 
          type="primary" 
          block 
          size="large" 
          attr-type="submit" 
          :loading="loading"
          :disabled="model.code.length !== 6"
        >
          <template #icon>
            <n-icon :component="LockClosedOutline" />
          </template>
          Verify Code
        </n-button>

        <n-space justify="space-between" align="center" style="margin-top: 16px;">
          <n-button 
            text 
            @click="resendCode" 
            :disabled="resendDisabled"
            size="medium"
          >
            <template #icon>
              <n-icon :component="RefreshOutline" />
            </template>
            {{ resendDisabled ? `Resend in ${countdown}s` : 'Resend Code' }}
          </n-button>
          
          <n-button text @click="goBack" size="medium">
            <template #icon>
              <n-icon :component="ArrowBackOutline" />
            </template>
            Back to Login
          </n-button>
        </n-space>

        <n-alert 
          type="info" 
          style="margin-top: 16px;"
          :show-icon="false"
        >
          <template #icon>
            <n-icon :component="InformationCircleOutline" />
          </template>
          Didn't receive the code? Check your spam folder or request a new code.
        </n-alert>
      </n-form>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onUnmounted } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import { ShieldCheckmarkOutline, LockClosedOutline, RefreshOutline, ArrowBackOutline, InformationCircleOutline } from '@vicons/ionicons5'

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

const onFocus = (_event: FocusEvent) => {
  // OTP input focused - can be used for analytics or UX tracking
}

const onBlur = (_event: FocusEvent) => {
  // OTP input blurred - can be used for analytics or UX tracking
}

const onFinish = (_value: string) => {
  message.success('Code completed successfully!')
  // Proceed with verification logic
}

const onUpdateValue = (_value: string) => {
  // OTP value updated - can be used for real-time validation
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
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
}

.auth-card {
  width: 480px;
  max-width: 100%;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.auth-header {
  text-align: center;
  margin-bottom: 32px;
}

.auth-icon {
  color: var(--primary-color);
  margin-bottom: 16px;
}

.title {
  font-size: 32px;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 12px;
  font-family: var(--font-secondary);
  line-height: 1.2;
}

.subtitle {
  font-size: 16px;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
}



@media (max-width: 480px) {
  .auth-card {
    width: 100%;
    padding: 16px;
  }
  
  .title {
    font-size: 28px;
  }
  
  .subtitle {
    font-size: 14px;
  }
}
</style>
