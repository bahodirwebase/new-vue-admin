<template>
  <div class="calendar-app">
    <!-- Calendar Header -->
    <div class="calendar-header-section">
      <div class="calendar-title-section">
        <h1 class="calendar-main-title">Calendar</h1>
        <p class="calendar-subtitle">Manage your events and schedule</p>
      </div>
      <div class="calendar-actions">
        <n-space>
          <n-button type="primary" @click="openEventModal">
            <template #icon>
              <n-icon :component="CreateOutline" />
            </template>
            Create Event
          </n-button>
        </n-space>
      </div>
    </div>

    <!-- Calendar Navigation -->
    <n-card class="calendar-nav-card">
      <div class="calendar-nav">
        <div class="nav-left">
          <n-button quaternary circle @click="previousMonth">
            <template #icon>
              <n-icon :component="ChevronBackOutline" />
            </template>
          </n-button>
          <h2 class="current-month">{{ currentMonthYear }}</h2>
          <n-button quaternary circle @click="nextMonth">
            <template #icon>
              <n-icon :component="ChevronForwardOutline" />
            </template>
          </n-button>
        </div>
        <div class="nav-right">
          <n-button @click="goToToday">Today</n-button>
        </div>
      </div>
    </n-card>

    <!-- Main Calendar Grid -->
    <div class="calendar-container">
      <n-card class="calendar-main-card">
        <div class="calendar-grid">
          <!-- Weekday headers -->
          <div class="weekday-header" v-for="day in weekdays" :key="day">
            {{ day }}
          </div>
          
          <!-- Calendar days -->
          <div 
            v-for="day in calendarDays" 
            :key="day.date.getTime()"
            class="calendar-day"
            :class="{
              'other-month': !day.isCurrentMonth,
              'today': day.isToday,
              'selected': isSelected(day.date),
              'has-events': day.events.length > 0
            }"
            @click="selectDate(day.date)"
          >
            <div class="day-number">{{ day.day }}</div>
            <div v-if="day.events.length > 0" class="event-badges">
              <n-tag 
                v-for="event in day.events.slice(0, 1)" 
                :key="event.id"
                size="small" 
                :type="event.color || 'primary'"
                class="event-badge"
              >
                {{ event.title }}
              </n-tag>
              <n-tag 
                v-if="day.events.length > 1" 
                size="small" 
                type="info"
                class="time-range-badge"
              >
                {{ getEventTimeRange(day.events) }}
              </n-tag>
            </div>
          </div>
        </div>
      </n-card>
    </div>

    <!-- Events Sidebar -->
    <div class="events-sidebar">
      <n-card title="Events" class="events-card" v-if="selectedDate">
        <div class="selected-date">
          {{ formatDate(selectedDate) }}
        </div>
        <div class="events-list">
          <div v-for="event in selectedDateEvents" :key="event.id" class="event-item">
            <div class="event-content">
              <div class="event-time">{{ event.time }}</div>
              <div class="event-title">{{ event.title }}</div>
              <div class="event-description" v-if="event.description">{{ event.description }}</div>
            </div>
            <div class="event-actions">
              <n-button size="small" @click="editEvent(event)">
                <template #icon>
                  <n-icon :component="CreateOutline" />
                </template>
              </n-button>
              <n-button size="small" type="error" @click="deleteEvent(event.id)">
                <template #icon>
                  <n-icon :component="TrashOutline" />
                </template>
              </n-button>
            </div>
          </div>
          <div v-if="selectedDateEvents.length === 0" class="no-events">
            No events scheduled
          </div>
        </div>
      </n-card>
    </div>
    
    <!-- Event Modal -->
    <n-modal v-model:show="showEventModal" preset="dialog" :title="editingEvent ? 'Edit Event' : 'Create Event'">
      <n-form :model="eventForm" :rules="eventRules" ref="eventFormRef">
        <n-form-item label="Event Title" path="title">
          <n-input v-model:value="eventForm.title" placeholder="Enter event title" />
        </n-form-item>
        <n-form-item label="Time Period">
          <n-space>
            <n-time-picker 
              v-model:value="eventForm.time" 
              format="HH:mm"
              placeholder="Start time"
            />
            <span class="time-separator">to</span>
            <n-time-picker 
              v-model:value="eventForm.endTime" 
              format="HH:mm"
              placeholder="End time"
            />
          </n-space>
        </n-form-item>
        <n-form-item label="Category">
          <n-select v-model:value="eventForm.color" :options="colorOptions" />
        </n-form-item>
        <n-form-item label="Description" path="description">
          <n-input v-model:value="eventForm.description" type="textarea" placeholder="Event description (optional)" />
        </n-form-item>
      </n-form>
      <template #action>
        <n-space>
          <n-button @click="closeEventModal">Cancel</n-button>
          <n-button type="primary" @click="saveEvent">
            {{ editingEvent ? 'Update' : 'Create' }}
          </n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { ChevronBackOutline, ChevronForwardOutline, CreateOutline, TrashOutline } from '@vicons/ionicons5'
