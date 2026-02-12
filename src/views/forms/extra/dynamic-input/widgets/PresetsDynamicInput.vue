<script setup lang="ts">
import { ref, h } from 'vue'
import { NInput } from 'naive-ui'

const presetValue = ref(['user@example.com'])

const emailPreset = () => {
  return h(NInput, {
    placeholder: 'Enter email address'
  })
}
</script>

<template>
  <n-card title="Dynamic Input with Presets">
    <n-space vertical :size="16">
      <n-dynamic-input v-model:value="presetValue" placeholder="Enter email" :preset="emailPreset" />
      <n-p>Emails: {{ JSON.stringify(presetValue) }}</n-p>
    </n-space>
  </n-card>
</template>
