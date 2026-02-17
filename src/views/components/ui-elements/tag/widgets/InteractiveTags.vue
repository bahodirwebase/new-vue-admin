<script setup lang="ts">
import CustomTag from '@/components/custom/CustomTag.vue'
</script>

<template>
  <n-card title="Interactive Tags">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Clickable Tags
        </h3>
        <n-space>
          <CustomTag clickable type="default">Toggle Tag</CustomTag>
          <CustomTag clickable type="success">Success Toggle</CustomTag>
          <CustomTag clickable type="warning">Warning Toggle</CustomTag>
        </n-space>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Tag with Badge
        </h3>
        <n-space>
          <CustomTag type="default">
            Messages
            <n-badge value="5" style="margin-left: 8px" />
          </CustomTag>
          <CustomTag type="success">
            Completed
            <n-badge value="12" style="margin-left: 8px" />
          </CustomTag>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>
