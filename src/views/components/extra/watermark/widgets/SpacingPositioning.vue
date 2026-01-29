<script setup lang="ts">
import { NWatermark, NCard, NSpace } from 'naive-ui'
import { WATERMARK_GAPS } from '../constants'
</script>

<template>
  <n-space vertical :size="16">
    <div class="example-section">
      <h3>Different Gaps</h3>
      <n-space vertical :size="12">
        <n-watermark content="TIGHT" :x-gap="WATERMARK_GAPS.tight.x" :y-gap="WATERMARK_GAPS.tight.y">
          <n-card class="watermark-card height-150">
            <span>Tight Spacing</span>
          </n-card>
        </n-watermark>
        <n-watermark content="NORMAL" :x-gap="WATERMARK_GAPS.normal.x" :y-gap="WATERMARK_GAPS.normal.y">
          <n-card class="watermark-card height-150">
            <span>Normal Spacing</span>
          </n-card>
        </n-watermark>
        <n-watermark content="LOOSE" :x-gap="WATERMARK_GAPS.loose.x" :y-gap="WATERMARK_GAPS.loose.y">
          <n-card class="watermark-card height-150">
            <span>Loose Spacing</span>
          </n-card>
        </n-watermark>
      </n-space>
    </div>

    <div class="example-section">
      <h3>Custom Offset</h3>
      <n-watermark content="OFFSET" :offset="[50, 50]">
        <n-card class="watermark-card height-150">
          <span>Watermark with Custom Offset</span>
        </n-card>
      </n-watermark>
    </div>
  </n-space>
</template>
