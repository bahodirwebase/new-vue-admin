<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { MailOutline, LockClosedOutline, LogoGoogle, LogoGithub } from '@vicons/ionicons5'

const message = useMessage()
const loading = ref(false)
const formRef = ref<FormInst | null>(null)

const model = reactive({
  email: '',
  password: '',
  remember: true
})

const rules: FormRules = {
  email: [
    { required: true, message: 'Email is required', trigger: ['input', 'blur'] },
    { type: 'email', message: 'Invalid email', trigger: ['blur', 'input'] }
  ],
  password: [{ required: true, message: 'Password is required', trigger: ['input', 'blur'] }]
}

const onSubmit = async () => {
  const ok = await formRef.value?.validate().then(() => true).catch(() => false)
  if (!ok) return

  loading.value = true
  setTimeout(() => {
    loading.value = false
    message.success('Signed in (demo)')
  }, 700)
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-container">
      <n-card class="auth-card" :shadow="true">
        <div class="auth-header">
          <div class="logo">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <h1 class="title">Welcome Back</h1>
          <p class="subtitle">Sign in to your account to continue</p>
        </div>

        <n-form ref="formRef" :model="model" :rules="rules" size="large" @submit.prevent="onSubmit">
          <n-form-item path="email">
            <n-input
              v-model:value="model.email"
              placeholder="Email address"
              size="large"
              :input-props="{ autocomplete: 'email' }"
            >
              <template #prefix>
                <n-icon :component="MailOutline" />
              </template>
            </n-input>
          </n-form-item>

          <n-form-item path="password">
            <n-input
              v-model:value="model.password"
              type="password"
              show-password-on="click"
              placeholder="Password"
              size="large"
              :input-props="{ autocomplete: 'current-password' }"
            >
              <template #prefix>
                <n-icon :component="LockClosedOutline" />
              </template>
            </n-input>
          </n-form-item>

          <div class="options">
            <n-checkbox v-model:checked="model.remember">Remember me</n-checkbox>
            <router-link class="forgot-link" :to="{ name: 'ForgotPassword' }">Forgot password?</router-link>
          </div>

          <n-button type="primary" block size="large" attr-type="submit" :loading="loading">
            Sign In
          </n-button>

          <div class="divider">
            <span>or continue with</span>
          </div>

          <div class="social-buttons">
            <n-button size="large" block class="social-btn google">
              <template #icon>
                <n-icon :component="LogoGoogle" />
              </template>
              Google
            </n-button>
            <n-button size="large" block class="social-btn github">
              <template #icon>
                <n-icon :component="LogoGithub" />
              </template>
              GitHub
            </n-button>
          </div>

          <div class="footer">
            <span class="muted">Don't have an account?</span>
            <router-link class="link" :to="{ name: 'RegisterAdvanced' }">Sign up</router-link>
          </div>
        </n-form>
      </n-card>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 24px;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  position: relative;
}

.auth-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  z-index: -1;
}

.auth-container {
  width: 100%;
  max-width: 460px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 0;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
}

.auth-header {
  text-align: center;
  margin-bottom: 20px;
}

.logo {
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
  color: var(--primary-color);
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

.auth-card {
  border-radius: 0;
  border: none;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px 0 16px;
}

.forgot-link {
  color: var(--primary-color);
  font-size: 14px;
  text-decoration: none;
}

.forgot-link:hover {
  text-decoration: underline;
}

.divider {
  text-align: center;
  margin: 16px 0;
  position: relative;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--border-color);
}

.divider span {
  background: var(--bg-primary);
  padding: 0 16px;
  color: var(--text-secondary);
  font-size: 14px;
  position: relative;
}

.social-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.social-btn.google {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
}


.social-btn.github {
  background: #24292e;
  color: #fff;
  border: 1px solid #24292e;
}

.social-btn.github:hover {
  background: #2f363d;
}

.footer {
  text-align: center;
  margin-top: 16px;
}

.link {
  color: var(--primary-color);
  font-weight: 600;
  text-decoration: none;
  margin-left: 4px;
}

.link:hover {
  text-decoration: underline;
}

.muted {
  color: var(--text-secondary);
}

@media (max-width: 480px) {
  .auth-container {
    max-width: 100%;
  }
  
  .title {
    font-size: 24px;
  }
  
  .subtitle {
    font-size: 14px;
  }
}
</style>
