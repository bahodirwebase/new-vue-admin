<template>
  <div class="calendar-app">
    <!-- Main Content -->
    <main class="calendar-main">
      <!-- Sidebar -->
      <aside class="calendar-sidebar">
        <n-card title="Calendar Tools" class="sidebar-card">
          <n-space vertical size="large">
            <!-- View Switcher -->
            <div class="view-switcher">
              <n-button type="primary" size="large" block @click="openEventModal">
                <template #icon>
                  <n-icon ><AddOutline /></n-icon>
                </template>
                New Event
              </n-button>
              <!-- <h4>View</h4> -->
              <n-button-group  vertical size="large" style="width: 100%; margin-top: 12px;">
                <n-button
                  v-for="view in viewOptions"
                  :key="view.value"
                  :type="currentView === view.value ? 'primary' : 'default'"
                  @click="currentView = view.value"
                  style="width: 100%; justify-content: flex-start"
                >
                  <template #icon>
                    <n-icon :component="view.icon" />
                  </template>
                  {{ view.label }}
                </n-button>
              </n-button-group>
            </div>

            <!-- Statistics -->
            <div class="stats-section">
              <h4>Statistics</h4>
              <div class="stats-grid">
                <div class="stat-card">
                  <div class="stat-number">{{ events.length }}</div>
                  <div class="stat-label">Total Events</div>
                </div>
                <div class="stat-card">
                  <div class="stat-number">{{ todayEvents.length }}</div>
                  <div class="stat-label">Today</div>
                </div>
                <div class="stat-card">
                  <div class="stat-number">{{ thisWeekEvents.length }}</div>
                  <div class="stat-label">This Week</div>
                </div>
                <div class="stat-card">
                  <div class="stat-number">{{ upcomingEvents.length }}</div>
                  <div class="stat-label">Upcoming</div>
                </div>
              </div>
            </div>

            <!-- Current Period -->
            <div class="period-section">
              <h4>Current Period</h4>
              <div class="period-info">
                <n-tag type="info" size="large">
                  {{ currentPeriodInfo }}
                </n-tag>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="actions-section">
              <h4>Quick Actions</h4>
              <n-space vertical>
                <n-button dashed @click="exportEvents" style="width: 100%">
                  <template #icon>
                    <n-icon><DownloadOutline /></n-icon>
                  </template>
                  Export Events
                </n-button>
                <n-button dashed @click="clearAllEvents" style="width: 100%">
                  <template #icon>
                    <n-icon><TrashOutline /></n-icon>
                  </template>
                  Clear All
                </n-button>
              </n-space>
            </div>
          </n-space>
        </n-card>
      </aside>

      <!-- Calendar Content -->
      <section class="calendar-content">
        <n-card class="calendar-card">
          <!-- Month View -->
          <div v-if="currentView === 'month'" class="month-view">
            
            <n-calendar
              v-model:value="activeDate"
              #default="{ year, month, date }"
              class="custom-calendar"
            >
              <div class="calendar-day-content">
                <div class="day-number">{{ date }}</div>
                <div
                  v-if="getEventsForDate(year, month, date).length > 0"
                  class="event-indicators"
                >
                  <div
                    v-for="event in getEventsForDate(year, month, date).slice(
                      0,
                      3
                    )"
                    :key="event.id"
                    class="event-dot"
                    :style="{ backgroundColor: event.color }"
                    :title="event.title"
                  ></div>
                  <div
                    v-if="getEventsForDate(year, month, date).length > 3"
                    class="more-events"
                  >
                    +{{ getEventsForDate(year, month, date).length - 3 }}
                  </div>
                </div>
              </div>
            </n-calendar>
          </div>

          <!-- Week View -->
          <div v-else-if="currentView === 'week'" class="week-view">
            <div class="view-header">
              <n-space justify="space-between" align="center">
                <n-button quaternary circle @click="previousWeek">
                  <template #icon>
                    <n-icon><ChevronBackOutline /></n-icon>
                  </template>
                </n-button>
                <h2 class="view-title">{{ weekRange }}</h2>
                <n-button quaternary circle @click="nextWeek">
                  <template #icon>
                    <n-icon><ChevronForwardOutline /></n-icon>
                  </template>
                </n-button>
              </n-space>
            </div>
            <div class="week-grid">
              <div class="time-column">
                <div v-for="hour in 24" :key="hour" class="time-slot">
                  {{ String(hour - 1).padStart(2, "0") }}:00
                </div>
              </div>
              <div
                v-for="day in weekDays"
                :key="day.date.getTime()"
                class="day-column"
              >
                <div class="day-header">
                  <div class="day-name">{{ day.name }}</div>
                  <div class="day-date">{{ day.date.getDate() }}</div>
                </div>
                <div class="day-events">
                  <div
                    v-for="event in getEventsForDay(day.date)"
                    :key="event.id"
                    class="week-event"
                    :style="{ backgroundColor: event.color }"
                  >
                    <n-ellipsis style="max-width: 120px">
                      {{ event.title }}
                    </n-ellipsis>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Day View -->
          <div v-else-if="currentView === 'day'" class="day-view">
            <div class="view-header">
              <n-space justify="space-between" align="center">
                <n-button quaternary circle @click="previousDay">
                  <template #icon>
                    <n-icon><ChevronBackOutline /></n-icon>
                  </template>
                </n-button>
                <h2 class="view-title">{{ selectedDayFormatted }}</h2>
                <n-button quaternary circle @click="nextDay">
                  <template #icon>
                    <n-icon><ChevronForwardOutline /></n-icon>
                  </template>
                </n-button>
              </n-space>
            </div>
            <div class="day-timeline">
              <div v-for="hour in 24" :key="hour" class="hour-row">
                <div class="hour-label">
                  {{ String(hour - 1).padStart(2, "0") }}:00
                </div>
                <div class="hour-content">
                  <div
                    v-for="event in getEventsForHour(activeDate, hour - 1)"
                    :key="event.id"
                    class="day-event"
                  >
                    <n-tag :color="{ color: event.color, textColor: '#fff' }">
                      {{ event.title }}
                    </n-tag>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- List View -->
          <div v-else-if="currentView === 'list'" class="list-view">
            <div class="view-header">
              <h2 class="view-title">All Events</h2>
            </div>
            <div class="events-list">
              <div
                v-for="event in sortedEvents"
                :key="event.id"
                class="event-item"
              >
                <div
                  class="event-color-bar"
                  :style="{ backgroundColor: event.color }"
                ></div>
                <div class="event-content">
                  <div class="event-header">
                    <h4 class="event-title">{{ event.title }}</h4>
                    <n-tag
                      :color="{ color: event.color, textColor: '#fff' }"
                      size="small"
                    >
                      {{ event.category }}
                    </n-tag>
                  </div>
                  <div class="event-details">
                    <p class="event-date">{{ formatDate(event.date) }}</p>
                    <p class="event-time">{{ event.time }}</p>
                  </div>
                  <p v-if="event.description" class="event-description">
                    {{ event.description }}
                  </p>
                </div>
                <div class="event-actions">
                  <n-button
                    quaternary
                    circle
                    size="small"
                    @click="editEvent(event)"
                  >
                    <template #icon>
                      <n-icon><CreateOutline /></n-icon>
                    </template>
                  </n-button>
                  <n-button
                    quaternary
                    circle
                    size="small"
                    type="error"
                    @click="deleteEvent(event.id)"
                  >
                    <template #icon>
                      <n-icon><TrashOutline /></n-icon>
                    </template>
                  </n-button>
                </div>
              </div>
            </div>
          </div>
        </n-card>
      </section>
    </main>

    <!-- Event Modal -->
    <n-modal
      v-model:show="showModal"
      :mask-closable="false"
      preset="card"
      :title="editingEvent ? 'Edit Event' : 'Create New Event'"
      style="width: 600px"
      class="event-modal"
    >
      <n-form ref="formRef" :model="eventForm" :rules="formRules">
        <n-form-item label="Event Title" path="title">
          <n-input
            v-model:value="eventForm.title"
            placeholder="Enter event title"
            size="large"
          />
        </n-form-item>

        <n-grid :cols="2" :x-gap="16">
          <n-form-item-grid-item :span="1">
            <n-form-item label="Date">
              <n-date-picker
                v-model:value="eventForm.date"
                type="date"
                value-format="timestamp"
                size="large"
                style="width: 100%"
              />
            </n-form-item>
          </n-form-item-grid-item>
          <n-form-item-grid-item :span="1">
            <n-form-item label="Time">
              <n-time-picker
                v-model:value="eventForm.time"
                format="HH:mm"
                value-format="timestamp"
                size="large"
                style="width: 100%"
              />
            </n-form-item>
          </n-form-item-grid-item>
        </n-grid>

        <n-form-item label="Category" path="category">
          <n-select
            v-model:value="eventForm.category"
            :options="categoryOptions"
            placeholder="Select category"
            size="large"
          />
        </n-form-item>

        <n-form-item label="Color" path="color">
          <n-color-picker
            v-model:value="eventForm.color"
            :modes="['hex']"
            size="large"
            style="width: 100%"
          />
        </n-form-item>

        <n-form-item label="Description" path="description">
          <n-input
            v-model:value="eventForm.description"
            type="textarea"
            placeholder="Event description (optional)"
            :rows="3"
            size="large"
          />
        </n-form-item>
      </n-form>

      <template #footer>
        <n-space justify="end">
          <n-button @click="closeModal">Cancel</n-button>
          <n-button type="primary" @click="saveEvent">
            {{ editingEvent ? "Update" : "Create" }}
          </n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useMessage } from "naive-ui";
