<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Float Button</h1>
        <p class="page-subtitle">Floating action buttons for primary actions and quick access</p>
      </div>

      <n-card title="Basic Float Button">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Default Float Button</h3>
            <div class="demo-area">
              <n-float-button>
                <template #icon>
                  <n-icon :component="AddOutline" />
                </template>
              </n-float-button>
            </div>
          </div>
        </n-space>
      </n-card>

      <n-card title="Float Button Types">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Different Types</h3>
            <div class="demo-area">
              <div class="float-buttons-grid">
                <n-float-button type="primary">
                  <template #icon>
                    <n-icon :component="AddOutline" />
                  </template>
                </n-float-button>
                <n-float-button type="success">
                  <template #icon>
                    <n-icon :component="CheckmarkOutline" />
                  </template>
                </n-float-button>
                <n-float-button type="warning">
                  <template #icon>
                    <n-icon :component="WarningOutline" />
                  </template>
                </n-float-button>
                <n-float-button type="error">
                  <template #icon>
                    <n-icon :component="TrashOutline" />
                  </template>
                </n-float-button>
                <n-float-button type="info">
                  <template #icon>
                    <n-icon :component="InformationCircleOutline" />
                  </template>
                </n-float-button>
              </div>
            </div>
          </div>
        </n-space>
      </n-card>

      <n-card title="Float Button Styles">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Square Shape</h3>
            <div class="demo-area">
              <div class="float-buttons-grid">
                <n-float-button shape="square">
                  <template #icon>
                    <n-icon :component="AddOutline" />
                  </template>
                </n-float-button>
                <n-float-button type="primary" shape="square">
                  <template #icon>
                    <n-icon :component="SettingsOutline" />
                  </template>
                </n-float-button>
                <n-float-button type="success" shape="square">
                  <template #icon>
                    <n-icon :component="MailOutline" />
                  </template>
                </n-float-button>
              </div>
            </div>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Menu Float Button</h3>
            <div class="demo-area">
              <n-float-button :menu-props="menuOptions">
                <template #icon>
                  <n-icon :component="EllipsisVerticalOutline" />
                </template>
              </n-float-button>
            </div>
          </div>
        </n-space>
      </n-card>

      <n-card title="Float Button Positioning">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Custom Position</h3>
            <div class="demo-area">
              <n-float-button :right="100" :bottom="100">
                <template #icon>
                  <n-icon :component="AddOutline" />
                </template>
              </n-float-button>
              <n-float-button :left="100" :bottom="100" type="primary">
                <template #icon>
                  <n-icon :component="ChatbubbleOutline" />
                </template>
              </n-float-button>
              <n-float-button :right="100" :top="100" type="success">
                <template #icon>
                  <n-icon :component="NotificationsOutline" />
                </template>
              </n-float-button>
              <n-float-button :left="100" :top="100" type="warning">
                <template #icon>
                  <n-icon :component="HelpCircleOutline" />
                </template>
              </n-float-button>
            </div>
          </div>
        </n-space>
      </n-card>

      <n-card title="Float Button Features">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">With Badge</h3>
            <div class="demo-area">
              <n-float-button>
                <template #icon>
                  <n-icon :component="NotificationsOutline" />
                </template>
                <template #badge>
                  <n-badge :value="5" :max="99" />
                </template>
              </n-float-button>
              <n-float-button type="error" style="margin-left: 80px;">
                <template #icon>
                  <n-icon :component="MailOutline" />
                </template>
                <template #badge>
                  <n-badge :value="12" :max="99" />
                </template>
              </n-float-button>
              <n-float-button type="warning" style="margin-left: 160px;">
                <template #icon>
                  <n-icon :component="ChatbubbleOutline" />
                </template>
                <template #badge>
                  <n-badge dot />
                </template>
              </n-float-button>
            </div>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Custom Content</h3>
            <div class="demo-area">
              <n-float-button type="primary">
                <div class="custom-content">
                  <n-icon :component="AddOutline" />
                  <span>Add</span>
                </div>
              </n-float-button>
              <n-float-button type="success" style="margin-left: 80px;">
                <div class="custom-content">
                  <n-icon :component="DownloadOutline" />
                  <span>Download</span>
                </div>
              </n-float-button>
            </div>
          </div>
        </n-space>
      </n-card>

      <n-card title="Float Button Interactions">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Tooltip Integration</h3>
            <div class="demo-area">
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-float-button type="primary">
                    <template #icon>
                      <n-icon :component="AddOutline" />
                    </template>
                  </n-float-button>
                </template>
                Add new item
              </n-tooltip>
              <n-float-button type="success" style="margin-left: 80px;">
                <template #icon>
                  <n-icon :component="ShareOutline" />
                </template>
              </n-float-button>
              <n-tooltip trigger="hover" placement="left">
                <template #trigger>
                  <n-float-button type="warning" style="margin-left: 160px;">
                    <template #icon>
                      <n-icon :component="HelpCircleOutline" />
                    </template>
                  </n-float-button>
                </template>
                Get help
              </n-tooltip>
            </div>
          </div>
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import {
  AddOutline,
  CheckmarkOutline,
  WarningOutline,
  TrashOutline,
  InformationCircleOutline,
  SettingsOutline,
  MailOutline,
  EllipsisVerticalOutline,
  NotificationsOutline,
  ChatbubbleOutline,
  HelpCircleOutline,
  DownloadOutline,
  ShareOutline
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'

const menuOptions = {
  options: [
    {
      label: 'Add Item',
      key: 'add',
      icon: () => h('div', '📝')
    },
    {
      label: 'Share',
      key: 'share',
      icon: () => h('div', '🔗')
    },
    {
      label: 'Download',
      key: 'download',
      icon: () => h('div', '⬇️')
    },
    {
      label: 'Settings',
      key: 'settings',
      icon: () => h('div', '⚙️')
    }
  ]
}
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

.demo-area {
  position: relative;
  height: 200px;
  border: 1px dashed var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

.float-buttons-grid {
  display: flex;
  gap: 80px;
  padding: 20px;
}

.custom-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  font-size: 10px;
}
</style>
