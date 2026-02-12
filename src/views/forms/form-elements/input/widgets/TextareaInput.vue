<script setup lang="ts">
import { ref } from 'vue'

const textareaValue = ref('')
const resizableValue = ref('')
</script>

<template>
  <n-card title="Textarea">
    <n-space vertical :size="16">
      <n-input v-model:value="textareaValue" type="textarea" placeholder="Enter your message..." :rows="4" />
      <n-input v-model:value="resizableValue" type="textarea" placeholder="Resizable textarea" :rows="3"
        resizable />
    </n-space>
  </n-card>
</template>