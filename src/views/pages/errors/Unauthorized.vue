<template>
  <div class="error-page">
    <div class="error-container">
      <div class="error-code">401</div>
      <div class="error-title">Unauthorized</div>
      <div class="error-description">
        You need to log in to access this page. Please authenticate to continue.
      </div>
      <div class="error-actions">
        <button class="btn-primary" @click="goLogin">Go to Login</button>
        <button class="btn-secondary" @click="goBack">Go Back</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goLogin = () => {
  router.push('/pages/authentication/login-simple')
}

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--color-warning) 0%, var(--color-success) 100%);
  color: white;
}

.error-container {
  text-align: center;
  padding: 2rem;
}

.error-code {
  font-size: 8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.error-title {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.error-description {
  font-size: 1.125rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary, .btn-secondary {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: white;
  color: var(--color-warning);
}

.btn-primary:hover {
  background: var(--bg-secondary);
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: white;
  color: var(--color-warning);
}

/* Dark mode adjustments */
[data-theme="dark"] .error-page {
  background: linear-gradient(135deg, var(--color-warning) 0%, var(--color-success) 100%);
}

[data-theme="dark"] .btn-primary {
  background: var(--bg-primary);
  color: var(--text-primary);
}

[data-theme="dark"] .btn-primary:hover {
  background: var(--bg-secondary);
}

[data-theme="dark"] .btn-secondary {
  color: var(--text-primary);
  border-color: var(--text-primary);
}

[data-theme="dark"] .btn-secondary:hover {
  background: var(--text-primary);
  color: var(--bg-primary);
}
</style>
