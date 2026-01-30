<template>
  <n-card title="Tooltip Triggers">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Hover Trigger
        </h3>
        <n-space :size="16" align="center">
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button>Hover</n-button>
            </template>
            Tooltip appears on hover
          </n-tooltip>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button type="info">Info</n-button>
            </template>
            Information tooltip on hover
          </n-tooltip>
        </n-space>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Click Trigger
        </h3>
        <n-space :size="16" align="center">
          <n-tooltip trigger="click">
            <template #trigger>
              <n-button type="warning">Click me</n-button>
            </template>
            Tooltip appears on click
          </n-tooltip>
          <n-tooltip trigger="click">
            <template #trigger>
              <n-button type="error">Click</n-button>
            </template>
            Click to show tooltip
          </n-tooltip>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>
