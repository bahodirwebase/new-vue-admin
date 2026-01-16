<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Alert</h1>
        <p class="page-subtitle">Contextual feedback messages for user notifications and system status</p>
      </div>

      <n-grid x-gap="12" :cols="2" >
        <n-gi>
          <n-card title="Alert Types">
            <n-space vertical :size="12">
              <n-alert type="success" title="Success Alert">
                Your changes have been saved successfully. The data has been updated in the database.
              </n-alert>
              <n-alert type="info" title="Information Alert">
                New features are available in this update. Check out the latest improvements and enhancements.
              </n-alert>
              <n-alert type="warning" title="Warning Alert">
                Your session will expire in 5 minutes. Please save your work to avoid losing any unsaved changes.
              </n-alert>
              <n-alert type="error" title="Error Alert">
                There was a problem processing your request. Please try again or contact support if the issue persists.
              </n-alert>
            </n-space>
          </n-card>
          <n-card title="Closable Alerts">
            <n-space vertical :size="12">
              <n-alert type="success" closable @close="handleClose">
                This alert can be closed by clicking the X button.
              </n-alert>
              <n-alert type="info" closable title="Dismissible Info">
                You can dismiss this alert to remove it from view.
              </n-alert>
            </n-space>
          </n-card>
          <n-card title="Custom Icons">
            <n-space vertical :size="12">
              <n-alert type="success" show-icon title="With Icon">
                Alerts can display icons to enhance visual communication.
              </n-alert>
              <n-alert type="info" show-icon title="Icon Enabled">
                Icons help users quickly identify the type of message.
              </n-alert>
              <n-alert type="warning" show-icon title="Warning Icon">
                Warning icons draw attention to important notices.
              </n-alert>
              <n-alert type="error" show-icon title="Error Icon">
                Error icons indicate critical issues that need attention.
              </n-alert>
            </n-space>
          </n-card>
        </n-gi>
        <n-gi>
          <n-card title="Alert Without Title">
            <n-space vertical :size="12">
              <n-alert type="success">Operation completed successfully.</n-alert>
              <n-alert type="info">This is an informational message without a title.</n-alert>
              <n-alert type="warning">Please review your input before submitting.</n-alert>
              <n-alert type="error">An error occurred during the process.</n-alert>
            </n-space>
          </n-card>
          <n-card title="Alert Sizes">
            <n-space vertical :size="12">
              <n-alert type="info" size="small" title="Small Alert">
                This is a small-sized alert component.
              </n-alert>
              <n-alert type="info" size="medium" title="Medium Alert">
                This is a medium-sized alert component (default).
              </n-alert>
              <n-alert type="info" size="large" title="Large Alert">
                This is a large-sized alert component for important messages.
              </n-alert>
            </n-space>
          </n-card>
          
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { useMessage } from 'naive-ui'

const message = useMessage()

const handleClose = () => {
  message.info('Alert closed')
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

.n-card {
  margin-bottom: 12px;
}
</style>
