<script setup lang="ts">
import { NWatermark, NCard, NSpace } from 'naive-ui'
import { WATERMARK_CONTENT } from '../constants'
</script>

<template>
  <n-space vertical :size="16">
    <div class="example-section">
      <h3>Simple Text Watermark</h3>
      <n-watermark :content="WATERMARK_CONTENT.confidential" :cross="true">
        <n-card class="watermark-card height-200">
          <div>
            <h3>Protected Content</h3>
            <p>This content is protected with a watermark</p>
          </div>
        </n-card>
      </n-watermark>
    </div>

    <div class="example-section">
      <h3>Single Direction Watermark</h3>
      <n-watermark :content="WATERMARK_CONTENT.draft" :cross="false">
        <n-card class="watermark-card height-200">
          <div>
            <h3>Draft Document</h3>
            <p>This is a draft version with single-direction watermark</p>
          </div>
        </n-card>
      </n-watermark>
    </div>
  </n-space>
</template>
