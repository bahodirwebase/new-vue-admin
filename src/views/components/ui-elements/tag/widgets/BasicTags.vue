<template>
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
</template>

<script setup lang="ts">
import { useMessage } from 'naive-ui'

const message = useMessage()

const handleClose = (tag: string) => {
  message.info(`Tag "${tag}" closed`)
}
</script>
