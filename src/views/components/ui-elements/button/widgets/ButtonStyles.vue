<script setup lang="ts">
import { AddOutline, CheckmarkOutline, SettingsOutline } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
</script>

<template>
  <n-card title="Button Styles">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Outline Styles
        </h3>
        <n-space :size="12">
          <n-button dashed>Dashed</n-button>
          <n-button text>Text Button</n-button>
          <n-button quaternary>Ghost</n-button>
        </n-space>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Round Buttons
        </h3>
        <n-space :size="12">
          <n-button type="primary" round>Round</n-button>
          <n-button type="success" round>Rounded</n-button>
          <n-button type="info" round>Circular</n-button>
        </n-space>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Circle Buttons
        </h3>
        <n-space :size="12">
          <n-button type="primary" circle>
            <template #icon>
              <n-icon :component="AddOutline" />
            </template>
          </n-button>
          <n-button type="success" circle>
            <template #icon>
              <n-icon :component="CheckmarkOutline" />
            </template>
          </n-button>
          <n-button type="info" circle>
            <template #icon>
              <n-icon :component="SettingsOutline" />
            </template>
          </n-button>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>
