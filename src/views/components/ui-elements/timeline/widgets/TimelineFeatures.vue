<template>
  <n-card title="Timeline Features">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Warning Timeline
        </h3>
        <n-timeline>
          <n-timeline-item type="warning" title="Attention Required" content="Needs immediate attention" />
          <n-timeline-item type="warning" title="Delayed" content="Task delayed due to dependencies" />
        </n-timeline>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Error Timeline
        </h3>
        <n-timeline>
          <n-timeline-item type="error" title="Failed" content="Build failed due to errors" />
          <n-timeline-item type="error" title="Blocked" content="Task blocked by critical issue" />
        </n-timeline>
      </div>
    </n-space>
  </n-card>
</template>
