<template>
  <n-card class="meetings-card" :bordered="false">
      <div class="card-header">
        <h3 class="card-title">Upcoming Meetings</h3>
        <n-icon :size="24" color="#10b981" class="calendar-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
        </n-icon>
      </div>

      <div class="time-badge">in 30min</div>

      <div class="meetings-list">
        <div 
          v-for="meeting in meetings" 
          :key="meeting.id"
          class="meeting-item"
        >
          <div class="meeting-icon" :style="{ background: meeting.iconColor }">
            <n-icon :size="20" color="white">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 5h18v14H3z"/>
              </svg>
            </n-icon>
          </div>
          <div class="meeting-info">
            <h4 class="meeting-title">{{ meeting.title }}</h4>
            <p class="meeting-subtitle">{{ meeting.subtitle }}</p>
          </div>
        </div>
      </div>

      <div class="time-section">
        <div class="time-label">In 2hr</div>
        
        <div class="meetings-list">
          <div 
            v-for="meeting in laterMeetings" 
            :key="meeting.id"
            class="meeting-item"
          >
            <div class="meeting-icon" :style="{ background: meeting.iconColor }">
              <n-icon :size="20" color="white">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 5h18v14H3z"/>
                </svg>
              </n-icon>
            </div>
            <div class="meeting-info">
              <h4 class="meeting-title">{{ meeting.title }}</h4>
              <p class="meeting-subtitle">{{ meeting.subtitle }}</p>
            </div>
          </div>
        </div>
      </div>
    </n-card>
</template>

<script setup>
import { ref } from 'vue';
import { NCard, NIcon } from 'naive-ui';

const meetings = ref([
  {
    id: 1,
    title: "Sam Saltman's Meeting - Sales Team",
    subtitle: '',
    iconColor: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)'
  }
]);

const laterMeetings = ref([
  {
    id: 2,
    title: "Tom Harris's Meeting - Product Development",
    subtitle: '',
    iconColor: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)'
  },
  {
    id: 3,
    title: "Rachel Nguyen's Meeting - Client Success Review",
    subtitle: '',
    iconColor: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
  },
  {
    id: 4,
    title: "Emma Foster's Meeting - Team Performance Update",
    subtitle: '',
    iconColor: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)'
  }
]);
</script>

<style scoped>


.meetings-card {
  width: 100%;
  max-width: 420px;
  border-radius: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  background: white;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.calendar-icon {
  flex-shrink: 0;
}

.time-badge {
  color: #6b7280;
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
  background: #f9fafb;
  border-radius: 0.875rem;
  transition: all 0.2s ease;
  cursor: pointer;
}

.meeting-item:hover {
  background: #f3f4f6;
  transform: translateX(4px);
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
  color: #1f2937;
  margin: 0;
  line-height: 1.4;
}

.meeting-subtitle {
  font-size: 0.8125rem;
  color: #6b7280;
  margin: 0.25rem 0 0 0;
}

.time-section {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.time-label {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  font-weight: 500;
}
</style>