<script setup lang="ts">
import { NSpace } from 'naive-ui'
import { COLOR_COMBINATIONS, EXAMPLE_TEXTS } from '../constants'

const createGradientStyle = (colors: string[], fontSize?: number, fontWeight?: number) => ({
  background: `linear-gradient(90deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontSize: fontSize ? `${fontSize}px` : undefined,
  fontWeight: fontWeight || undefined
})
</script>

<template>
  <n-space vertical :size="16">
    <div class="example-section">
      <h3>Color Animation</h3>
      <n-space vertical :size="12">
        <div 
          class="gradient-text animated-gradient" 
          :style="createGradientStyle(COLOR_COMBINATIONS.purpleToViolet)"
        >
          {{ EXAMPLE_TEXTS.animated }}
        </div>
        <div 
          class="gradient-text animated-gradient" 
          :style="createGradientStyle(COLOR_COMBINATIONS.pinkToRed, 24, 600)"
        >
          {{ EXAMPLE_TEXTS.largeAnimated }}
        </div>
      </n-space>
    </div>
  </n-space>
</template>
