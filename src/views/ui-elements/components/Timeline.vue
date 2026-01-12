<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Timeline</h1>
        <p class="page-subtitle">Chronological sequences for events, history, and progress tracking</p>
      </div>

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
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Success Timeline</h3>
            <n-timeline>
              <n-timeline-item type="success" title="Completed" content="Task completed successfully" />
              <n-timeline-item type="success" title="Approved" content="Review approved by team lead" />
              <n-timeline-item type="success" title="Deployed" content="Application deployed to production" />
            </n-timeline>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Info Timeline</h3>
            <n-timeline>
              <n-timeline-item type="info" title="In Progress" content="Currently working on this task" />
              <n-timeline-item type="info" title="Pending Review" content="Waiting for code review" />
              <n-timeline-item type="info" title="Scheduled" content="Scheduled for next sprint" />
            </n-timeline>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Warning Timeline</h3>
            <n-timeline>
              <n-timeline-item type="warning" title="Attention Required" content="Needs immediate attention" />
              <n-timeline-item type="warning" title="Delayed" content="Task delayed due to dependencies" />
            </n-timeline>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Error Timeline</h3>
            <n-timeline>
              <n-timeline-item type="error" title="Failed" content="Build failed due to errors" />
              <n-timeline-item type="error" title="Blocked" content="Task blocked by critical issue" />
            </n-timeline>
          </div>
        </n-space>
      </n-card>

      <n-card title="Timeline with Custom Content">
        <n-timeline>
          <n-timeline-item type="success">
            <template #header>
              <n-text strong style="font-size: 16px">Project Kickoff</n-text>
            </template>
            <template #header-extra>
              <n-text depth="3">Jan 15, 2024</n-text>
            </template>
            <div>
              <p>Project discovery phase completed. Team alignment and initial requirements gathered.</p>
              <n-tag type="success" size="small" style="margin-top: 8px">Completed</n-tag>
            </div>
          </n-timeline-item>

          <n-timeline-item type="info">
            <template #header>
              <n-text strong style="font-size: 16px">Design Phase</n-text>
            </template>
            <template #header-extra>
              <n-text depth="3">Feb 1, 2024</n-text>
            </template>
            <div>
              <p>UX flows and UI design system created. Mockups and prototypes reviewed.</p>
              <n-tag type="info" size="small" style="margin-top: 8px">In Progress</n-tag>
            </div>
          </n-timeline-item>

          <n-timeline-item type="warning">
            <template #header>
              <n-text strong style="font-size: 16px">Development</n-text>
            </template>
            <template #header-extra>
              <n-text depth="3">Mar 1, 2024</n-text>
            </template>
            <div>
              <p>Feature development and implementation. Code reviews and testing ongoing.</p>
              <n-tag type="warning" size="small" style="margin-top: 8px">Active</n-tag>
            </div>
          </n-timeline-item>

          <n-timeline-item type="error">
            <template #header>
              <n-text strong style="font-size: 16px">Launch</n-text>
            </template>
            <template #header-extra>
              <n-text depth="3">Apr 15, 2024</n-text>
            </template>
            <div>
              <p>Production deployment and monitoring. Post-launch support and optimization.</p>
              <n-tag type="error" size="small" style="margin-top: 8px">Pending</n-tag>
            </div>
          </n-timeline-item>
        </n-timeline>
      </n-card>

      <n-card title="Timeline with Icons">
        <n-timeline>
          <n-timeline-item type="success" title="Registration" content="User account created">
            <template #icon>
              <n-icon :component="CheckmarkCircleOutline" style="font-size: 20px" />
            </template>
          </n-timeline-item>
          <n-timeline-item type="info" title="Verification" content="Email verification sent">
            <template #icon>
              <n-icon :component="MailOutline" style="font-size: 20px" />
            </template>
          </n-timeline-item>
          <n-timeline-item type="warning" title="Profile Setup" content="Complete your profile">
            <template #icon>
              <n-icon :component="PersonOutline" style="font-size: 20px" />
            </template>
          </n-timeline-item>
          <n-timeline-item type="error" title="Activation" content="Account activation pending">
            <template #icon>
              <n-icon :component="LockClosedOutline" style="font-size: 20px" />
            </template>
          </n-timeline-item>
        </n-timeline>
      </n-card>

      <n-card title="Horizontal Timeline">
        <n-timeline horizontal>
          <n-timeline-item type="success" title="Step 1" content="Completed" />
          <n-timeline-item type="success" title="Step 2" content="Completed" />
          <n-timeline-item type="info" title="Step 3" content="In Progress" />
          <n-timeline-item type="default" title="Step 4" content="Pending" />
        </n-timeline>
      </n-card>

      <n-card title="Timeline Sizes">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Small</h3>
            <n-timeline size="small">
              <n-timeline-item type="success" title="Small Item" content="Small timeline item" />
              <n-timeline-item type="info" title="Another Item" content="Compact timeline display" />
            </n-timeline>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Medium (Default)</h3>
            <n-timeline size="medium">
              <n-timeline-item type="success" title="Medium Item" content="Default timeline size" />
              <n-timeline-item type="info" title="Standard Size" content="Regular timeline display" />
            </n-timeline>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Large</h3>
            <n-timeline size="large">
              <n-timeline-item type="success" title="Large Item" content="Large timeline item" />
              <n-timeline-item type="info" title="Bigger Display" content="Prominent timeline display" />
            </n-timeline>
          </div>
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import {
  CheckmarkCircleOutline,
  MailOutline,
  PersonOutline,
  LockClosedOutline
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
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
</style>
