<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="page-header" :class="{ 'page-header--with-actions': $slots.actions }">
    <div class="page-header__info">
      <h1 class="page-title">{{ title }}</h1>
      <p v-if="subtitle" class="page-subtitle">{{ subtitle }}</p>
    </div>
    <slot name="actions" />
  </div>
</template>

<style scoped>
.page-header--with-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

@media (max-width: 768px) {
  .page-header--with-actions {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
