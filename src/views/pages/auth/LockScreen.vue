<template>
  <div class="auth-page">
    <n-card class="auth-card" title="Locked">
      <div class="user">
        <n-avatar round :size="64" :style="{ backgroundColor: 'var(--primary-color)' }">A</n-avatar>
        <div class="user-meta">
          <div class="user-name">Admin</div>
          <div class="user-email">admin@company.com</div>
        </div>
      </div>

      <n-form ref="formRef" :model="model" :rules="rules" size="large" @submit.prevent="onSubmit">
        <n-form-item path="password" label="Password">
          <n-input v-model:value="model.password" type="password" show-password-on="click" placeholder="Enter password to unlock" />
        </n-form-item>

        <n-button type="primary" block size="large" attr-type="submit" :loading="loading">Unlock</n-button>

        <div class="footer">
          <span class="muted">Not you?</span>
          <router-link class="link" :to="{ name: 'LoginSimple' }">Back to login</router-link>
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
  password: ''
})

const rules: FormRules = {
  password: [{ required: true, message: 'Password is required', trigger: ['input', 'blur'] }]
}

const onSubmit = async () => {
  const ok = await formRef.value?.validate().then(() => true).catch(() => false)
  if (!ok) return

  loading.value = true
  setTimeout(() => {
    loading.value = false
    message.success('Unlocked (demo)')
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

.user {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.user-meta {
  min-width: 0;
}

.user-name {
  font-weight: 900;
  color: var(--text-primary);
}

.user-email {
  font-size: 13px;
  color: var(--text-secondary);
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
