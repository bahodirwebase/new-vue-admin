<template>
  <n-card title="Real World Example - Event Registration">
    <n-space vertical :size="16">
      <n-input v-model:value="eventName" placeholder="Event name" style="margin-bottom: 12px;" />
      <n-date-picker v-model:value="eventDate" type="datetime" placeholder="Event date and time"
        style="margin-bottom: 12px;" />
      <n-date-picker v-model:value="registrationDeadline" type="date" placeholder="Registration deadline"
        style="margin-bottom: 12px;" />
      <n-input-number v-model:value="maxParticipants" placeholder="Max participants" style="margin-bottom: 12px;" />
      <n-button type="primary" :disabled="isRegistrationDisabled" @click="registerEvent">
        Register Event
      </n-button>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

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
</script>
