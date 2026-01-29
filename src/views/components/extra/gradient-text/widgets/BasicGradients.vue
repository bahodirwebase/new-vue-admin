<script setup lang="ts">
import { NSpace } from 'naive-ui'
import { GRADIENT_PRESETS, EXAMPLE_TEXTS } from '../constants'

const createGradientStyle = (colors: string[]) => ({
  background: `linear-gradient(90deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
})
</script>

<template>
  <n-space vertical :size="16">
    <div class="example-section">
      <h3>Predefined Gradients</h3>
      <n-space vertical :size="12">
        <div 
          class="gradient-text" 
          :style="createGradientStyle(GRADIENT_PRESETS.success)"
        >
          {{ EXAMPLE_TEXTS.success }}
        </div>
        <div 
          class="gradient-text" 
          :style="createGradientStyle(GRADIENT_PRESETS.info)"
        >
          {{ EXAMPLE_TEXTS.info }}
        </div>
        <div 
          class="gradient-text" 
          :style="createGradientStyle(GRADIENT_PRESETS.warning)"
        >
          {{ EXAMPLE_TEXTS.warning }}
        </div>
        <div 
          class="gradient-text" 
          :style="createGradientStyle(GRADIENT_PRESETS.error)"
        >
          {{ EXAMPLE_TEXTS.error }}
        </div>
      </n-space>
    </div>
  </n-space>
</template>
