<template>
  <div class="customizer-button" @click="toggleCustomizer">
    <n-icon size="20" class="settings-icon">
      <Settings />
    </n-icon>
  </div>
</template>

<script setup lang="ts">
import { Settings } from '@vicons/ionicons5'

const emit = defineEmits<{
  toggle: []
}>()

const toggleCustomizer = () => {
  emit('toggle')
}
</script>

<style scoped>
.customizer-button {
  position: fixed;
  right: 0;
  top: 300px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px 0 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  z-index: 1000;
}

.customizer-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.settings-icon {
  color: white;
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Dark mode adjustments */
.dark-mode .customizer-button {
  background: linear-gradient(135deg, #4c1d95 0%, #5b21b6 100%);
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
}

.dark-mode .customizer-button:hover {
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.6);
}
</style>
