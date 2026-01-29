<script setup lang="ts">
import { NSpace } from 'naive-ui'
import { COLOR_COMBINATIONS, GRADIENT_ANGLES } from '../constants'

const createGradientStyle = (colors: string[], angle: number) => ({
  background: `linear-gradient(${angle}deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
})
</script>

<template>
  <n-space vertical :size="16">
    <div class="example-section">
      <h3>Different Directions</h3>
      <n-space vertical :size="12">
        <div 
          class="gradient-text" 
          :style="createGradientStyle(COLOR_COMBINATIONS.purpleToViolet, GRADIENT_ANGLES.topToBottom)"
        >
          Top to Bottom (0deg)
        </div>
        <div 
          class="gradient-text" 
          :style="createGradientStyle(COLOR_COMBINATIONS.purpleToViolet, GRADIENT_ANGLES.diagonal45)"
        >
          Diagonal (45deg)
        </div>
        <div 
          class="gradient-text" 
          :style="createGradientStyle(COLOR_COMBINATIONS.purpleToViolet, GRADIENT_ANGLES.leftToRight)"
        >
          Left to Right (90deg)
        </div>
        <div 
          class="gradient-text" 
          :style="createGradientStyle(COLOR_COMBINATIONS.purpleToViolet, GRADIENT_ANGLES.diagonal135)"
        >
          Diagonal (135deg)
        </div>
        <div 
          class="gradient-text" 
          :style="createGradientStyle(COLOR_COMBINATIONS.purpleToViolet, GRADIENT_ANGLES.bottomToTop)"
        >
          Bottom to Top (180deg)
        </div>
      </n-space>
    </div>
  </n-space>
</template>
