<script setup lang="ts">
import { NSpace } from 'naive-ui'
import { COLOR_COMBINATIONS, MULTICOLOR_GRADIENTS, EXAMPLE_TEXTS } from '../constants'

const createGradientStyle = (colors: string[]) => ({
  background: `linear-gradient(90deg, ${colors.map((color, index) => `${color} ${(index * 100) / (colors.length - 1)}%`).join(', ')})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
})
</script>

<template>
  <n-space vertical :size="16">
    <div class="example-section">
      <h3>Two Color Gradients</h3>
      <n-space vertical :size="12">
        <div 
          class="gradient-text" 
          :style="createGradientStyle(COLOR_COMBINATIONS.purpleToViolet)"
        >
          {{ EXAMPLE_TEXTS.purpleToViolet }}
        </div>
        <div 
          class="gradient-text" 
          :style="createGradientStyle(COLOR_COMBINATIONS.pinkToRed)"
        >
          {{ EXAMPLE_TEXTS.pinkToRed }}
        </div>
        <div 
          class="gradient-text" 
          :style="createGradientStyle(COLOR_COMBINATIONS.blueToCyan)"
        >
          {{ EXAMPLE_TEXTS.blueToCyan }}
        </div>
        <div 
          class="gradient-text" 
          :style="createGradientStyle(COLOR_COMBINATIONS.greenToMint)"
        >
          {{ EXAMPLE_TEXTS.greenToMint }}
        </div>
      </n-space>
    </div>

    <div class="example-section">
      <h3>Multi-color Gradients</h3>
      <n-space vertical :size="12">
        <div 
          class="gradient-text" 
          :style="createGradientStyle(MULTICOLOR_GRADIENTS.rainbow)"
        >
          {{ EXAMPLE_TEXTS.rainbow }}
        </div>
        <div 
          class="gradient-text" 
          :style="createGradientStyle(MULTICOLOR_GRADIENTS.sunset)"
        >
          {{ EXAMPLE_TEXTS.sunset }}
        </div>
      </n-space>
    </div>
  </n-space>
</template>
