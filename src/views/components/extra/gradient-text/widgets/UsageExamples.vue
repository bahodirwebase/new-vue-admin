<script setup lang="ts">
import { NSpace, NCard } from 'naive-ui'
import { COLOR_COMBINATIONS, GRADIENT_PRESETS, EXAMPLE_TEXTS } from '../constants'

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
      <h3>Headings and Titles</h3>
      <n-space vertical :size="12">
        <div 
          class="gradient-text" 
          :style="createGradientStyle(COLOR_COMBINATIONS.purpleToViolet, 28, 700)"
        >
          {{ EXAMPLE_TEXTS.mainHeading }}
        </div>
        <div 
          class="gradient-text" 
          :style="createGradientStyle(COLOR_COMBINATIONS.blueToCyan, 20, 600)"
        >
          {{ EXAMPLE_TEXTS.subheading }}
        </div>
      </n-space>
    </div>

    <div class="example-section">
      <h3>Call to Actions</h3>
      <n-space vertical :size="12">
        <div 
          class="gradient-text" 
          :style="createGradientStyle(GRADIENT_PRESETS.success, 18, 600)"
        >
          {{ EXAMPLE_TEXTS.getStarted }}
        </div>
        <div 
          class="gradient-text" 
          :style="createGradientStyle(GRADIENT_PRESETS.warning)"
        >
          {{ EXAMPLE_TEXTS.limitedOffer }}
        </div>
      </n-space>
    </div>

    <div class="example-section">
      <h3>In Cards</h3>
      <n-card size="small" style="max-width: 400px">
        <div 
          class="gradient-text gradient-card-title" 
          :style="createGradientStyle(COLOR_COMBINATIONS.purpleToViolet, 18, 600)"
        >
          {{ EXAMPLE_TEXTS.premiumFeature }}
        </div>
        <p style="color: var(--text-secondary); margin: 0;">
          This card demonstrates how gradient text can be used as a title or highlight within card components.
        </p>
      </n-card>
    </div>
  </n-space>
</template>
