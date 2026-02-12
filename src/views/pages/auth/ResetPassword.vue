<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInst, FormItemRule, FormRules } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { LockClosedOutline } from '@vicons/ionicons5'

const message = useMessage()
const loading = ref(false)
const formRef = ref<FormInst | null>(null)

const model = reactive({
  password: '',
  confirmPassword: ''
})

const rules: FormRules = {
  password: [{ required: true, message: 'Password is required', trigger: ['input', 'blur'] }],
  confirmPassword: [
    { required: true, message: 'Please confirm password', trigger: ['input', 'blur'] },
    {
      validator: (_rule: FormItemRule, value: string) => value === model.password,
      message: 'Passwords do not match',
      trigger: ['input', 'blur']
    }
  ]
}

const onSubmit = async () => {
  const ok = await formRef.value?.validate().then(() => true).catch(() => false)
  if (!ok) return

  loading.value = true
  setTimeout(() => {
    loading.value = false
    message.success('Password reset (demo)')
  }, 700)
}
</script>

<template>
  <div class="auth-page">
    <n-card class="auth-card">
      <n-form ref="formRef" :model="model" :rules="rules" size="large" @submit.prevent="onSubmit">
        <n-form-item path="password">
          <n-input
            v-model:value="model.password"
            type="password"
            show-password-on="click"
            placeholder="New password"
            size="large"
            :input-props="{ autocomplete: 'new-password' }"
          >
            <template #prefix>
              <n-icon :component="LockClosedOutline" />
            </template>
          </n-input>
        </n-form-item>

        <n-form-item path="confirmPassword">
          <n-input
            v-model:value="model.confirmPassword"
            type="password"
            show-password-on="click"
            placeholder="Confirm new password"
            size="large"
            :input-props="{ autocomplete: 'new-password' }"
          >
            <template #prefix>
              <n-icon :component="LockClosedOutline" />
            </template>
          </n-input>
        </n-form-item>

        <n-button type="primary" block size="large" attr-type="submit" :loading="loading">
          Reset Password
        </n-button>

        <div class="footer">
          <span class="muted">Remember your password?</span>
          <router-link class="link" :to="{ name: 'LoginSimple' }">Back to login</router-link>
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
