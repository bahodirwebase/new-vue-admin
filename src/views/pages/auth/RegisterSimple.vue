<template>
  <div class="auth-page">
    <n-card class="auth-card" title="Register">
      <n-form ref="formRef" :model="model" :rules="rules" size="large" @submit.prevent="onSubmit">
        <n-form-item path="name" label="Full name">
          <n-input v-model:value="model.name" placeholder="John Doe" />
        </n-form-item>

        <n-form-item path="email" label="Email">
          <n-input v-model:value="model.email" placeholder="you@example.com" />
        </n-form-item>

        <n-form-item path="password" label="Password">
          <n-input v-model:value="model.password" type="password" show-password-on="click" placeholder="••••••••" />
        </n-form-item>

        <n-form-item path="confirmPassword" label="Confirm password">
          <n-input v-model:value="model.confirmPassword" type="password" show-password-on="click" placeholder="••••••••" />
        </n-form-item>

        <n-form-item path="agree">
          <n-checkbox v-model:checked="model.agree">
            I agree to the Terms & Privacy
          </n-checkbox>
        </n-form-item>

        <n-button type="primary" block size="large" attr-type="submit" :loading="loading">Create account</n-button>

        <div class="footer">
          <span class="muted">Already have an account?</span>
          <router-link class="link" :to="{ name: 'LoginSimple' }">Sign in</router-link>
        </div>
      </n-form>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInst, FormItemRule, FormRules } from 'naive-ui'
import { useMessage } from 'naive-ui'

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
  background: var(--bg-secondary);
}

.auth-card {
  width: 460px;
  max-width: 100%;
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
