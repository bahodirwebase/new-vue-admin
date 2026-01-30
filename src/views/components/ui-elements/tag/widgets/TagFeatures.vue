<template>
  <n-card title="Tag Features">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Tag with Icon
        </h3>
        <n-space>
          <n-tag>
            <template #icon>
              <n-icon :component="CheckmarkCircleOutline" />
            </template>
            Completed
          </n-tag>
          <n-tag type="warning">
            <template #icon>
              <n-icon :component="WarningOutline" />
            </template>
            Pending
          </n-tag>
          <n-tag type="error">
            <template #icon>
              <n-icon :component="AlertCircleOutline" />
            </template>
            Failed
          </n-tag>
        </n-space>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Tag Sizes
        </h3>
        <n-space vertical :size="8">
          <n-tag size="small">Small Tag</n-tag>
          <n-tag size="medium">Medium Tag</n-tag>
          <n-tag size="large">Large Tag</n-tag>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import {
  CheckmarkCircleOutline,
  WarningOutline,
  AlertCircleOutline
} from '@vicons/ionicons5'
</script>
