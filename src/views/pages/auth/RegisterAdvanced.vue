<template>
  <div class="auth-page">
    <div class="auth-container">
      <n-card class="auth-card" :bordered="false" :shadow="true">
        <div class="auth-header">
          <div class="logo">
            <n-icon size="48" :component="LayersOutline" />
          </div>
          <h1 class="title">Create Account</h1>
          <p class="subtitle">Join us today and get started</p>
        </div>

        <n-form ref="formRef" :model="model" :rules="rules" size="large" @submit.prevent="onSubmit" >
          <n-form-item path="name" :show-label="false" >
            <n-input
              v-model:value="model.name"
              placeholder="Full name"
              size="large"
              :input-props="{ autocomplete: 'name' }"
              clearable
            >
              <template #prefix>
                <n-icon :component="PersonOutline" />
              </template>
            </n-input>
          </n-form-item>

          <n-form-item path="email" :show-label="false">
            <n-input
              v-model:value="model.email"
              placeholder="Email address"
              size="large"
              :input-props="{ autocomplete: 'email' }"
              clearable
            >
              <template #prefix>
                <n-icon :component="MailOutline" />
              </template>
            </n-input>
          </n-form-item>

          <n-form-item path="password" :show-label="false">
            <n-input
              v-model:value="model.password"
              type="password"
              show-password-on="click"
              placeholder="Password"
              size="large"
              :input-props="{ autocomplete: 'new-password' }"
              clearable
            >
              <template #prefix>
                <n-icon :component="LockClosedOutline" />
              </template>
            </n-input>
          </n-form-item>

          <n-form-item path="confirmPassword" :show-label="false">
            <n-input
              v-model:value="model.confirmPassword"
              type="password"
              show-password-on="click"
              placeholder="Confirm password"
              size="large"
              :input-props="{ autocomplete: 'new-password' }"
              clearable
            >
              <template #prefix>
                <n-icon :component="LockClosedOutline" />
              </template>
            </n-input>
          </n-form-item>

          <n-form-item path="agree">
            <n-checkbox v-model:checked="model.agree" size="medium">
              I agree to the <n-button text type="primary" size="small">Terms of Service</n-button> and <n-button text type="primary" size="small">Privacy Policy</n-button>
            </n-checkbox>
          </n-form-item>

          <n-button 
            type="primary" 
            block 
            size="large" 
            attr-type="submit" 
            :loading="loading"
            :disabled="!model.agree"
          >
            <template #icon>
              <n-icon :component="PersonAddOutline" />
            </template>
            Create Account
          </n-button>

          <n-divider style="margin: 20px 0;">
            <span style="color: var(--text-secondary); font-size: 14px;">or sign up with</span>
          </n-divider>

          <n-space vertical :size="12" >
            <n-button 
              size="large" 
              block 
              class="social-btn google"
              @click="handleSocialLogin('google')"
            >
              <template #icon>
                <n-icon :component="LogoGoogle" />
              </template>
              Continue with Google
            </n-button>
            
            <n-button 
              size="large" 
              block 
              class="social-btn github"
              @click="handleSocialLogin('github')"
            >
              <template #icon>
                <n-icon :component="LogoGithub" />
              </template>
              Continue with GitHub
            </n-button>
          </n-space>

          <div class="footer">
            <span class="muted">Already have an account?</span>
            <router-link class="link" :to="{ name: 'LoginAdvanced' }">Sign in</router-link>
          </div>
        </n-form>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInst, FormItemRule, FormRules } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import { PersonOutline, MailOutline, LockClosedOutline, LogoGoogle, LogoGithub, LayersOutline, PersonAddOutline } from '@vicons/ionicons5'

const router = useRouter()
const message = useMessage()
const loading = ref(false)
const formRef = ref<FormInst | null>(null)

const model = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  agree: false
})

const rules: FormRules = {
  name: [{ required: true, message: 'Name is required', trigger: ['input', 'blur'] }],
  email: [
    { required: true, message: 'Email is required', trigger: ['input', 'blur'] },
    { type: 'email', message: 'Invalid email', trigger: ['blur', 'input'] }
  ],
  password: [{ required: true, message: 'Password is required', trigger: ['input', 'blur'] }],
  confirmPassword: [
    { required: true, message: 'Please confirm password', trigger: ['input', 'blur'] },
    {
      validator: (_rule: FormItemRule, value: string) => value === model.password,
      message: 'Passwords do not match',
      trigger: ['input', 'blur']
    }
  ],
  agree: [
    {
      validator: (_rule: FormItemRule, value: boolean) => value === true,
      message: 'You must accept the terms',
      trigger: 'change'
    }
  ]
}

const onSubmit = async () => {
  const ok = await formRef.value?.validate().then(() => true).catch(() => false)
  if (!ok) return

  loading.value = true
  setTimeout(() => {
    loading.value = false
    message.success('Account created (demo)')
    router.push({ name: 'LoginAdvanced' })
  }, 700)
}

const handleSocialLogin = (provider: string) => {
  message.info(`Continue with ${provider} (demo)`)
}
</script>

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
  max-width: 480px;
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
  margin-bottom: 32px;
}

.logo {
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 32px;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 8px;
  font-family: var(--font-secondary);
  line-height: 1.2;
}

.subtitle {
  font-size: 16px;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
}

.auth-card {
  border-radius: 0;
  border: none;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  padding: 32px;
}

.terms-link {
  color: var(--primary-color);
  text-decoration: none;
}

.terms-link:hover {
  text-decoration: underline;
}

.social-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.social-btn.google {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
}

.social-btn.google:hover {
  transform: translateY(-1px);
}

.social-btn.github {
  background: #24292e;
  color: #fff;
  border: 1px solid #24292e;
}

.social-btn.github:hover {
  background: #2f363d;
  transform: translateY(-1px);
}

.footer {
  text-align: center;
  margin-top: 24px;
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

@media (max-width: 768px) {
  .auth-container {
    max-width: 100%;
    position: static;
    height: auto;
    padding: 0;
  }
  
  .auth-card {
    height: auto;
    border-radius: 16px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    font-size: 28px;
  }
  
  .subtitle {
    font-size: 14px;
  }
}
</style>
