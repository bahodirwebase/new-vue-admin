<script setup lang="ts">
import { NSpace, NGrid, NGi, NCard } from 'naive-ui'

import PageHeader from "@/components/custom/PageHeader.vue";
import BasicWatermarks from './widgets/BasicWatermarks.vue'
import CustomStyling from './widgets/CustomStyling.vue'
import SpacingPositioning from './widgets/SpacingPositioning.vue'
import RealWorldExamples from './widgets/RealWorldExamples.vue'
import AdvancedUsage from './widgets/AdvancedUsage.vue'
</script>

<template>
  <div class="watermark-page">
    <n-space vertical :size="24">
      <PageHeader title="Watermark" subtitle="Overlay watermarks for content protection and branding" />
      
      <n-grid x-gap="12" cols="1 sm:2" responsive="screen">
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
