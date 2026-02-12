<script setup lang="ts">
import {
  AddOutline,
  CheckmarkOutline,
  SettingsOutline,
  TrashOutline,
  WarningOutline
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
</script>

<template>
  <n-card title="Icon Buttons">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          With Icons
        </h3>
        <n-space :size="12">
          <n-button type="primary">
            <template #icon>
              <n-icon :component="AddOutline" />
            </template>
            Add Item
          </n-button>
          <n-button type="success">
            <template #icon>
              <n-icon :component="CheckmarkOutline" />
            </template>
            Confirm
          </n-button>
          <n-button type="error">
            <template #icon>
              <n-icon :component="TrashOutline" />
            </template>
            Delete
          </n-button>
        </n-space>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Icon Only
        </h3>
        <n-space :size="12">
          <n-button circle type="primary">
            <template #icon>
              <n-icon :component="AddOutline" />
            </template>
          </n-button>
          <n-button circle type="success">
            <template #icon>
              <n-icon :component="CheckmarkOutline" />
            </template>
          </n-button>
          <n-button circle type="info">
            <template #icon>
              <n-icon :component="SettingsOutline" />
            </template>
          </n-button>
          <n-button circle type="warning">
            <template #icon>
              <n-icon :component="WarningOutline" />
            </template>
          </n-button>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>
