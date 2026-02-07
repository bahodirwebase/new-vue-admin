<template>
  <div class="cta-section">
    <div class="cta-content">
      <h2>Ready to get started?</h2>
      <p>Join thousands of satisfied customers using our platform</p>
      <div class="cta-buttons">
        <n-button type="primary" size="large" @click="handleStartFreeTrial">
          Start Free Trial
        </n-button>
        <n-button size="large" @click="handleScheduleDemo">
          Schedule Demo
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePricingActions } from '../composables/usePricingActions'

const {
  startFreeTrial,
  scheduleDemo
} = usePricingActions()

const handleStartFreeTrial = () => {
  startFreeTrial()
}

const handleScheduleDemo = () => {
  scheduleDemo()
}
</script>

<style scoped>
.cta-section {
  background: var(--bg-primary);
  border-radius: 16px;
  padding: 4rem 2rem;
  text-align: center;
  color: white;
  margin-bottom: 2rem;
}

.cta-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-buttons .n-button:first-child {
  border: none;
}

.cta-buttons .n-button:last-child {
  background: transparent;
}

.cta-buttons .n-button:last-child:hover {
  background: rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .cta-section {
    padding: 3rem 1.5rem;
  }

  .cta-content h2 {
    font-size: 2rem;
  }

  .cta-content p {
    font-size: 1rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .cta-buttons .n-button {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .cta-content h2 {
    font-size: 1.5rem;
  }

  .cta-section {
    padding: 2rem 1rem;
  }
}
</style>
