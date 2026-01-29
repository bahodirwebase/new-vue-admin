<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { NGrid, NGridItem } from 'naive-ui'

const windowWidth = ref(window.innerWidth)

const gridCols = computed(() => {
  if (windowWidth.value < 480) return 1
  if (windowWidth.value < 768) return 2
  return 2
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
  <n-grid :cols="gridCols" :x-gap="24" :y-gap="16">
    <n-grid-item>
      <h4>Unordered List</h4>
      <ul class="list-disc">
        <li>First item</li>
        <li>Second item
          <ul class="list-circle">
            <li>Nested item 1</li>
            <li>Nested item 2</li>
          </ul>
        </li>
        <li>Third item</li>
      </ul>
    </n-grid-item>
    
    <n-grid-item>
      <h4>Ordered List</h4>
      <ol class="list-decimal">
        <li>First step</li>
        <li>Second step
          <ol class="list-alpha">
            <li>Sub-step A</li>
            <li>Sub-step B</li>
          </ol>
        </li>
        <li>Third step</li>
      </ol>
    </n-grid-item>
  </n-grid>
</template>
