<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { useMessage } from 'naive-ui'

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
    <n-card class="auth-card" title="Login">
      <n-form ref="formRef" :model="model" :rules="rules" size="large" @submit.prevent="onSubmit">
        <n-form-item path="email" label="Email">
          <n-input v-model:value="model.email" placeholder="you@example.com" />
        </n-form-item>

        <n-form-item path="password" label="Password">
          <n-input v-model:value="model.password" type="password" show-password-on="click" placeholder="••••••••" />
        </n-form-item>

        <div class="row">
          <n-checkbox v-model:checked="model.remember">Remember me</n-checkbox>
          <router-link class="link" :to="{ name: 'ForgotPassword' }">Forgot password?</router-link>
        </div>

        <n-button type="primary" block size="large" attr-type="submit" :loading="loading">Sign in</n-button>

        <div class="footer">
          <span class="muted">Don't have an account?</span>
          <router-link class="link" :to="{ name: 'RegisterSimple' }">Create account</router-link>
        </div>
      </n-form>
    </n-card>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: var(--bg-secondary);
}

.auth-card {
  width: 420px;
  max-width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.auth-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0 16px 0;
  flex-wrap: wrap;
  gap: 8px;
}

.footer {
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.link {
  color: var(--primary-color);
  font-weight: 700;
  text-decoration: none;
  transition: color 0.2s ease;
}

.link:hover {
  color: var(--primary-color-hover);
}

/* Responsive Design */
@media (max-width: 768px) {
  .auth-page {
    padding: 16px;
  }
  
  .auth-card {
    width: 100%;
    max-width: 400px;
  }
  
  .row {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .footer {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .auth-page {
    padding: 12px;
  }
  
  .auth-card {
    border-radius: 12px;
  }
  
  .footer {
    font-size: 0.9rem;
  }
}

@media (max-width: 360px) {
  .auth-page {
    padding: 8px;
  }
  
  .auth-card {
    max-width: 100%;
  }
}

.muted {
  color: var(--text-secondary);
}
</style>
