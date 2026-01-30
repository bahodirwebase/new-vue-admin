<template>
  <n-card title="Tag Styles">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Rounded Tags
        </h3>
        <n-space>
          <n-tag round>Default</n-tag>
          <n-tag type="success" round>Success</n-tag>
          <n-tag type="info" round>Info</n-tag>
          <n-tag type="warning" round>Warning</n-tag>
          <n-tag type="error" round>Error</n-tag>
        </n-space>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Custom Colors
        </h3>
        <n-space>
          <n-tag color="#ff6b6b">Custom Red</n-tag>
          <n-tag color="#4ecdc4">Custom Teal</n-tag>
          <n-tag color="#45b7d1">Custom Blue</n-tag>
          <n-tag color="#96ceb4">Custom Green</n-tag>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>
