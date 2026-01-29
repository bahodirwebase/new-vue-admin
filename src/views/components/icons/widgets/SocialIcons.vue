<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { NGrid, NGridItem, NIcon } from 'naive-ui'
import { SOCIAL_ICONS } from '../constants'

const windowWidth = ref(window.innerWidth)

const gridCols = computed(() => {
  if (windowWidth.value < 480) return 2
  if (windowWidth.value < 768) return 4
  return 6
})

onMounted(() => {
  const handleResize = () => {
    windowWidth.value = window.innerWidth
  }
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', () => {})
})
</script>

<template>
  <n-grid :cols="gridCols" :x-gap="16" :y-gap="16">
    <n-grid-item v-for="icon in SOCIAL_ICONS" :key="icon.name">
      <div class="icon-item">
        <div class="icon-container">
          <n-icon :component="icon.component" :size="24" />
        </div>
        <div class="icon-name">{{ icon.name }}</div>
      </div>
    </n-grid-item>
  </n-grid>
</template>
