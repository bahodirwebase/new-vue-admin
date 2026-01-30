<template>
  <n-card title="Timeline Types">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Success Timeline
        </h3>
        <n-timeline>
          <n-timeline-item type="success" title="Completed" content="Task completed successfully" />
          <n-timeline-item type="success" title="Approved" content="Review approved by team lead" />
          <n-timeline-item type="success" title="Deployed" content="Application deployed to production" />
        </n-timeline>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Info Timeline
        </h3>
        <n-timeline>
          <n-timeline-item type="info" title="In Progress" content="Currently working on this task" />
          <n-timeline-item type="info" title="Pending Review" content="Waiting for code review" />
          <n-timeline-item type="info" title="Scheduled" content="Scheduled for next sprint" />
        </n-timeline>
      </div>
    </n-space>
  </n-card>
</template>
