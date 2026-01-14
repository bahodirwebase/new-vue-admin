<template>
  <div class="datepicker-demo">
    <n-space vertical :size="24">
      <n-card title="Basic DatePicker">
        <n-space vertical :size="16">
          <n-date-picker
            v-model:value="basicValue"
            type="date"
            placeholder="Select date"
          />
          <n-p>Selected date: {{ formatDate(basicValue) }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Date Range">
        <n-space vertical :size="16">
          <n-date-picker
            v-model:value="rangeValue"
            type="daterange"
            placeholder="Select date range"
          />
          <n-p>Range: {{ formatDateRange(rangeValue) }}</n-p>
        </n-space>
      </n-card>

      <n-card title="DateTime Picker">
        <n-space vertical :size="16">
          <n-date-picker
            v-model:value="datetimeValue"
            type="datetime"
            placeholder="Select date and time"
          />
          <n-p>Selected datetime: {{ formatDateTime(datetimeValue) }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Custom Format">
        <n-space vertical :size="16">
          <n-date-picker
            v-model:value="formatValue"
            type="date"
            format="yyyy-MM-dd"
            placeholder="YYYY-MM-DD"
          />
          <n-p>Formatted: {{ formatDate(formatValue) }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Disabled Dates">
        <n-space vertical :size="16">
          <n-date-picker
            v-model:value="disabledValue"
            type="date"
            :disabled-date="disabledDate"
            placeholder="Select date (weekends disabled)"
          />
          <n-p>Selected date: {{ formatDate(disabledValue) }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Shortcuts">
        <n-space vertical :size="16">
          <n-date-picker
            v-model:value="shortcutsValue"
            type="date"
            placeholder="Select date with shortcuts"
            :shortcuts="shortcuts"
          />
          <n-p>Selected date: {{ formatDate(shortcutsValue) }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Date Picker Sizes">
        <n-space vertical :size="16">
          <n-space>
            <n-date-picker
              v-model:value="smallValue"
              size="small"
              type="date"
              placeholder="Small"
            />
            <n-date-picker
              v-model:value="mediumValue"
              size="medium"
              type="date"
              placeholder="Medium"
            />
            <n-date-picker
              v-model:value="largeValue"
              size="large"
              type="date"
              placeholder="Large"
            />
          </n-space>
        </n-space>
      </n-card>

      <n-card title="Date Picker Events">
        <n-space vertical :size="16">
          <n-date-picker
            v-model:value="eventValue"
            type="date"
            placeholder="Select date"
            @update:value="handleDateChange"
            @panel-visible-change="handlePanelVisible"
          />
          <n-p>Last event: {{ lastEvent || 'No events yet' }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Real World Example - Event Registration">
        <n-space vertical :size="16">
          <n-input
            v-model:value="eventName"
            placeholder="Event name"
            style="margin-bottom: 12px;"
          />
          <n-date-picker
            v-model:value="eventDate"
            type="datetime"
            placeholder="Event date and time"
            style="margin-bottom: 12px;"
          />
          <n-date-picker
            v-model:value="registrationDeadline"
            type="date"
            placeholder="Registration deadline"
            style="margin-bottom: 12px;"
          />
          <n-input-number
            v-model:value="maxParticipants"
            placeholder="Max participants"
            style="margin-bottom: 12px;"
          />
          <n-button
            type="primary"
            :disabled="isRegistrationDisabled"
            @click="registerEvent"
          >
            Register Event
          </n-button>
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Basic DatePicker
const basicValue = ref(null)

// Date Range
const rangeValue = ref(null)

// DateTime Picker
const datetimeValue = ref(null)

// Custom Format
const formatValue = ref(null)

// Disabled Dates
const disabledValue = ref(null)

const disabledDate = (timestamp: number) => {
  const date = new Date(timestamp)
  const day = date.getDay()
  return day === 0 || day === 6 // Disable weekends
}

// Shortcuts
const shortcutsValue = ref(null)

const shortcuts = {
  'Today': () => new Date(),
  'Yesterday': () => {
    const date = new Date()
    date.setDate(date.getDate() - 1)
    return date
  },
  'Last Week': () => {
    const date = new Date()
    date.setDate(date.getDate() - 7)
    return date
  }
}

// Date Picker Sizes
const smallValue = ref(null)
const mediumValue = ref(null)
const largeValue = ref(null)

// Date Picker Events
const eventValue = ref(null)
const lastEvent = ref('')

const handleDateChange = (value: number | null) => {
  lastEvent.value = `Date changed to: ${value ? new Date(value).toLocaleString() : 'null'}`
}

const handlePanelVisible = (visible: boolean) => {
  lastEvent.value = `Panel ${visible ? 'opened' : 'closed'}`
}

// Real World Example - Event Registration
const eventName = ref('')
const eventDate = ref(null)
const registrationDeadline = ref(null)
const maxParticipants = ref(50)

const isRegistrationDisabled = computed(() => {
  if (!eventDate.value) return true
  const eventDateTime = new Date(eventDate.value)
  const now = new Date()
  return eventDateTime <= now
})

const registerEvent = () => {
  console.log('Event registered:', {
    name: eventName.value,
    date: eventDate.value,
    deadline: registrationDeadline.value,
    maxParticipants: maxParticipants.value
  })
}

// Utility functions
const formatDate = (timestamp: number | null) => {
  return timestamp ? new Date(timestamp).toLocaleDateString() : 'No date selected'
}

const formatDateRange = (range: number[] | null) => {
  if (!range || range.length !== 2) return 'No range selected'
  const start = new Date(range[0]).toLocaleDateString()
  const end = new Date(range[1]).toLocaleDateString()
  return `${start} - ${end}`
}

const formatDateTime = (timestamp: number | null) => {
  return timestamp ? new Date(timestamp).toLocaleString() : 'No datetime selected'
}
</script>

<style scoped>
.datepicker-demo {
  padding: 0;
}

.n-card {
  margin-bottom: 16px;
}

.n-p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
}
</style>
