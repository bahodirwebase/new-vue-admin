<script setup lang="ts">
import { NCard } from "naive-ui";
interface IProps {
  value: string;
  icon: any;
  label: string;
}
const props = defineProps<IProps>()
</script>

<template>
  <n-card>
    <h3 class="stat-value">{{ props.value }}</h3>
    <div class="stat-info">
      <n-icon class="stat-icon" size="36" :component="props.icon" />
      <span class="stat-label">{{ props.label }}</span>
    </div>
  </n-card>
</template>

<style scoped>
.n-card {
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

.n-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-secondary);
  margin: 0 0 1rem 0;
  line-height: 1;
}

.stat-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.stat-icon {
  color: var(--primary-color);
  font-weight: 800;
}

.stat-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
}


/* Responsive design */
@media (max-width: 768px) {

  .stat-value {
    font-size: 2rem;
  }
}
</style>