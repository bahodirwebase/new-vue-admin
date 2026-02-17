<template>
  <div class="initial-loading">
    <div class="loading-content">
      <div class="loading-logo">
        <div class="logo-icon" :style="{ color: logoColor }">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Top diamond shape -->
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              :stroke="logoColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <!-- Middle diamond shape -->
            <path
              d="M2 12L12 17L22 12"
              :stroke="logoColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <!-- Bottom diamond shape -->
            <path
              d="M2 17L12 22L22 17"
              :stroke="logoColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h1 class="logo-text">Byxora</h1>
      </div>
      <n-spin size="large" />
      <p class="loading-text">Loading application...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  logoColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  logoColor: '#667eea'
})

const logoColor = computed(() => props.logoColor)
</script>

<style scoped>
.initial-loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
}

.loading-logo {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
}

.logo-text {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.5px;
}

.loading-text {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-weight: 400;
}

/* Dark mode adjustments */
:global(.dark-mode) .initial-loading {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
}

/* Responsive */
@media (max-width: 768px) {
  .logo-text {
    font-size: 2rem;
  }
  
  .loading-text {
    font-size: 1rem;
  }

  .logo-icon {
    width: 56px;
    height: 56px;
  }
}

@media (max-width: 480px) {
  .logo-text {
    font-size: 1.8rem;
  }
  
  .loading-content {
    gap: 20px;
  }

  .logo-icon {
    width: 48px;
    height: 48px;
  }
}
</style>
