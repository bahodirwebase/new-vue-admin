<script setup lang="ts">
import { NSpace, NCard } from 'naive-ui'

import Headings from './widgets/Headings.vue'
import TextStyles from './widgets/TextStyles.vue'
import FontSizes from './widgets/FontSizes.vue'
import FontWeights from './widgets/FontWeights.vue'
import TextTransformations from './widgets/TextTransformations.vue'
import TextAlignment from './widgets/TextAlignment.vue'
import TextDecorations from './widgets/TextDecorations.vue'
import Lists from './widgets/Lists.vue'
import CodeElements from './widgets/CodeElements.vue'
import Blockquote from './widgets/Blockquote.vue'
</script>

<template>
  <div class="typography-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Typography</h1>
        <p class="page-subtitle">Text styles and typography examples</p>
      </div>

      <n-card title="Headings">
        <Headings />
      </n-card>

      <n-card title="Text Styles">
        <TextStyles />
      </n-card>

      <n-card title="Font Sizes">
        <FontSizes />
      </n-card>

      <n-card title="Font Weights">
        <FontWeights />
      </n-card>

      <n-card title="Text Transformations">
        <TextTransformations />
      </n-card>

      <n-card title="Text Alignment">
        <TextAlignment />
      </n-card>

      <n-card title="Text Decorations">
        <TextDecorations />
      </n-card>

      <n-card title="Lists">
        <Lists />
      </n-card>

      <n-card title="Code and Inline Elements">
        <CodeElements />
      </n-card>

      <n-card title="Blockquote">
        <Blockquote />
      </n-card>
    </n-space>
  </div>
</template>

<style>
@import './styles/typography.scss';
</style>
