<template>
  <n-card title="Basic Tooltips">
    <n-space :size="16" align="center">
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button>Hover me</n-button>
        </template>
        This is a basic tooltip that appears on hover.
      </n-tooltip>

      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button type="primary">Primary Button</n-button>
        </template>
        Tooltip for primary button with helpful information.
      </n-tooltip>

      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button type="success">Success Button</n-button>
        </template>
        Tooltip explaining the success action.
      </n-tooltip>
    </n-space>
  </n-card>
</template>
