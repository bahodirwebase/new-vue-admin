<script setup lang="ts">
import { Settings } from '@vicons/ionicons5'
import { useThemeStore } from '@/stores/theme'

const emit = defineEmits<{
  toggle: []
}>()

const themeStore = useThemeStore()

const toggleCustomizer = () => {
  emit('toggle')
}
</script>
<template>
  <div class="customizer-button" @click="toggleCustomizer" :style="{ background: `linear-gradient(135deg, ${themeStore.primaryColor} 0%, ${themeStore.primaryColor}dd 100%)`, boxShadow: `0 4px 15px ${themeStore.primaryColor}66` }">
    <n-icon size="20" class="settings-icon">
      <Settings />
    </n-icon>
  </div>
</template>

<style scoped>
.customizer-button {
  position: fixed;
  right: 0;
  top: 300px;
  width: 50px;
  height: 50px;
  border-radius: 8px 0 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;
}

.customizer-button:hover {
  transform: scale(1.1);
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
</style>
