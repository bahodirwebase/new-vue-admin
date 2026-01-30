<template>
  <n-card title="Button States">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Disabled & Loading
        </h3>
        <n-space :size="12">
          <n-button type="primary" disabled>Disabled</n-button>
          <n-button type="primary" loading>Loading</n-button>
          <n-button type="success" loading>Processing</n-button>
        </n-space>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Ghost Disabled
        </h3>
        <n-space :size="12">
          <n-button quaternary disabled>Ghost Disabled</n-button>
          <n-button text disabled>Text Disabled</n-button>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>
