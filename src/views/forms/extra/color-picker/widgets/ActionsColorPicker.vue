<script setup lang="ts">
import { ref } from 'vue'

const actionValue = ref('#6366f1')
const lastConfirmed = ref('')

const handleConfirm = (value: string) => {
  lastConfirmed.value = value
}
</script>

<template>
  <n-card title="Color Picker with Actions">
    <n-space vertical :size="16">
      <n-color-picker v-model:value="actionValue" :actions="['confirm']" @confirm="handleConfirm" />
      <n-p>Last confirmed: {{ lastConfirmed || 'None' }}</n-p>
    </n-space>
  </n-card>
</template>