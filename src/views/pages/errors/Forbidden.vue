<template>
  <div class="error-page">
    <div class="error-container">
      <div class="error-code">403</div>
      <div class="error-title">Access Forbidden</div>
      <div class="error-description">
        You don't have permission to access this page. Please contact your administrator if you think this is a mistake.
      </div>
      <div class="error-actions">
        <button class="btn-primary" @click="goHome">Go to Dashboard</button>
        <button class="btn-secondary" @click="goBack">Go Back</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/dashboard/analytical')
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
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
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
  font-size: 2rem;
  margin-bottom: 1rem;
}

.error-description {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 500px;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
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
  color: #f5576c;
}

.btn-primary:hover {
  background: #f8f9fa;
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: white;
  color: #f5576c;
}
</style>
