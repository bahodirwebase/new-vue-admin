<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Tooltip</h1>
        <p class="page-subtitle">Contextual hints and additional information on hover or focus</p>
      </div>

      <n-grid x-gap="12" :cols="2" >
        <n-gi>
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
        </n-gi>
        <n-gi>
          <n-card title="Tooltip Placements">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Top Placements
                </h3>
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
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Side Placements
                </h3>
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
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import {
  InformationCircleOutline,
  WarningOutline
} from '@vicons/ionicons5'
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

.n-card {
  margin-bottom: 12px;
}
</style>
