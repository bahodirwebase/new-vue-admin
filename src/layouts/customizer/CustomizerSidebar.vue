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
          <div class="card-options">
            <div 
              class="option-card"
              :class="{ 'active': themeStore.isDark }"
              @click="themeStore.setDark(true)"
            >
              <n-icon :component="MoonOutline" :size="20" />
              <span>Dark Mode</span>
            </div>
            <div 
              class="option-card"
              :class="{ 'active': !themeStore.isDark }"
              @click="themeStore.setDark(false)"
            >
              <n-icon :component="SunnyOutline" :size="20" />
              <span>Light Mode</span>
            </div>
          </div>
        </div>

        <div class="setting-group">
          <h4>Layout</h4>
          <div class="card-options">
            <div 
              class="option-card"
              :class="{ 'active': themeStore.isBoxed }"
              @click="themeStore.setBoxed(true)"
            >
              <n-icon :component="DesktopOutline" :size="20" />
              <span>Boxed Layout</span>
            </div>
            <div 
              class="option-card"
              :class="{ 'active': !themeStore.isBoxed }"
              @click="themeStore.setBoxed(false)"
            >
              <n-icon :component="ExpandOutline" :size="20" />
              <span>Full Width</span>
            </div>
          </div>
        </div>

        <div class="setting-group">
          <h4>Sidebar</h4>
          <div class="card-options">
            <div 
              class="option-card"
              :class="{ 'active': themeStore.isMiniSidebar }"
              @click="themeStore.setMiniSidebar(true)"
            >
              <n-icon :component="ContractOutline" :size="20" />
              <span>Mini Sidebar</span>
            </div>
            <div 
              class="option-card"
              :class="{ 'active': !themeStore.isMiniSidebar }"
              @click="themeStore.setMiniSidebar(false)"
            >
              <n-icon :component="ExpandOutline" :size="20" />
              <span>Full Sidebar</span>
            </div>
          </div>
        </div>

        <div class="setting-group">
          <h4>Theme Style</h4>
          <div class="card-options">
            <div 
              class="option-card"
              :class="{ 'active': themeStore.isBordered }"
              @click="themeStore.setBordered(true)"
            >
              <n-icon :component="SquareOutline" :size="20" />
              <span>Bordered Theme</span>
            </div>
            <div 
              class="option-card"
              :class="{ 'active': !themeStore.isBordered }"
              @click="themeStore.setBordered(false)"
            >
              <n-icon :component="EllipseOutline" :size="20" />
              <span>Shadow Theme</span>
            </div>
          </div>
        </div>

        <div class="setting-group">
          <h4>Winter Mode ({{ themeStore.isWinterMode }})</h4>
          <div class="card-options">
            <div 
              class="option-card"
              :class="{ 'active': themeStore.isWinterMode }"
              @click="toggleWinterMode(true)"
            >
              <n-icon :component="SnowOutline" :size="20" />
              <span>❄️ Winter</span>
            </div>
            <div 
              class="option-card"
              :class="{ 'active': !themeStore.isWinterMode }"
              @click="toggleWinterMode(false)"
            >
              <n-icon :component="SunnyOutline" :size="20" />
              <span>🌞 Normal</span>
            </div>
          </div>
        </div>

        <n-divider />

        <div class="setting-group">
          <h4>Page Animation {{ selectedAnimation }}</h4>
          <div class="animation-options">
            <div 
              v-for="animation in animations" 
              :key="animation.class"
              class="animation-card"
              :class="{ 'active': selectedAnimation === animation.class }"
              @click="selectAnimation(animation)"
            >
              <div class="animation-preview">
                <div :class="`preview-${animation.class}`"></div>
              </div>
              <span class="animation-name">{{ animation.name }}</span>
            </div>
          </div>
        </div>

        <n-divider />

        <div class="setting-group">
          <h4>Primary Colors</h4>
          <div class="color-cards">
            <div 
              v-for="color in primaryColors" 
              :key="color.name"
              class="color-card"
              :class="{ 'active': selectedColor === color.name }"
              @click="selectColor(color)"
            >
              <div class="color-preview" :style="{ backgroundColor: color.value }"></div>
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
import { 
  CloseOutline, 
  MoonOutline, 
  SunnyOutline, 
  DesktopOutline, 
  ExpandOutline, 
  ContractOutline,
  SquareOutline,
  EllipseOutline,
  SnowOutline
} from '@vicons/ionicons5'
import { useThemeStore } from '@/stores/theme'

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const themeStore = useThemeStore()

