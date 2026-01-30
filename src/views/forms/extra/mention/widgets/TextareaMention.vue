<template>
  <n-card title="Mention in Textarea">
    <n-space vertical :size="16">
      <n-mention v-model:value="textareaValue" type="textarea" :options="basicOptions"
        placeholder="Type @ to mention in textarea..." :rows="4" />
      <n-p>Text: {{ textareaValue }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const textareaValue = ref('')
const basicOptions = [
  { label: 'John Doe', value: 'john' },
  { label: 'Jane Smith', value: 'jane' },
  { label: 'Bob Johnson', value: 'bob' },
  { label: 'Alice Brown', value: 'alice' }
]
</script>
