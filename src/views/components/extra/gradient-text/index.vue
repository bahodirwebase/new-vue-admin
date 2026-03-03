<script setup lang="ts">
import { NSpace, NGrid, NGi, NCard } from 'naive-ui'

import PageHeader from "@/components/custom/PageHeader.vue";
import BasicGradients from './widgets/BasicGradients.vue'
import ColorVariations from './widgets/ColorVariations.vue'
import GradientAngles from './widgets/GradientAngles.vue'
import TextStyling from './widgets/TextStyling.vue'
import AnimatedGradients from './widgets/AnimatedGradients.vue'
import UsageExamples from './widgets/UsageExamples.vue'
</script>

<template>
  <div class="gradient-text-page">
    <n-space vertical :size="24">
      <PageHeader title="Gradient Text" subtitle="Beautiful gradient text effects with customizable colors and animations" />

      <n-grid x-gap="12" cols="1 sm:2" responsive="screen">
        <n-gi>
          <n-card title="Basic Gradients">
            <BasicGradients />
          </n-card>

          <n-card title="Color Variations">
            <ColorVariations />
          </n-card>

          <n-card title="Gradient Angles">
            <GradientAngles />
          </n-card>
        </n-gi>
        
        <n-gi>
          <n-card title="Text Styling">
            <TextStyling />
          </n-card>

          <n-card title="Animated Gradients">
            <AnimatedGradients />
          </n-card>

          <n-card title="Usage Examples">
            <UsageExamples />
          </n-card>
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<style lang="scss">
@use './styles/gradient-text.scss';
</style>
