<template>
  <div class="customizer-sidebar" :class="{ 'open': isOpen }">
    <div class="customizer-header">
      <h3>Theme Settings</h3>
      <n-button quaternary circle @click="closeSidebar">
        <template #icon>
          <n-icon :component="CloseOutline" :size="18" />
        </template>
      </n-button>
    </div>
    
    <div class="customizer-content">
      <n-space vertical :size="16">
        <div class="setting-group">
          <h4>Display Mode</h4>
          <n-switch :value="themeStore.isDark" @update:value="themeStore.setDark">
            <template #checked>Dark Mode</template>
            <template #unchecked>Light Mode</template>
          </n-switch>
        </div>

        <div class="setting-group">
          <h4>Layout</h4>
          <n-switch :value="themeStore.isBoxed" @update:value="themeStore.setBoxed">
            <template #checked>Boxed Layout</template>
            <template #unchecked>Full Width</template>
          </n-switch>
        </div>

        <div class="setting-group">
          <h4>Sidebar</h4>
          <n-switch :value="themeStore.isMiniSidebar" @update:value="themeStore.setMiniSidebar">
            <template #checked>Mini Sidebar</template>
            <template #unchecked>Full Sidebar</template>
          </n-switch>
        </div>

        <div class="setting-group">
          <h4>Theme Style</h4>
          <n-switch :value="themeStore.isBordered" @update:value="themeStore.setBordered">
            <template #checked>Bordered Theme</template>
            <template #unchecked>Shadow Theme</template>
          </n-switch>
        </div>

        <n-divider />

        <div class="setting-group">
          <h4>Primary Colors</h4>
          <div class="color-options">
            <div 
              v-for="color in primaryColors" 
              :key="color.name"
              class="color-option"
              :class="{ 'active': selectedColor === color.name }"
              :style="{ backgroundColor: color.value }"
              @click="selectColor(color)"
            >
              <span class="color-name">{{ color.name }}</span>
            </div>
          </div>
        </div>
      </n-space>
    </div>
  </div>
  
  <!-- Overlay -->
  <div v-if="isOpen" class="customizer-overlay" @click="closeSidebar"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CloseOutline } from '@vicons/ionicons5'
import { useThemeStore } from '@/stores/theme'

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const themeStore = useThemeStore()
const selectedColor = computed(() => {
  const color = primaryColors.find(c => c.value === themeStore.primaryColor)
  return color ? color.name : 'Default'
})

const primaryColors = [
  { name: 'Default', value: '#6366f1' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#10b981' },
  { name: 'Orange', value: '#f59e0b' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Teal', value: '#14b8a6' }
]

const closeSidebar = () => {
  emit('close')
}

const selectColor = (color: any) => {
  themeStore.setPrimaryColor(color.value)
}
</script>

<style scoped>
.customizer-sidebar {
  position: fixed;
  top: 0;
  right: -320px;
  width: 320px;
  height: 100vh;
  background: var(--bg-primary);
  border-left: 1px solid var(--border-color);
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  z-index: 1001;
  overflow-y: auto;
}

.customizer-sidebar.open {
  right: 0;
}

.customizer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.customizer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-secondary);
}

.customizer-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.customizer-content {
  padding: 20px;
}

.setting-group h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.color-options {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.color-option {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  transition: transform 0.2s ease;
  border: 2px solid transparent;
}

.color-option:hover {
  transform: scale(1.1);
}

.color-option.active {
  border-color: var(--text-primary);
}

.color-option.active::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
}

.color-name {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  color: var(--text-secondary);
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.color-option:hover .color-name {
  opacity: 1;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .customizer-sidebar {
    width: 280px;
    right: -280px;
  }
  
  .color-options {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
