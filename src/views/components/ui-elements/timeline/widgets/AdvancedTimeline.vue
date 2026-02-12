<script setup lang="ts">
import {
  CheckmarkCircleOutline,
  InformationCircleOutline,
  AlertCircleOutline,
  TimeOutline,
  RocketOutline,
  PersonOutline,
  CodeSlashOutline,
  ConstructOutline,
  GitBranchOutline,
  FlaskOutline
} from '@vicons/ionicons5'
import CustomTag from '@/components/CustomTag.vue'
</script>

<template>
  <n-card title="Advanced Timeline">
    <n-space vertical :size="20">
      <!-- Timeline with Different States -->
      <div>
        <h3 class="section-title"> Timeline with Different States</h3>
        <n-timeline>
          <n-timeline-item type="success" title="Project Completed">
            <template #icon>
              <n-icon :component="CheckmarkCircleOutline" :size="20" />
            </template>
            <div class="timeline-content">
              <p>All deliverables have been completed successfully</p>
              <div class="timeline-meta">
                <CustomTag size="small" type="success">Completed</CustomTag>
                <span class="timeline-time">2 hours ago</span>
              </div>
            </div>
          </n-timeline-item>

          <n-timeline-item type="info" title="Review Phase">
            <template #icon>
              <n-icon :component="InformationCircleOutline" :size="20" />
            </template>
            <div class="timeline-content">
              <p>Project under review by stakeholders</p>
              <div class="timeline-meta">
                <CustomTag size="small" type="info">In Progress</CustomTag>
                <span class="timeline-time">1 day ago</span>
              </div>
            </div>
          </n-timeline-item>

          <n-timeline-item type="warning" title="Pending Approval">
            <template #icon>
              <n-icon :component="TimeOutline" :size="20" />
            </template>
            <div class="timeline-content">
              <p>Waiting for final approval from management</p>
              <div class="timeline-meta">
                <CustomTag size="small" type="warning">Pending</CustomTag>
                <span class="timeline-time">3 days ago</span>
              </div>
            </div>
          </n-timeline-item>

          <n-timeline-item type="error" title="Critical Issue">
            <template #icon>
              <n-icon :component="AlertCircleOutline" :size="20" />
            </template>
            <div class="timeline-content">
              <p>Security vulnerability detected in production</p>
              <div class="timeline-meta">
                <CustomTag size="small" type="error">Critical</CustomTag>
                <span class="timeline-time">5 days ago</span>
              </div>
            </div>
          </n-timeline-item>
        </n-timeline>
      </div>

      <!-- Timeline with Custom Content -->
      <div>
        <h3 class="section-title"> Timeline with Custom Content</h3>
        <n-timeline>
          <n-timeline-item type="success" title="New Feature Released">
            <template #icon>
              <n-icon :component="RocketOutline" :size="20" />
            </template>
            <div class="timeline-content">
              <p>User authentication system has been successfully deployed</p>
              <div class="timeline-details">
                <div class="detail-item">
                  <n-icon :component="PersonOutline" :size="16" />
                  <span>John Doe</span>
                </div>
                <div class="detail-item">
                  <n-icon :component="CodeSlashOutline" :size="16" />
                  <span>v2.4.0</span>
                </div>
              </div>
              <div class="timeline-meta">
                <CustomTag size="small" type="success">Released</CustomTag>
                <span class="timeline-time">Yesterday</span>
              </div>
            </div>
          </n-timeline-item>

          <n-timeline-item type="default" title="Bug Fix">
            <template #icon>
              <n-icon :component="ConstructOutline" :size="20" />
            </template>
            <div class="timeline-content">
              <p>Fixed memory leak in data processing module</p>
              <div class="timeline-details">
                <div class="detail-item">
                  <n-icon :component="GitBranchOutline" :size="16" />
                  <span>hotfix/memory-leak</span>
                </div>
              </div>
              <div class="timeline-meta">
                <CustomTag size="small">Fixed</CustomTag>
                <span class="timeline-time">2 days ago</span>
              </div>
            </div>
          </n-timeline-item>
        </n-timeline>
      </div>

      <!-- Timeline with Progress -->
      <div>
        <h3 class="section-title"> Timeline with Progress</h3>
        <n-timeline>
          <n-timeline-item type="success" title="Phase 1: Planning">
            <template #icon>
              <n-icon :component="CheckmarkCircleOutline" :size="20" />
            </template>
            <div class="timeline-content">
              <p>Project requirements and architecture design completed</p>
              <n-progress :percentage="100" type="line" :show-indicator="false" />
              <div class="timeline-meta">
                <span class="timeline-time">Completed</span>
              </div>
            </div>
          </n-timeline-item>

          <n-timeline-item type="info" title="Phase 2: Development">
            <template #icon>
              <n-icon :component="CodeSlashOutline" :size="20" />
            </template>
            <div class="timeline-content">
              <p>Core features implementation in progress</p>
              <n-progress :percentage="65" type="line" :show-indicator="false" />
              <div class="timeline-meta">
                <span class="timeline-time">65% Complete</span>
              </div>
            </div>
          </n-timeline-item>

          <n-timeline-item type="default" title="Phase 3: Testing">
            <template #icon>
              <n-icon :component="FlaskOutline" :size="20" />
            </template>
            <div class="timeline-content">
              <p>Quality assurance and testing phase</p>
              <n-progress :percentage="0" type="line" :show-indicator="false" />
              <div class="timeline-meta">
                <span class="timeline-time">Not Started</span>
              </div>
            </div>
          </n-timeline-item>
        </n-timeline>
      </div>
    </n-space>
  </n-card>
</template>

<style scoped>
.section-title {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
}

.timeline-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.timeline-content p {
  margin: 0;
  color: var(--text-primary);
  line-height: 1.5;
}

.timeline-details {
  display: flex;
  gap: 16px;
  margin-top: 4px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--text-secondary);
}

.detail-item .n-icon {
  font-size: 14px;
}

.timeline-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
}

.timeline-time {
  font-size: 12px;
  color: var(--text-tertiary);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .timeline-details {
    flex-direction: column;
    gap: 8px;
  }

  .timeline-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
