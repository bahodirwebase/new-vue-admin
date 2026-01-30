<template>
  <n-card title="Dynamic Tags with Presets">
    <n-space vertical :size="16">
      <n-dynamic-tags v-model:value="presetValue" placeholder="Add option" :options="presetOptions" />
      <n-p>Options: {{ JSON.stringify(presetValue) }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const presetValue = ref(['Feature'])
const presetOptions = [
  { label: 'Feature', value: 'feature' },
  { label: 'Bug', value: 'bug' },
  { label: 'Enhancement', value: 'enhancement' },
  { label: 'Documentation', value: 'documentation' },
  { label: 'Testing', value: 'testing' }
]
</script>
