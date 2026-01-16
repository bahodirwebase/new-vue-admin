<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Timeline</h1>
        <p class="page-subtitle">Chronological sequences for events, history, and progress tracking</p>
      </div>

      <n-grid x-gap="12" :cols="2" >
        <n-gi>
          <n-card title="Basic Timeline">
            <n-timeline>
              <n-timeline-item type="success" title="Project Started" content="Initial planning and setup completed" />
              <n-timeline-item type="info" title="Design Phase" content="UI/UX design and wireframes created" />
              <n-timeline-item type="warning" title="Development" content="Frontend and backend development in progress" />
              <n-timeline-item type="error" title="Testing" content="Quality assurance and bug fixes" />
            </n-timeline>
          </n-card>
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
        </n-gi>
        <n-gi>
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
          <n-card title="Advanced Timeline">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Timeline with Icons
                </h3>
                <n-timeline>
                  <n-timeline-item type="success">
                    <template #icon>
                      <n-icon :component="CheckmarkCircleOutline" />
                    </template>
                    <template #title>
                      <span>Project Completed</span>
                    </template>
                    <template #content>
                      <span>All deliverables have been completed successfully</span>
                    </template>
                  </n-timeline-item>
                  <n-timeline-item type="info">
                    <template #icon>
                      <n-icon :component="InformationCircleOutline" />
                    </template>
                    <template #title>
                      <span>Review Phase</span>
                    </template>
                    <template #content>
                      <span>Project under review by stakeholders</span>
                    </template>
                  </n-timeline-item>
                </n-timeline>
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
  InformationCircleOutline
} from '@vicons/ionicons5'
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
