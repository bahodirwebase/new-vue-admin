<script setup lang="ts">
import { 
  FilterOutline, EyeOutline, HeartOutline, ChatbubbleOutline 
} from '@vicons/ionicons5'
import { useUserProfile } from '../composables/useUserProfile'

const { recentProjects } = useUserProfile()
</script>

<template>
  <n-card class="projects-card" :bordered="false">
    <template #header>
      <div class="card-header">
        <h3>Recent Projects</h3>
        <n-button text size="small">
          <n-icon :component="FilterOutline" />
        </n-button>
      </div>
    </template>
    <div class="projects-grid">
      <div 
        v-for="project in recentProjects" 
        :key="project.id"
        class="project-item"
      >
        <div class="project-image">
          <img :src="project.image" :alt="project.name" />
          <div class="project-overlay">
            <div class="project-actions">
              <n-button circle size="small" class="action-btn">
                <n-icon :component="EyeOutline" />
              </n-button>
              <n-button circle size="small" class="action-btn">
                <n-icon :component="HeartOutline" />
              </n-button>
              <n-button circle size="small" class="action-btn">
                <n-icon :component="ChatbubbleOutline" />
              </n-button>
            </div>
          </div>
        </div>
        <div class="project-info">
          <h4 class="project-name">{{ project.name }}</h4>
          <p class="project-description">{{ project.description }}</p>
          <div class="project-stats">
            <span class="stat">
              <n-icon :component="HeartOutline" />
              {{ project.likes }}
            </span>
            <span class="stat">
              <n-icon :component="ChatbubbleOutline" />
              {{ project.comments }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </n-card>
</template>

<style scoped>
.projects-card {
  transition: all 0.3s ease;
}

.projects-card:hover {
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

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.project-item {
  background: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.project-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-item:hover .project-image img {
  transform: scale(1.05);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-item:hover .project-overlay {
  opacity: 1;
}

.project-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  background: rgba(255, 255, 255, 0.9);
  color: var(--text-primary);
  border: none;
}

.action-btn:hover {
  background: white;
  transform: scale(1.1);
}

.project-info {
  padding: 1.5rem;
}

.project-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.project-description {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.project-stats {
  display: flex;
  gap: 1rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.stat .n-icon {
  font-size: 1rem;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .project-image {
    height: 150px;
  }
  
  .project-info {
    padding: 1rem;
  }
}
</style>
