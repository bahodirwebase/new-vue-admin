<template>
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
</template>
