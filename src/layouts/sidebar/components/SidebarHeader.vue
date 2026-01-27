<script setup lang="ts">
const isCollapsed = defineModel<boolean>("collapsed", {
  default: false,
});
</script>
<template>
  <div class="sidebar-header">
    <div class="logo-container">
      <div class="logo-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2 17L12 22L22 17"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2 12L12 17L22 12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <transition name="fade">
        <span v-if="!isCollapsed" class="logo-text">Manga</span>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.sidebar-header {
  height: 64px;
  padding: 0 16px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  background: var(--bg-primary);
  z-index: 101;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  justify-content: center;
}

.logo-icon {
  width: 32px;
  height: 32px;
  color: #6366f1;
  flex-shrink: 0;
}
.logo-text {
  font-family: var(--font-secondary);
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  white-space: nowrap;
  transition:
    opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
@media (max-width: 768px) {
  .sidebar-header {
    padding: 0 12px;
  }

  .logo-text {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .sidebar-header {
    padding: 0 8px;
  }

  .logo-icon {
    width: 28px;
    height: 28px;
  }

  .logo-text {
    font-size: 18px;
  }
}
</style>
