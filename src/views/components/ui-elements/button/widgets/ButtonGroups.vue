<template>
  <n-card title="Button Groups">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Button Group
        </h3>
        <n-button-group>
          <n-button>Left</n-button>
          <n-button>Middle</n-button>
          <n-button>Right</n-button>
        </n-button-group>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Primary Group
        </h3>
        <n-button-group>
          <n-button type="primary">Save</n-button>
          <n-button type="primary">Export</n-button>
          <n-button type="primary">Share</n-button>
        </n-button-group>
      </div>
    </n-space>
  </n-card>
</template>
