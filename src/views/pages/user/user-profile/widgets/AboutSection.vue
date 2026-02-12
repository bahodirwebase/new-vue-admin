<script setup lang="ts">
import { CreateOutline } from '@vicons/ionicons5'
import { useUserProfile } from '../composables/useUserProfile'
import { useProfileActions } from '../composables/useProfileActions'

const { userData } = useUserProfile()
const { editAbout } = useProfileActions()
</script>

<template>
  <n-card class="about-card" :bordered="false">
    <template #header>
      <div class="card-header">
        <h3>About</h3>
        <n-button text size="small" @click="editAbout">
          <n-icon :component="CreateOutline" />
        </n-button>
      </div>
    </template>
    <p class="about-text">{{ userData.about }}</p>
    <div class="about-stats">
      <div class="stat-item">
        <span class="stat-value">{{ userData.projectsCompleted }}</span>
        <span class="stat-label">Projects</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ userData.experience }}</span>
        <span class="stat-label">Experience</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ userData.rating }}/5.0</span>
        <span class="stat-label">Rating</span>
      </div>
    </div>
  </n-card>
</template>

<style scoped>
.about-card {
  transition: all 0.3s ease;
}

.about-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
  color: var(--text-primary);
}

.about-text {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.about-stats {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.stat-item {
  text-align: center;
  flex: 1;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.stat-item:hover {
  background: var(--bg-primary);
  transform: translateY(-2px);
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 500;
}

@media (max-width: 768px) {
  .about-stats {
    flex-direction: column;
  }
  
  .stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
  }
  
  .stat-value {
    font-size: 1.25rem;
  }
}
</style>