import {
  CreateOutline,
  TrashOutline,
  DownloadOutline,
  ChevronBackOutline,
  ChevronForwardOutline,
  GridOutline,
  ListOutline,
  CalendarNumberOutline,
  TimeOutline,
  AddOutline,
} from "@vicons/ionicons5";
import type { FormRules, FormInst } from "naive-ui";

interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  category: string;
  color: string;
  description?: string;
}

const message = useMessage();
const formRef = ref<FormInst | null>(null);
const currentView = ref("month");
const activeDate = ref(Date.now());
const showModal = ref(false);
const editingEvent = ref<Event | null>(null);

// View options with icons
const viewOptions = [
  { label: "Month", value: "month", icon: CalendarNumberOutline },
  { label: "Week", value: "week", icon: GridOutline },
  { label: "Day", value: "day", icon: TimeOutline },
  { label: "List", value: "list", icon: ListOutline },
];

// Category options
const categoryOptions = [
  { label: "Work", value: "work" },
  { label: "Personal", value: "personal" },
  { label: "Meeting", value: "meeting" },
  { label: "Education", value: "education" },
  { label: "Health", value: "health" },
  { label: "Social", value: "social" },
  { label: "Other", value: "other" },
];

// Form validation rules
const formRules: FormRules = {
  title: {
    required: true,
    message: "Please enter event title",
    trigger: "blur",
  },
};

