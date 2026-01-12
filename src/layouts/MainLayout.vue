<template>
  <n-layout has-sider class="main-layout">
    <AppSidebar 
      :collapsed="isCollapsed" 
      :is-mobile="isMobile"
      @toggle-sidebar="toggleSidebar"
    />
    <n-layout>
      <AppHeader @toggle-sidebar="toggleSidebar" />
      <n-layout-content :class="contentClass" :content-style="contentStyle">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </n-layout-content>
    </n-layout>
    <CustomizerButton @toggle="handleCustomizerToggle" />
    <CustomizerSidebar :is-open="isCustomizerOpen" @close="closeCustomizer" />
  </n-layout>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import CustomizerButton from '@/components/CustomizerButton.vue'
import CustomizerSidebar from '@/components/CustomizerSidebar.vue'

const themeStore = useThemeStore()
const windowWidth = ref(window.innerWidth)
const isCollapsed = ref(true)
const isCustomizerOpen = ref(false)

const isMobile = computed(() => windowWidth.value < 768)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const handleCustomizerToggle = () => {
  isCustomizerOpen.value = !isCustomizerOpen.value
}

const closeCustomizer = () => {
  isCustomizerOpen.value = false
}

onMounted(() => {
  const handleResize = () => {
    windowWidth.value = window.innerWidth
  }
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', () => {})
})

const contentClass = computed(() => {
  return themeStore.isBoxed ? 'boxed-content' : 'full-content'
})

const contentStyle = computed(() => {
  return {
    padding: isMobile.value ? '16px' : '24px',
    height: 'calc(100vh - 64px)',
    overflowY: 'auto',
    overflowX: 'hidden',
    boxSizing: 'border-box',
    width: 'auto',
    flex: '1 1 auto',
    backgroundColor: 'var(--bg-secondary)'
  }
})
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  height: 100vh;
  overflow: hidden;
  overflow-x: hidden;
  width: 100%;
}

.boxed-content {
  max-width: 1400px;
  margin: 0 auto;
}

.full-content {
  width: auto;
  flex: 1 1 auto;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .main-layout {
    overflow-x: auto;
  }
  
  .boxed-content {
    max-width: 100%;
    padding: 0 8px;
  }
}

@media (max-width: 480px) {
  .boxed-content {
    padding: 0 4px;
  }
}
</style>
