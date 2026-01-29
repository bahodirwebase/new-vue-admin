<script setup lang="ts">
import { NWatermark, NCard, NSpace } from 'naive-ui'
import { WATERMARK_CONTENT, WATERMARK_COLORS, WATERMARK_FONTS, WATERMARK_GAPS } from '../constants'
</script>

<template>
  <n-space vertical :size="16">
    <div class="example-section">
      <h3>Multiple Watermarks</h3>
      <n-watermark :content="WATERMARK_CONTENT.copyright" :font-color="WATERMARK_COLORS[5].value" :font-size="WATERMARK_FONTS[0].value">
        <n-watermark :content="WATERMARK_CONTENT.doNotShare" :font-color="WATERMARK_COLORS[4].value" :font-size="WATERMARK_FONTS[1].value" :rotate="-45">
          <n-card class="watermark-card height-200">
            <div>
              <h4>Protected Content</h4>
              <p>This content has multiple watermark layers</p>
            </div>
          </n-card>
        </n-watermark>
      </n-watermark>
    </div>

    <div class="example-section">
      <h3>Subtle Watermark</h3>
      <n-watermark 
        :content="WATERMARK_CONTENT.internal" 
        :font-color="'rgba(0, 0, 0, 0.05)'" 
        :font-size="10" 
        :x-gap="WATERMARK_GAPS.subtle.x"
        :y-gap="WATERMARK_GAPS.subtle.y"
      >
        <n-card class="watermark-card height-180">
          <div>
            <h4>Internal Document</h4>
            <p>Very subtle watermark for internal documents</p>
          </div>
        </n-card>
      </n-watermark>
    </div>
  </n-space>
</template>
