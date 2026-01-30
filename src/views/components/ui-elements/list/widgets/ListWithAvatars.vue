<template>
  <n-card title="List with Avatars">
    <n-list bordered>
      <n-list-item>
        <template #prefix>
          <n-avatar round size="medium">JD</n-avatar>
        </template>
        <n-text strong>John Doe</n-text>
        <n-text depth="3" style="display: block; margin-top: 4px">
          Product Manager
        </n-text>
      </n-list-item>
      <n-list-item>
        <template #prefix>
          <n-avatar round size="medium" color="#6366f1">JS</n-avatar>
        </template>
        <n-text strong>Jane Smith</n-text>
        <n-text depth="3" style="display: block; margin-top: 4px">
          UI/UX Designer
        </n-text>
      </n-list-item>
      <n-list-item>
        <template #prefix>
          <n-avatar round size="medium" color="#10b981">MJ</n-avatar>
        </template>
        <n-text strong>Mike Johnson</n-text>
        <n-text depth="3" style="display: block; margin-top: 4px">
          Frontend Developer
        </n-text>
      </n-list-item>
    </n-list>
  </n-card>
</template>
