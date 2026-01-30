<template>
  <n-card title="Advanced Timeline">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Timeline with Icons
        </h3>
        <n-timeline>
          <n-timeline-item type="success">
            <template #icon>
              <n-icon :component="CheckmarkCircleOutline" />
            </template>
            <template #title>
              <span>Project Completed</span>
            </template>
            <template #content>
              <span>All deliverables have been completed successfully</span>
            </template>
          </n-timeline-item>
          <n-timeline-item type="info">
            <template #icon>
              <n-icon :component="InformationCircleOutline" />
            </template>
            <template #title>
              <span>Review Phase</span>
            </template>
            <template #content>
              <span>Project under review by stakeholders</span>
            </template>
          </n-timeline-item>
        </n-timeline>
      </div>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import {
  CheckmarkCircleOutline,
  InformationCircleOutline
} from '@vicons/ionicons5'
</script>