import type { FormRules, FormInst } from 'naive-ui'

interface CalendarDay {
  date: Date
  day: number
  isCurrentMonth: boolean
  isToday: boolean
  events: Event[]
}

interface Event {
  id: string
  title: string
  time: string
  description?: string
  date: Date
  color?: string
}

const currentDate = ref(new Date())
const selectedDate = ref<Date | null>(null)
const showEventModal = ref(false)
const editingEvent = ref<Event | null>(null)
const eventFormRef = ref<FormInst | null>(null)

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const colorOptions = [
  { label: 'Primary', value: 'primary' },
  { label: 'Success', value: 'success' },
  { label: 'Warning', value: 'warning' },
  { label: 'Error', value: 'error' },
  { label: 'Info', value: 'info' }
]

const eventForm = ref({
  title: '',
  time: new Date().setHours(9, 0, 0, 0),
  endTime: new Date().setHours(10, 0, 0, 0),
  description: '',
  color: 'primary'
})

const eventRules: FormRules = {
  title: {
    required: true,
    message: 'Please enter event title',
    trigger: 'blur'
  }
}

// Events storage
const events = ref<Event[]>([
  {
    id: '1',
    title: 'Team Meeting',
    time: '10:00',
    description: 'Weekly team sync meeting',
    date: new Date(2024, 0, 15),
    color: 'primary'
  },
  {
    id: '2',
    title: 'Lunch with Client',
    time: '12:30',
    description: 'Discuss project requirements',
    date: new Date(2024, 0, 15),
    color: 'success'
  },
  {
    id: '3',
    title: 'Project Review',
    time: '15:00',
    description: 'Q1 project review presentation',
    date: new Date(2024, 0, 20),
    color: 'warning'
  }
])

const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  })
})

const calendarDays = computed((): CalendarDay[] => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())
  
  const days: CalendarDay[] = []
  const today = new Date()
  
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    
    days.push({
      date,
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === month,
      isToday: date.toDateString() === today.toDateString(),
      events: getEventsForDate(date)
    })
  }
  
  return days
})

const selectedDateEvents = computed(() => {
  if (!selectedDate.value) return []
  return getEventsForDate(selectedDate.value)
})

const getEventsForDate = (date: Date): Event[] => {
  return events.value.filter(event => 
    event.date.toDateString() === date.toDateString()
  )
}

const previousMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  )
}

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  )
}

const goToToday = () => {
  currentDate.value = new Date()
  selectedDate.value = new Date()
}

const selectDate = (date: Date) => {
  selectedDate.value = date
}

const isSelected = (date: Date): boolean => {
  return selectedDate.value?.toDateString() === date.toDateString()
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getEventTimeRange = (events: Event[]): string => {
  if (events.length === 0) return ''
  if (events.length === 1) return events[0].time
  
  const times = events.map(e => e.time).sort()
  return `${times[0]} - ${times[times.length - 1]}`
}

const openEventModal = () => {
  if (!selectedDate.value) {
    selectedDate.value = new Date()
  }
  editingEvent.value = null
  eventForm.value = {
    title: '',
    time: new Date().setHours(9, 0, 0, 0),
    endTime: new Date().setHours(10, 0, 0, 0),
    description: '',
    color: 'primary'
  }
  showEventModal.value = true
}

const closeEventModal = () => {
  showEventModal.value = false
  editingEvent.value = null
  eventForm.value = {
    title: '',
    time: new Date().setHours(9, 0, 0, 0),
    endTime: new Date().setHours(10, 0, 0, 0),
    description: '',
    color: 'primary'
  }
}

const saveEvent = async () => {
  if (!eventFormRef.value) return
  
  try {
    await eventFormRef.value.validate()
    
    if (!selectedDate.value) return
    
    if (editingEvent.value) {
      // Update existing event
      const index = events.value.findIndex(e => e.id === editingEvent.value!.id)
      if (index !== -1) {
        events.value[index] = {
          ...editingEvent.value,
          title: eventForm.value.title,
          time: eventForm.value.time ? formatTime(eventForm.value.time) : '09:00',
          description: eventForm.value.description,
          color: eventForm.value.color
        }
      }
    } else {
      // Add new event
      const newEvent: Event = {
        id: Date.now().toString(),
        title: eventForm.value.title,
        time: eventForm.value.time ? formatTime(eventForm.value.time) : '09:00',
        description: eventForm.value.description,
        date: selectedDate.value,
        color: eventForm.value.color
      }
      events.value.push(newEvent)
    }
    
    closeEventModal()
  } catch (error) {
    console.error('Form validation failed:', error)
  }
}

const editEvent = (event: Event) => {
  editingEvent.value = event
  eventForm.value = {
    title: event.title,
    time: parseTime(event.time),
    endTime: new Date().setHours(10, 0, 0, 0),
    description: event.description || '',
    color: event.color || 'primary'
  }
  showEventModal.value = true
}

const deleteEvent = (eventId: string) => {
  const index = events.value.findIndex(e => e.id === eventId)
  if (index !== -1) {
    events.value.splice(index, 1)
  }
}

const formatTime = (timestamp: number): string => {
  if (!timestamp) return '00:00'
  const date = new Date(timestamp)
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  })
}

