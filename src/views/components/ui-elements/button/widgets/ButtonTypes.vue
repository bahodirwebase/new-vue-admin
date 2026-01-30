<template>
  <n-card title="Button Types">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Primary Actions
        </h3>
        <n-space :size="12">
          <n-button type="primary">Primary</n-button>
          <n-button type="success">Success</n-button>
          <n-button type="info">Info</n-button>
          <n-button type="warning">Warning</n-button>
          <n-button type="error">Error</n-button>
        </n-space>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Default & Secondary
        </h3>
        <n-space :size="12">
          <n-button type="default">Default</n-button>
          <n-button type="tertiary">Tertiary</n-button>
          <n-button type="quaternary">Quaternary</n-button>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>