// Debug winter mode state
console.log('Winter mode state:', themeStore.isWinterMode)

const animations = [
  { name: 'Fade', class: 'fade' },
  { name: 'Slide Left', class: 'slide-left' },
  { name: 'Slide Right', class: 'slide-right' },
  { name: 'Slide Up', class: 'slide-up' },
  { name: 'Slide Down', class: 'slide-down' },
  { name: 'Zoom', class: 'zoom' }
]

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

const selectedColor = computed(() => {
  const color = primaryColors.find(c => c.value === themeStore.primaryColor)
  return color ? color.name : 'Default'
})

const selectedAnimation = computed(() => {
  const animation = animations.find(a => a.class === themeStore.pageAnimation)
  const result = animation ? animation.class : 'fade'
  return result
})

const closeSidebar = () => {
  emit('close')
}

const selectColor = (color: any) => {
  themeStore.setPrimaryColor(color.value)
}

const selectAnimation = (animation: any) => {
  console.log('Selected animation:', animation.class)
  themeStore.setPageAnimation(animation.class)
}

// Debug winter mode
const toggleWinterMode = (value: boolean) => {
  console.log('Toggle winter mode:', value)
  themeStore.setWinterMode(value)
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

.card-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.option-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 12px;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(--bg-secondary);
  gap: 8px;
  min-height: 80px;
}

.option-card:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
}

.option-card.active {
  border-color: var(--primary-color);
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color) 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.option-card.active span {
  color: white;
  font-weight: 500;
}

.option-card span {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-primary);
  text-align: center;
  line-height: 1.2;
}

.color-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.color-card {
  display: flex;
  align-items: center;
  padding: 12px;
  border: 2px solid var(--border-color);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(--bg-secondary);
  gap: 10px;
}

.color-card:hover {
  border-color: var(--primary-color);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.15);
}

.color-card.active {
  border-color: var(--primary-color);
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color) 100%);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.color-card.active .color-name {
  color: white;
  font-weight: 500;
}

.color-preview {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.color-name {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.2;
}

.animation-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.animation-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  border: 2px solid var(--border-color);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(--bg-secondary);
  gap: 8px;
}

.animation-card:hover {
  border-color: var(--primary-color);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.15);
}

.animation-card.active {
  border-color: var(--primary-color);
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color) 100%);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.animation-card.active .animation-name {
  color: white;
  font-weight: 500;
}

.animation-preview {
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: var(--bg-primary);
}

.animation-preview div {
  width: 20px;
  height: 20px;
  background: var(--primary-color);
  border-radius: 4px;
}

.animation-name {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-primary);
  text-align: center;
  line-height: 1.2;
}

/* Animation previews */
.preview-fade {
  animation: previewFade 2s infinite;
}

.preview-slide-left {
  animation: previewSlideLeft 2s infinite;
}

.preview-slide-right {
  animation: previewSlideRight 2s infinite;
}

.preview-slide-up {
  animation: previewSlideUp 2s infinite;
}

.preview-slide-down {
  animation: previewSlideDown 2s infinite;
}

.preview-zoom {
  animation: previewZoom 2s infinite;
}

@keyframes previewFade {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

@keyframes previewSlideLeft {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(-10px); }
}

@keyframes previewSlideRight {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(10px); }
}

@keyframes previewSlideUp {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes previewSlideDown {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(10px); }
}

@keyframes previewZoom {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(0.8); }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .customizer-sidebar {
    width: 280px;
    right: -280px;
  }
  
  .card-options {
    grid-template-columns: 1fr;
  }
  
  .color-cards {
    grid-template-columns: 1fr;
  }

  .animation-options {
    grid-template-columns: 1fr;
  }
  
  .option-card {
    flex-direction: row;
    justify-content: flex-start;
    padding: 12px;
    min-height: 60px;
  }
  
  .option-card span {
    text-align: left;
  }
}
</style>
