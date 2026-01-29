<script setup lang="ts">
import { NSpace } from 'naive-ui'
import { COLOR_COMBINATIONS, FONT_SIZES, FONT_WEIGHTS, EXAMPLE_TEXTS } from '../constants'

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
      <h3>Font Sizes</h3>
      <n-space vertical :size="12">
        <div 
          class="gradient-text" 
          :style="createGradientStyle(COLOR_COMBINATIONS.purpleToViolet, FONT_SIZES.small)"
        >
          {{ EXAMPLE_TEXTS.small }}
        </div>
        <div 
          class="gradient-text" 
          :style="createGradientStyle(COLOR_COMBINATIONS.purpleToViolet, FONT_SIZES.regular)"
        >
          {{ EXAMPLE_TEXTS.regular }}
        </div>
        <div 
          class="gradient-text" 
          :style="createGradientStyle(COLOR_COMBINATIONS.purpleToViolet, FONT_SIZES.large, FONT_WEIGHTS.semiBold)"
        >
          {{ EXAMPLE_TEXTS.large }}
        </div>
        <div 
          class="gradient-text" 
          :style="createGradientStyle(COLOR_COMBINATIONS.purpleToViolet, FONT_SIZES.extraLarge, FONT_WEIGHTS.bold)"
        >
          {{ EXAMPLE_TEXTS.extraLarge }}
        </div>
      </n-space>
    </div>

    <div class="example-section">
      <h3>Font Weights</h3>
      <n-space vertical :size="12">
        <div 
          class="gradient-text" 
          :style="createGradientStyle(COLOR_COMBINATIONS.purpleToViolet, undefined, FONT_WEIGHTS.light)"
        >
          {{ EXAMPLE_TEXTS.light }}
        </div>
        <div 
          class="gradient-text" 
          :style="createGradientStyle(COLOR_COMBINATIONS.purpleToViolet, undefined, FONT_WEIGHTS.regular)"
        >
          {{ EXAMPLE_TEXTS.regularWeight }}
        </div>
        <div 
          class="gradient-text" 
          :style="createGradientStyle(COLOR_COMBINATIONS.purpleToViolet, undefined, FONT_WEIGHTS.semiBold)"
        >
          {{ EXAMPLE_TEXTS.semiBold }}
        </div>
        <div 
          class="gradient-text" 
          :style="createGradientStyle(COLOR_COMBINATIONS.purpleToViolet, undefined, FONT_WEIGHTS.bold)"
        >
          {{ EXAMPLE_TEXTS.bold }}
        </div>
      </n-space>
    </div>
  </n-space>
</template>
