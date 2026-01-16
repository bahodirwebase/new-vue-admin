<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Tooltip</h1>
        <p class="page-subtitle">Contextual hints and additional information on hover or focus</p>
      </div>

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

      <n-card title="Tooltip Placements">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Top Placements</h3>
            <n-space :size="16" align="center">
              <n-tooltip placement="top-start" trigger="hover">
                <template #trigger>
                  <n-button>Top Start</n-button>
                </template>
                Tooltip at top start position
              </n-tooltip>

              <n-tooltip placement="top" trigger="hover">
                <template #trigger>
                  <n-button>Top</n-button>
                </template>
                Tooltip at top center position
              </n-tooltip>

              <n-tooltip placement="top-end" trigger="hover">
                <template #trigger>
                  <n-button>Top End</n-button>
                </template>
                Tooltip at top end position
              </n-tooltip>
            </n-space>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Bottom Placements</h3>
            <n-space :size="16" align="center">
              <n-tooltip placement="bottom-start" trigger="hover">
                <template #trigger>
                  <n-button>Bottom Start</n-button>
                </template>
                Tooltip at bottom start position
              </n-tooltip>

              <n-tooltip placement="bottom" trigger="hover">
                <template #trigger>
                  <n-button>Bottom</n-button>
                </template>
                Tooltip at bottom center position
              </n-tooltip>

              <n-tooltip placement="bottom-end" trigger="hover">
                <template #trigger>
                  <n-button>Bottom End</n-button>
                </template>
                Tooltip at bottom end position
              </n-tooltip>
            </n-space>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Left & Right</h3>
            <n-space :size="16" align="center">
              <n-tooltip placement="left" trigger="hover">
                <template #trigger>
                  <n-button>Left</n-button>
                </template>
                Tooltip on the left side
              </n-tooltip>

              <n-tooltip placement="right" trigger="hover">
                <template #trigger>
                  <n-button>Right</n-button>
                </template>
                Tooltip on the right side
              </n-tooltip>
            </n-space>
          </div>
        </n-space>
      </n-card>

      <n-card title="Tooltip Triggers">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Hover Trigger (Default)</h3>
            <n-space :size="16" align="center">
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-button>Hover</n-button>
                </template>
                Appears when you hover over the element
              </n-tooltip>
            </n-space>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Click Trigger</h3>
            <n-space :size="16" align="center">
              <n-tooltip trigger="click">
                <template #trigger>
                  <n-button>Click me</n-button>
                </template>
                Appears when you click the element
              </n-tooltip>
            </n-space>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Focus Trigger</h3>
            <n-space :size="16" align="center">
              <n-tooltip trigger="focus">
                <template #trigger>
                  <n-input placeholder="Focus me" style="width: 200px" />
                </template>
                Appears when the input is focused
              </n-tooltip>
            </n-space>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Manual Trigger</h3>
            <n-space :size="16" align="center">
              <n-tooltip :show="showTooltip" trigger="manual">
                <template #trigger>
                  <n-button @click="showTooltip = !showTooltip">Toggle Tooltip</n-button>
                </template>
                Manually controlled tooltip
              </n-tooltip>
            </n-space>
          </div>
        </n-space>
      </n-card>

      <n-card title="Tooltip Styles">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Default Style</h3>
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-button>Default</n-button>
              </template>
              Default tooltip style
            </n-tooltip>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">With Arrow</h3>
            <n-space :size="16" align="center">
              <n-tooltip trigger="hover" :arrow="true">
                <template #trigger>
                  <n-button>With Arrow</n-button>
                </template>
                Tooltip with arrow pointer
              </n-tooltip>
            </n-space>
          </div>
        </n-space>
      </n-card>

      <n-card title="Tooltip on Icons">
        <n-space :size="24" align="center">
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-icon :component="SettingsOutline" style="font-size: 24px; cursor: pointer; color: var(--text-secondary)" />
            </template>
            Settings configuration
          </n-tooltip>

          <n-tooltip trigger="hover">
            <template #trigger>
              <n-icon :component="NotificationsOutline" style="font-size: 24px; cursor: pointer; color: var(--text-secondary)" />
            </template>
            Notification center
          </n-tooltip>

          <n-tooltip trigger="hover">
            <template #trigger>
              <n-icon :component="MailOutline" style="font-size: 24px; cursor: pointer; color: var(--text-secondary)" />
            </template>
            Inbox messages
          </n-tooltip>

          <n-tooltip trigger="hover">
            <template #trigger>
              <n-icon :component="HelpCircleOutline" style="font-size: 24px; cursor: pointer; color: var(--text-secondary)" />
            </template>
            Help and documentation
          </n-tooltip>
        </n-space>
      </n-card>

      <n-card title="Tooltip with Rich Content">
        <n-space :size="16" align="center">
          <n-tooltip trigger="hover" style="max-width: 300px">
            <template #trigger>
              <n-button type="info">Rich Content</n-button>
            </template>
            <div>
              <n-text strong style="display: block; margin-bottom: 8px">Detailed Information</n-text>
              <p style="margin: 0; line-height: 1.5">
                This tooltip contains rich content with multiple lines, formatting, and detailed explanations.
                You can include links, lists, or any HTML content here.
              </p>
            </div>
          </n-tooltip>
        </n-space>
      </n-card>

      <n-card title="Tooltip Delay">
        <n-space :size="16" align="center">
          <n-tooltip trigger="hover" :delay="500">
            <template #trigger>
              <n-button>Delayed (500ms)</n-button>
            </template>
            This tooltip appears after a 500ms delay
          </n-tooltip>

          <n-tooltip trigger="hover" :delay="1000">
            <template #trigger>
              <n-button>Delayed (1s)</n-button>
            </template>
            This tooltip appears after a 1 second delay
          </n-tooltip>
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  SettingsOutline,
  NotificationsOutline,
  MailOutline,
  HelpCircleOutline
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'

const showTooltip = ref(false)
</script>

<style scoped>
.ui-page {
  max-width: 100%;
}

.page-header {
  margin-bottom: 8px;
}

.page-title {
  font-family: var(--font-secondary);
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
}
</style>
