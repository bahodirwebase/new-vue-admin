<script setup lang="ts">
import { NWatermark, NCard, NSpace } from 'naive-ui'
import { WATERMARK_CONTENT, WATERMARK_COLORS, WATERMARK_FONTS, WATERMARK_ROTATIONS } from '../constants'
</script>

<template>
  <n-space vertical :size="16">
    <div class="example-section">
      <h3>Different Colors</h3>
      <n-space vertical :size="12">
        <n-watermark :content="WATERMARK_CONTENT.confidential" :font-color="WATERMARK_COLORS[1].value">
          <n-card class="watermark-card height-150">
            <span>Red Watermark</span>
          </n-card>
        </n-watermark>
        <n-watermark :content="WATERMARK_CONTENT.sample" :font-color="WATERMARK_COLORS[2].value">
          <n-card class="watermark-card height-150">
            <span>Green Watermark</span>
          </n-card>
        </n-watermark>
        <n-watermark :content="WATERMARK_CONTENT.demo" :font-color="WATERMARK_COLORS[3].value">
          <n-card class="watermark-card height-150">
            <span>Blue Watermark</span>
          </n-card>
        </n-watermark>
      </n-space>
    </div>

    <div class="example-section">
      <h3>Different Font Sizes</h3>
      <n-space vertical :size="12">
        <n-watermark content="SMALL" :font-size="WATERMARK_FONTS[0].value">
          <n-card class="watermark-card height-120">
            <span>Small Font Watermark</span>
          </n-card>
        </n-watermark>
        <n-watermark content="MEDIUM" :font-size="WATERMARK_FONTS[1].value">
          <n-card class="watermark-card height-120">
            <span>Medium Font Watermark</span>
          </n-card>
        </n-watermark>
        <n-watermark content="LARGE" :font-size="WATERMARK_FONTS[3].value">
          <n-card class="watermark-card height-120">
            <span>Large Font Watermark</span>
          </n-card>
        </n-watermark>
      </n-space>
    </div>

    <div class="example-section">
      <h3>Different Rotations</h3>
      <n-space vertical :size="12">
        <n-watermark content="HORIZONTAL" :rotate="WATERMARK_ROTATIONS[0].value">
          <n-card class="watermark-card height-120">
            <span>Horizontal Watermark</span>
          </n-card>
        </n-watermark>
        <n-watermark content="DIAGONAL" :rotate="WATERMARK_ROTATIONS[1].value">
          <n-card class="watermark-card height-120">
            <span>45° Diagonal Watermark</span>
          </n-card>
        </n-watermark>
        <n-watermark content="STEEP" :rotate="WATERMARK_ROTATIONS[4].value">
          <n-card class="watermark-card height-120">
            <span>-45° Diagonal Watermark</span>
          </n-card>
        </n-watermark>
      </n-space>
    </div>
  </n-space>
</template>
