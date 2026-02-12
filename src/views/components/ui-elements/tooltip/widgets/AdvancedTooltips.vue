<script setup lang="ts">
import {
  InformationCircleOutline,
  WarningOutline
} from '@vicons/ionicons5'
</script>

<template>
  <n-card title="Advanced Tooltips">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Tooltips with Icons
        </h3>
        <n-space :size="16" align="center">
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button>
                <template #icon>
                  <n-icon :component="InformationCircleOutline" />
                </template>
                Info
              </n-button>
            </template>
            Additional information available
          </n-tooltip>

          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button type="warning">
                <template #icon>
                  <n-icon :component="WarningOutline" />
                </template>
                Warning
              </n-button>
            </template>
            Warning: Please review before proceeding
          </n-tooltip>
        </n-space>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Disabled Tooltips
        </h3>
        <n-space :size="16" align="center">
          <n-tooltip trigger="hover" disabled>
            <template #trigger>
              <n-button disabled>Disabled</n-button>
            </template>
            This tooltip is disabled
          </n-tooltip>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>
