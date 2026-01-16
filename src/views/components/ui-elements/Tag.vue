<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Tag</h1>
        <p class="page-subtitle">Tags are used for categorizing and labeling content</p>
      </div>

      <n-grid x-gap="12" :cols="2" >
        <n-gi>
          <n-card title="Basic Tags">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Tag Types
                </h3>
                <n-space>
                  <n-tag>Default</n-tag>
                  <n-tag type="success">Success</n-tag>
                  <n-tag type="info">Info</n-tag>
                  <n-tag type="warning">Warning</n-tag>
                  <n-tag type="error">Error</n-tag>
                </n-space>
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Closable Tags
                </h3>
                <n-space>
                  <n-tag closable @close="handleClose('tag1')">Closable</n-tag>
                  <n-tag type="success" closable @close="handleClose('tag2')">Success</n-tag>
                  <n-tag type="error" closable @close="handleClose('tag3')">Error</n-tag>
                </n-space>
              </div>
            </n-space>
          </n-card>
          <n-card title="Tag Styles">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Rounded Tags
                </h3>
                <n-space>
                  <n-tag round>Default</n-tag>
                  <n-tag type="success" round>Success</n-tag>
                  <n-tag type="info" round>Info</n-tag>
                  <n-tag type="warning" round>Warning</n-tag>
                  <n-tag type="error" round>Error</n-tag>
                </n-space>
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Custom Colors
                </h3>
                <n-space>
                  <n-tag color="#ff6b6b">Custom Red</n-tag>
                  <n-tag color="#4ecdc4">Custom Teal</n-tag>
                  <n-tag color="#45b7d1">Custom Blue</n-tag>
                  <n-tag color="#96ceb4">Custom Green</n-tag>
                </n-space>
              </div>
            </n-space>
          </n-card>
        </n-gi>
        <n-gi>
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
          <n-card title="Interactive Tags">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Clickable Tags
                </h3>
                <n-space>
                  <n-tag checkable>Toggle Tag</n-tag>
                  <n-tag checkable type="success">Success Toggle</n-tag>
                  <n-tag checkable type="warning">Warning Toggle</n-tag>
                </n-space>
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Tag with Badge
                </h3>
                <n-space>
                  <n-tag>
                    Messages
                    <n-badge value="5" style="margin-left: 8px" />
                  </n-tag>
                  <n-tag type="success">
                    Completed
                    <n-badge value="12" style="margin-left: 8px" />
                  </n-tag>
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
  CheckmarkCircleOutline,
  WarningOutline,
  AlertCircleOutline
} from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'

const message = useMessage()

const handleClose = (tag: string) => {
  message.info(`Tag "${tag}" closed`)
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

.add-input {
  margin-top: 12px;
}

.status-tags {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.status-label {
  min-width: 80px;
  font-weight: 500;
}

.n-card {
  margin-bottom: 12px;
}
</style>