const parseTime = (timeString: string): number => {
  if (!timeString) return new Date().getTime()
  const [hours, minutes] = timeString.split(':').map(Number)
  const date = new Date()
  date.setHours(hours || 0, minutes || 0, 0, 0)
  return date.getTime()
}

onMounted(() => {
  selectedDate.value = new Date()
})
</script>

<style scoped>
.calendar-app {
  padding: 24px;
  background: var(--bg-color);
  min-height: 100vh;
}

.calendar-header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 0 8px;
}

.calendar-title-section h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
}

.calendar-subtitle {
  margin: 4px 0 0 0;
  color: var(--text-secondary);
  font-size: 14px;
}

.calendar-nav-card {
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.calendar-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.current-month {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  min-width: 200px;
  text-align: center;
}

.calendar-container {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px;
}

.calendar-main-card {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: var(--border-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

.weekday-header {
  background: var(--bg-secondary);
  padding: 12px 8px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-color);
}

.calendar-day {
  background: var(--bg-primary);
  min-height: 80px;
  padding: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  border-right: 1px solid var(--border-color);
}

.calendar-day:hover {
  background: var(--bg-hover);
}

.calendar-day.other-month {
  background: var(--bg-secondary);
  color: var(--text-secondary);
}

.calendar-day.today {
  background: var(--primary-color);
  color: white;
}

.calendar-day.selected {
  background: var(--primary-color);
  color: white;
  box-shadow: 0 0 0 2px var(--primary-color);
}

.calendar-day.has-events {
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
}

.day-number {
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 4px;
}

.event-badges {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
}

.event-badge {
  font-size: 9px;
  height: 16px;
  line-height: 14px;
  padding: 0 4px;
  border-radius: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.time-range-badge {
  font-size: 8px;
  height: 14px;
  line-height: 12px;
  padding: 0 3px;
  border-radius: 2px;
  align-self: flex-start;
}

.events-sidebar {
  position: sticky;
  top: 24px;
  height: fit-content;
}

.events-card {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.selected-date {
  font-weight: 600;
  margin-bottom: 16px;
  padding: 12px;
  background: var(--bg-secondary);
  border-radius: 6px;
  color: var(--text-primary);
}

.events-list {
  max-height: 400px;
  overflow-y: auto;
  padding: 0 12px;
}

.event-item {
  padding: 12px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  transition: background 0.2s ease;
}

.event-item:hover {
  background: var(--bg-hover);
}

.event-content {
  flex: 1;
  min-width: 0;
}

.event-title {
  color: var(--text-primary);
  font-weight: 600;
  margin-bottom: 4px;
  font-size: 14px;
}

.event-description {
  color: var(--text-secondary);
  font-size: 13px;
  line-height: 1.4;
}

.event-actions {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.no-events {
  text-align: center;
  color: var(--text-secondary);
  padding: 24px;
  font-style: italic;
}

.time-separator {
  color: var(--text-secondary);
  margin: 0 8px;
  font-weight: 500;
}

@media (max-width: 1024px) {
  .calendar-container {
    grid-template-columns: 1fr;
  }
  
  .events-sidebar {
    position: static;
    margin-top: 24px;
  }
}

@media (max-width: 768px) {
  .calendar-app {
    padding: 16px;
  }
  
  .calendar-header-section {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  
  .calendar-nav {
    flex-direction: column;
    gap: 16px;
  }
  
  .nav-left {
    width: 100%;
    justify-content: space-between;
  }
  
  .current-month {
    min-width: auto;
  }
  
  .weekday-header,
  .calendar-day {
    padding: 4px;
    min-height: 40px;
  }
}
</style>