// Event form
const eventForm = ref({
  title: "",
  date: Date.now(),
  time: Date.now(),
  category: "work",
  color: "#18a058",
  description: "",
});

// Sample events
const events = ref<Event[]>([
  {
    id: 1,
    title: "Team Meeting",
    date: new Date(),
    time: "10:00",
    category: "work",
    color: "#18a058",
    description: "Weekly team sync meeting",
  },
  {
    id: 2,
    title: "Lunch with Client",
    date: new Date(),
    time: "12:30",
    category: "work",
    color: "#2080f0",
    description: "Discuss project requirements",
  },
  {
    id: 3,
    title: "Gym Session",
    date: new Date(Date.now() + 24 * 60 * 60 * 1000),
    time: "18:00",
    category: "health",
    color: "#f0a020",
    description: "Workout session",
  },
]);

// Computed properties
const currentMonthYear = computed(() => {
  return new Date(activeDate.value).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
});

const weekDays = computed(() => {
  const startOfWeek = new Date(activeDate.value);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day;
  startOfWeek.setDate(diff);

  const days = [];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);
    days.push({
      name: dayNames[i],
      date: currentDate,
    });
  }

  return days;
});

const weekRange = computed(() => {
  const start = weekDays.value[0].date;
  const end = weekDays.value[6].date;
  return `${start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })} - ${end.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;
});

const selectedDayFormatted = computed(() => {
  return new Date(activeDate.value).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

const sortedEvents = computed(() => {
  return [...events.value].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });
});

const todayEvents = computed(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return events.value.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate >= today && eventDate < tomorrow;
  });
});

const thisWeekEvents = computed(() => {
  const today = new Date();
  const startOfWeek = new Date(today);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day;
  startOfWeek.setDate(diff);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  return events.value.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate >= startOfWeek && eventDate <= endOfWeek;
  });
});

const upcomingEvents = computed(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return events.value.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate >= today;
  });
});

const currentPeriodInfo = computed(() => {
  switch (currentView.value) {
    case "month":
      return currentMonthYear.value;
    case "week":
      return weekRange.value;
    case "day":
      return selectedDayFormatted.value;
    case "list":
      return `All Events (${events.value.length})`;
    default:
      return "";
  }
});

// Methods
const getEventsForDate = (year: number, month: number, date: number) => {
  return events.value.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year &&
      eventDate.getMonth() === month - 1 && // Fix month indexing
      eventDate.getDate() === date
    );
  });
};

const getEventsForDay = (date: Date) => {
  return events.value.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.toDateString() === date.toDateString();
  });
};

const getEventsForHour = (date: number, hour: number) => {
  return events.value.filter((event) => {
    const eventDate = new Date(event.date);
    const eventHour = parseInt(event.time.split(":")[0]);
    return (
      eventDate.toDateString() === new Date(date).toDateString() &&
      eventHour === hour
    );
  });
};

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Navigation


const previousWeek = () => {
  const newDate = new Date(activeDate.value);
  newDate.setDate(newDate.getDate() - 7);
  activeDate.value = newDate.getTime();
};

const nextWeek = () => {
  const newDate = new Date(activeDate.value);
  newDate.setDate(newDate.getDate() + 7);
  activeDate.value = newDate.getTime();
};

const previousDay = () => {
  const newDate = new Date(activeDate.value);
  newDate.setDate(newDate.getDate() - 1);
  activeDate.value = newDate.getTime();
};

const nextDay = () => {
  const newDate = new Date(activeDate.value);
  newDate.setDate(newDate.getDate() + 1);
  activeDate.value = newDate.getTime();
};

// Event management
const openEventModal = () => {
  editingEvent.value = null;
  eventForm.value = {
    title: "",
    date: Date.now(),
    time: Date.now(),
    category: "work",
    color: "#18a058",
    description: "",
  };
  showModal.value = true;
};

const editEvent = (event: Event) => {
  editingEvent.value = event;
  eventForm.value = {
    title: event.title,
    date: event.date.getTime(),
    time: new Date().setHours(
      ...(event.time.split(":").map(Number) as [number, number]),
      0,
      0
    ),
    category: event.category,
    color: event.color,
    description: event.description || "",
  };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editingEvent.value = null;
  eventForm.value = {
    title: "",
    date: Date.now(),
    time: Date.now(),
    category: "work",
    color: "#18a058",
    description: "",
  };
};

const saveEvent = async () => {
  if (!formRef.value) return;

  try {
    await formRef.value.validate();

    const eventData = {
      ...eventForm.value,
      date: new Date(eventForm.value.date!),
      time: new Date(eventForm.value.time!).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    };

    if (editingEvent.value) {
      // Update existing event
      const index = events.value.findIndex(
        (e) => e.id === editingEvent.value!.id
      );
      if (index !== -1) {
        events.value[index] = { ...eventData, id: editingEvent.value!.id };
      }
      message.success("Event updated successfully");
    } else {
      // Create new event
      events.value.push({ ...eventData, id: Date.now() });
      message.success("Event created successfully");
    }

    closeModal();
  } catch (error) {
    console.error("Form validation failed:", error);
  }
};

const deleteEvent = (eventId: number) => {
  const index = events.value.findIndex((e) => e.id === eventId);
  if (index !== -1) {
    events.value.splice(index, 1);
    message.success("Event deleted successfully");
  }
};

const exportEvents = () => {
  const data = JSON.stringify(events.value, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `events-${new Date().toISOString().split("T")[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  message.success("Events exported successfully");
};

const clearAllEvents = () => {
  events.value = [];
  message.success("All events cleared");
};

onMounted(() => {
  activeDate.value = Date.now();
});
</script>

<style scoped>
.calendar-app {
  min-height: 100vh;
  padding: 20px;
  color: var(--text-primary);
}

/* Header Styles */
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  backdrop-filter: blur(10px);
  border-radius: 16px;
  margin-bottom: 24px;
  box-shadow: 0 8px 32px var(--shadow-light);
}

.header-left h1 {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-left p {
  margin: 4px 0 0 0;
  color: var(--text-secondary);
  font-size: 16px;
}

/* Main Layout */
.calendar-main {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 24px;
  height: calc(100vh - 140px);
}

/* Sidebar */
.calendar-sidebar {
  height: fit-content;
}

.sidebar-card {
  border-radius: 16px;
  box-shadow: 0 8px 32px var(--shadow-light);
  /* background: var(--bg-card); */
}

.view-switcher h4,
.stats-section h4,
.period-section h4,
.actions-section h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.stat-card {
  background: linear-gradient(
    135deg,
    var(--bg-secondary) 0%,
    var(--border-color) 100%
  );
  padding: 16px;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-number {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
}

.stat-label {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 4px;
}

.period-info {
  text-align: center;
}

/* Calendar Content */
.calendar-content {
  height: fit-content;
}

.calendar-card {
  border-radius: 16px;
  box-shadow: 0 8px 32px var(--shadow-light);
  height: fit-content;
  /* background: var(--bg-card); */
}

.view-header {
  padding: 24px 24px 16px;
  border-bottom: 1px solid var(--border-color);
}

.view-title {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
}

/* Calendar Styles */
.custom-calendar {
  padding: 16px;
}

.calendar-day-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 4px;
}

.day-number {
  font-weight: 600;
  font-size: 14px;
  color: var(--text-primary);
  margin-bottom: auto;
  transition: color 0.2s ease;
}

.calendar-day-content:hover .day-number {
  color: var(--primary-color);
}

.event-indicators {
  display: flex;
  gap: 2px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.event-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.event-dot:hover {
  transform: scale(1.5);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.more-events {
  font-size: 8px;
  color: var(--text-secondary);
  margin-left: 2px;
  transition: color 0.2s ease;
}

.calendar-day-content:hover .more-events {
  color: var(--primary-color);
}

/* Week View */
.week-grid {
  display: grid;
  grid-template-columns: 80px repeat(7, 1fr);
  gap: 1px;
  background: var(--border-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  min-height: 500px;
}

.time-column {
  background: var(--bg-secondary);
}

.time-slot {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.2s ease;
}

.time-slot:hover {
  background-color: var(--bg-tertiary);
}

.day-column {
  background: var(--bg-card);
  border-right: 1px solid var(--border-color);
  position: relative;
  transition: background-color 0.2s ease;
}

.day-column:hover {
  background-color: var(--bg-secondary);
}

.day-header {
  background: var(--bg-secondary);
  padding: 12px 8px;
  text-align: center;
  border-bottom: 1px solid var(--border-color);
}

.day-name {
  font-weight: 600;
  font-size: 12px;
  color: var(--text-primary);
}

.day-date {
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 2px;
}

.day-events {
  position: relative;
  min-height: 440px;
  padding: 8px;
}

.week-event {
  padding: 4px 8px;
  margin-bottom: 4px;
  border-radius: 6px;
  font-size: 12px;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.week-event:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Day View */
.day-timeline {
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
}

.hour-row {
  display: flex;
  border-bottom: 1px solid var(--border-color);
  min-height: 60px;
  transition: background-color 0.2s ease;
}

.hour-row:hover {
  background-color: var(--bg-secondary);
}

.hour-row:last-child {
  border-bottom: none;
}

.hour-label {
  width: 80px;
  padding: 16px;
  font-weight: 500;
  color: var(--text-secondary);
  border-right: 1px solid var(--border-color);
  background: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.hour-label:hover {
  background-color: var(--bg-tertiary);
}

.hour-content {
  flex: 1;
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.day-event {
  margin-bottom: 4px;
  padding: 8px;
  border-radius: 6px;
  background: #475569;
  color: var(--text-primary);
  transition: all 0.2s ease;
  cursor: pointer;
}

.day-event:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* List View */
.events-list {
  max-height: 600px;
  overflow-y: auto;
  padding: 16px;
  background: var(--bg-card);
  border-radius: 12px;
}

.event-item {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  margin-bottom: 12px;
  transition: all 0.2s ease;
  gap: 16px;
}

.event-item:hover {
  box-shadow: 0 4px 12px var(--shadow-light);
  transform: translateY(-2px);
}

.event-color-bar {
  width: 4px;
  border-radius: 2px;
  flex-shrink: 0;
  margin-top: 4px;
  background: var(--text-secondary);
}

.event-content {
  flex: 1;
  min-width: 0;
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.event-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.event-details {
  margin-bottom: 8px;
}

.event-date,
.event-time {
  margin: 0;
  font-size: 14px;
  color: var(--text-secondary);
}

.event-description {
  margin: 0;
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.4;
}

.event-actions {
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.event-item:hover .event-actions {
  opacity: 1;
}

/* Modal */
.event-modal {
  border-radius: 16px;
  background: var(--bg-card);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .calendar-main {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .calendar-sidebar {
    order: 2;
  }

  .calendar-content {
    order: 1;
  }
}

@media (max-width: 768px) {
  .calendar-app {
    padding: 12px;
  }

  .calendar-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    padding: 20px;
  }

  .header-left h1 {
    font-size: 24px;
  }

  .calendar-main {
    gap: 16px;
  }

  .week-grid {
    grid-template-columns: 60px repeat(7, 1fr);
  }

  .time-slot {
    font-size: 10px;
  }

  .hour-label {
    width: 60px;
    font-size: 12px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}

/* Calendar Active Day - Light primary background */
:deep(.n-calendar-cell--current) {
  background-color: rgba(102, 126, 234, 0.1) !important;
}

:deep(.n-calendar-cell--selected) {
  background-color: rgba(102, 126, 234, 0.2) !important;
}

/* Dark theme for calendar cells */
@media (prefers-color-scheme: dark) {
  :deep(.n-calendar) {
    background-color: var(--bg-card) !important;
  }

  :deep(.n-calendar .n-calendar-day) {
    color: var(--text-primary) !important;
    border-color: var(--border-color) !important;
  }

  :deep(.n-calendar .n-calendar-day:hover) {
    background-color: var(--bg-secondary) !important;
  }

  :deep(.n-calendar .n-calendar-day.n-calendar-cell--today) {
    background-color: rgba(102, 126, 234, 0.1) !important;
  }

  :deep(.n-calendar .n-calendar-weekdays) {
    color: var(--text-secondary) !important;
    border-color: var(--border-color) !important;
  }

  :deep(.n-calendar .n-calendar-month) {
    color: var(--text-secondary) !important;
    border-color: var(--border-color) !important;
  }
}
</style>
