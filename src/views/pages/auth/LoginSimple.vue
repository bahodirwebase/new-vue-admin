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

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0 16px 0;
}

.footer {
  margin-top: 16px;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.link {
  color: var(--primary-color);
  font-weight: 700;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.muted {
  color: var(--text-secondary);
}
</style>
