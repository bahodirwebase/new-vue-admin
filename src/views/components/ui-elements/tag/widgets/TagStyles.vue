<template>
  <n-card title="Tag Styles">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Rounded Tags
        </h3>
        <n-space>
          <CustomTag round type="default">Default</CustomTag>
          <CustomTag type="success" round>Success</CustomTag>
          <CustomTag type="info" round>Info</CustomTag>
          <CustomTag type="warning" round>Warning</CustomTag>
          <CustomTag type="error" round>Error</CustomTag>
        </n-space>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Custom Colors
        </h3>
        <n-space>
          <CustomTag color="#ff6b6b" variant="filled" text-color="#fff">Custom Red</CustomTag>
          <CustomTag color="#4ecdc4" variant="filled" text-color="#fff">Custom Teal</CustomTag>
          <CustomTag color="#45b7d1" variant="filled" text-color="#fff">Custom Blue</CustomTag>
          <CustomTag color="#96ceb4" variant="filled" text-color="#fff">Custom Green</CustomTag>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import CustomTag from '@/components/CustomTag.vue'
</script>
