<template>
  <n-card class="social-card" :bordered="false">
    <template #header>
      <div class="card-header">
        <h3>Social Links</h3>
        <n-button text size="small" @click="editSocial">
          <n-icon :component="AddOutline" />
        </n-button>
      </div>
    </template>
    <div class="social-links">
      <a 
        v-for="link in socialLinks" 
        :key="link.platform"
        :href="link.url"
        target="_blank"
        class="social-link"
      >
        <div class="social-icon">
          <n-icon :component="link.icon" />
        </div>
        <span class="social-platform">{{ link.platform }}</span>
        <n-icon :component="ArrowForwardOutline" class="link-arrow" />
      </a>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { AddOutline, ArrowForwardOutline } from '@vicons/ionicons5'
import { useUserProfile } from '../composables/useUserProfile'
import { useProfileActions } from '../composables/useProfileActions'

const { socialLinks } = useUserProfile()
const { editSocial } = useProfileActions()
</script>

<style scoped>
.social-card {
  transition: all 0.3s ease;
}

.social-card:hover {
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

.social-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.2s ease;
  border: 1px solid var(--border-color);
}

.social-link:hover {
  background: var(--bg-primary);
  border-color: var(--primary-color);
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.social-icon {
  width: 32px;
  height: 32px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.social-platform {
  flex: 1;
  font-weight: 500;
}

.link-arrow {
  color: var(--text-secondary);
  transition: color 0.2s ease;
}

.social-link:hover .link-arrow {
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .social-link {
    padding: 0.75rem;
  }
  
  .social-icon {
    width: 28px;
    height: 28px;
  }
}
</style>
