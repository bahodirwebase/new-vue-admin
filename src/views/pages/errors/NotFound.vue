<template>
  <div class="error-page">
    <div class="error-container">
      <div class="error-code">404</div>
      <div class="error-title">Page Not Found</div>
      <div class="error-description">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
}

.error-container {
  text-align: center;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
}

.error-code {
  font-size: 8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  line-height: 1;
}

.error-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.error-description {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 500px;
  line-height: 1.6;
  margin-left: auto;
  margin-right: auto;
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
  font-weight: 500;
  min-width: 140px;
}

.btn-primary {
  background: white;
  color: #667eea;
}

.btn-primary:hover {
  background: #f8f9fa;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: white;
  color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* Responsive Design */
@media (max-width: 768px) {
  .error-container {
    padding: 1.5rem;
  }
  
  .error-code {
    font-size: 6rem;
  }
  
  .error-title {
    font-size: 1.5rem;
  }
  
  .error-description {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }
  
  .btn-primary, .btn-secondary {
    width: 100%;
    max-width: 250px;
  }
}

@media (max-width: 480px) {
  .error-container {
    padding: 1rem;
  }
  
  .error-code {
    font-size: 4rem;
  }
  
  .error-title {
    font-size: 1.25rem;
  }
  
  .error-description {
    font-size: 0.9rem;
    margin-bottom: 1.25rem;
  }
  
  .btn-primary, .btn-secondary {
    padding: 0.6rem 1.25rem;
    font-size: 0.9rem;
    min-width: 120px;
  }
}

@media (max-width: 360px) {
  .error-container {
    padding: 0.75rem;
  }
  
  .error-code {
    font-size: 3rem;
  }
  
  .error-title {
    font-size: 1.1rem;
  }
  
  .error-description {
    font-size: 0.85rem;
  }
  
  .btn-primary, .btn-secondary {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
}
</style>
