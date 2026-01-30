<template>
  <n-card title="Button Sizes">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Size Variants
        </h3>
        <n-space :size="12" align="center">
          <n-button type="primary" size="tiny">Tiny</n-button>
          <n-button type="primary" size="small">Small</n-button>
          <n-button type="primary" size="medium">Medium</n-button>
          <n-button type="primary" size="large">Large</n-button>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>
