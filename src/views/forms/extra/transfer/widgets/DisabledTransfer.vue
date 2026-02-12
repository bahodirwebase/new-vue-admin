<script setup lang="ts">
import { ref } from 'vue'

const disabledValue = ref(['option1', 'option3'])
const disabledOptions = [
  { label: 'Active Project 1', value: 'option1' },
  { label: 'Completed Project 2', value: 'option2', disabled: true },
  { label: 'Active Project 3', value: 'option3' },
  { label: 'Archived Project 4', value: 'option4', disabled: true },
  { label: 'Active Project 5', value: 'option5' }
]
</script>

<template>
  <n-card title="Transfer with Disabled Items">
    <n-space vertical :size="16">
      <n-transfer size="small" v-model:value="disabledValue" :options="disabledOptions" />
      <n-p>Selected: {{ JSON.stringify(disabledValue) }}</n-p>
    </n-space>
  </n-card>
</template>