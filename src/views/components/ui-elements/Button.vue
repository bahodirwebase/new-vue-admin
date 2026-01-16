<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Button</h1>
        <p class="page-subtitle">Interactive buttons for actions, forms, and navigation</p>
      </div>

      <n-grid x-gap="12" :cols="2" >
        <n-gi>
          <n-card title="Button Types">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Primary Actions
                </h3>
                <n-space :size="12">
                  <n-button type="primary">Primary</n-button>
                  <n-button type="success">Success</n-button>
                  <n-button type="info">Info</n-button>
                  <n-button type="warning">Warning</n-button>
                  <n-button type="error">Error</n-button>
                </n-space>
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Default & Secondary
                </h3>
                <n-space :size="12">
                  <n-button type="default">Default</n-button>
                  <n-button type="tertiary">Tertiary</n-button>
                  <n-button type="quaternary">Quaternary</n-button>
                </n-space>
              </div>
            </n-space>
          </n-card>
          <n-card title="Button Sizes">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Size Variants
                </h3>
                <n-space :size="12" align="center">
                  <n-button type="primary" size="tiny">Tiny</n-button>
                  <n-button type="primary" size="small">Small</n-button>
                  <n-button type="primary" size="medium">Medium</n-button>
                  <n-button type="primary" size="large">Large</n-button>
                </n-space>
              </div>
            </n-space>
          </n-card>
          <n-card title="Button Groups">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Button Group
                </h3>
                <n-button-group>
                  <n-button>Left</n-button>
                  <n-button>Middle</n-button>
                  <n-button>Right</n-button>
                </n-button-group>
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Primary Group
                </h3>
                <n-button-group>
                  <n-button type="primary">Save</n-button>
                  <n-button type="primary">Export</n-button>
                  <n-button type="primary">Share</n-button>
                </n-button-group>
              </div>
            </n-space>
          </n-card>
        </n-gi>
        <n-gi>
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
          <n-card title="Button States">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Disabled & Loading
                </h3>
                <n-space :size="12">
                  <n-button type="primary" disabled>Disabled</n-button>
                  <n-button type="primary" loading>Loading</n-button>
                  <n-button type="success" loading>Processing</n-button>
                </n-space>
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Ghost Disabled
                </h3>
                <n-space :size="12">
                  <n-button quaternary disabled>Ghost Disabled</n-button>
                  <n-button text disabled>Text Disabled</n-button>
                </n-space>
              </div>
            </n-space>
          </n-card>
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
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

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

<style scoped>

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
