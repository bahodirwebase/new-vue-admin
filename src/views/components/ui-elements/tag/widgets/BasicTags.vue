<script setup lang="ts">
import { useMessage } from 'naive-ui'
import CustomTag from '@/components/CustomTag.vue'

const message = useMessage()

const handleClose = (tag: string) => {
  message.info(`Tag "${tag}" closed`)
}
</script>

<template>
  <n-card title="Basic Tags">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Tag Types
        </h3>
        <n-space>
          <CustomTag type="default">Default</CustomTag>
          <CustomTag type="success">Success</CustomTag>
          <CustomTag type="info">Info</CustomTag>
          <CustomTag type="warning">Warning</CustomTag>
          <CustomTag type="error">Error</CustomTag>
        </n-space>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Closable Tags
        </h3>
        <n-space>
          <CustomTag closable @close="handleClose('tag1')">Closable</CustomTag>
          <CustomTag type="success" closable @close="handleClose('tag2')">Success</CustomTag>
          <CustomTag type="error" closable @close="handleClose('tag3')">Error</CustomTag>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>
