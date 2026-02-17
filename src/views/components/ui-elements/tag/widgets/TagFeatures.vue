<script setup lang="ts">
import {
  CheckmarkCircleOutline,
  WarningOutline,
  AlertCircleOutline
} from '@vicons/ionicons5'
import CustomTag from '@/components/custom/CustomTag.vue'
</script>

<template>
  <n-card title="Tag Features">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Tag with Icon
        </h3>
        <n-space>
          <CustomTag :icon="CheckmarkCircleOutline" type="default">
            Completed
          </CustomTag>
          <CustomTag type="warning" :icon="WarningOutline">
            Pending
          </CustomTag>
          <CustomTag type="error" :icon="AlertCircleOutline">
            Failed
          </CustomTag>
        </n-space>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Tag Sizes
        </h3>
        <n-space vertical :size="8">
          <CustomTag size="small">Small Tag</CustomTag>
          <CustomTag size="medium">Medium Tag</CustomTag>
          <CustomTag size="large">Large Tag</CustomTag>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>
