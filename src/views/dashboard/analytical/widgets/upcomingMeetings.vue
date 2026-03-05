<script setup lang="ts">
import { NCard, NIcon } from 'naive-ui';
import { UPCOMING_MEETINGS, LATER_MEETINGS } from '../constants';

const meetings = UPCOMING_MEETINGS;
const laterMeetings = LATER_MEETINGS;
</script>

<template>
  <n-card class="meetings-card" :bordered="false">
    <div class="card-header">
      <h3 class="card-title">Upcoming Meetings</h3>
      <n-icon :size="24" color="var(--color-success)" class="calendar-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </n-icon>
    </div>

    <div class="time-badge">in 30min</div>

    <div class="meetings-list">
      <div v-for="meeting in meetings" :key="meeting.id" class="meeting-item">
        <div class="meeting-icon" :style="{ background: meeting.iconColor }">
          <n-icon :size="20" color="white">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 5h18v14H3z" />
            </svg>
          </n-icon>
        </div>
        <div class="meeting-info">
          <h4 class="meeting-title">{{ meeting.title }}</h4>
        </div>
      </div>
    </div>

    <div class="time-section">
      <div class="time-label">In 2hr</div>

      <div class="meetings-list">
        <div v-for="meeting in laterMeetings" :key="meeting.id" class="meeting-item">
          <div class="meeting-icon" :style="{ background: meeting.iconColor }">
            <n-icon :size="20" color="white">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 5h18v14H3z" />
              </svg>
            </n-icon>
          </div>
          <div class="meeting-info">
            <h4 class="meeting-title">{{ meeting.title }}</h4>
          </div>
        </div>
      </div>
    </div>
  </n-card>
</template>

<style scoped>
.meetings-card {
  width: 100%;
  max-width: 420px;
  border-radius: 1.5rem;
  box-shadow: var(--shadow-md);
  background: var(--bg-primary);
}

.card-title {
  font-size: 1.5rem;
}

.calendar-icon {
  flex-shrink: 0;
}

.time-badge {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 1rem;
  font-weight: 500;
}

.meetings-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.meeting-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 0.875rem;
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid var(--border-color);
}

.meeting-item:hover {
  background: var(--bg-tertiary);
  transform: translateX(4px);
  border-color: var(--color-primary);
}

.meeting-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.meeting-info {
  flex: 1;
  min-width: 0;
}

.meeting-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.4;
}

.time-section {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.time-label {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 1rem;
  font-weight: 500;
}

/* Dark mode specific styles */
[data-theme="dark"] .meeting-item:hover {
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
}

/* Responsive design */
@media (max-width: 768px) {
  .meetings-card {
    max-width: 100%;
  }

  .meeting-item {
    padding: 0.875rem;
  }
}
</style>