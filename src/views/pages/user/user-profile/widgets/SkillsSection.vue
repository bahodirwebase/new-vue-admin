<script setup lang="ts">
import { AddOutline } from '@vicons/ionicons5'
import { useUserProfile } from '../composables/useUserProfile'
import { useProfileActions } from '../composables/useProfileActions'
import { SKILL_LEVEL_COLORS } from '../constants'
import CustomTag from '@/components/custom/CustomTag.vue'

const { skills } = useUserProfile()
const { editSkills } = useProfileActions()

const getSkillColor = (level: string): "default" | "primary" | "info" | "success" | "warning" | "error" => {
  return SKILL_LEVEL_COLORS[level] || 'default'
}
</script>

<template>
  <n-card class="skills-card" :bordered="false">
    <template #header>
      <div class="card-header">
        <h3>Skills</h3>
        <n-button text size="small" @click="editSkills">
          <n-icon :component="AddOutline" />
        </n-button>
      </div>
    </template>
    <div class="skills-list">
      <CustomTag 
        v-for="skill in skills" 
        :key="skill.name"
        :type="getSkillColor(skill.level)"
        size="medium"
        round
        class="skill-tag"
      >
        {{ skill.name }}
        <span class="skill-level">{{ skill.level }}</span>
      </CustomTag>
    </div>
  </n-card>
</template>

<style scoped>
.skills-card {
  transition: all 0.3s ease;
}

.skills-card:hover {
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

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skill-tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.skill-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.skill-level {
  font-size: 0.8rem;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .skills-list {
    gap: 0.5rem;
  }
  
  .skill-tag {
    font-size: 0.85rem;
    padding: 0.4rem 0.8rem;
  }
}
</style>
