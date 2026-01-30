<script setup lang="ts">
import { NSpace, NGrid, NGi, NCard } from 'naive-ui'

import BasicWatermarks from './widgets/BasicWatermarks.vue'
import CustomStyling from './widgets/CustomStyling.vue'
import SpacingPositioning from './widgets/SpacingPositioning.vue'
import RealWorldExamples from './widgets/RealWorldExamples.vue'
import AdvancedUsage from './widgets/AdvancedUsage.vue'
</script>

<template>
  <div class="watermark-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Watermark</h1>
        <p class="page-subtitle">Overlay watermarks for content protection and branding</p>
      </div>
      
      <n-grid x-gap="12" :cols="2">
        <n-gi>
          <n-card title="Basic Watermarks">
            <BasicWatermarks />
          </n-card>

          <n-card title="Custom Styling">
            <CustomStyling />
          </n-card>

          <n-card title="Spacing and Positioning">
            <SpacingPositioning />
          </n-card>
        </n-gi>
        
        <n-gi>
          <n-card title="Real-world Examples">
            <RealWorldExamples />
          </n-card>

          <n-card title="Advanced Usage">
            <AdvancedUsage />
          </n-card>
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<style lang="scss">
@use './styles/watermark.scss';
</style>
