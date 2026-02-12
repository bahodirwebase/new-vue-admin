<script setup lang="ts">
import { ref } from 'vue'

const emailSubject = ref('')
const emailTo = ref('')
const emailMessage = ref('')
const emailOptions = [
  { label: 'John Doe', value: 'john@example.com' },
  { label: 'Jane Smith', value: 'jane@example.com' },
  { label: 'Bob Johnson', value: 'bob@example.com' },
  { label: 'Alice Brown', value: 'alice@example.com' }
]
</script>

<template>
  <n-card title="Real World Example - Email Compose">
    <n-space vertical :size="16">
      <n-input v-model:value="emailSubject" placeholder="Email subject" style="margin-bottom: 12px;" />
      <n-auto-complete v-model:value="emailTo" :options="emailOptions" placeholder="To:"
        style="margin-bottom: 12px;" />
      <n-input v-model:value="emailMessage" type="textarea" placeholder="Message" :rows="4" />
    </n-space>
  </n-card>
</template>