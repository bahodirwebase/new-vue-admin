<script setup lang="ts">
import { ref } from 'vue'

const disabledValue = ref('option1')
const readonlyValue = ref('option2')
const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
  { label: 'Option 5', value: 'option5' }
]
</script>

<template>
  <n-card title="Disabled Select">
    <n-space vertical :size="16">
      <n-select v-model:value="disabledValue" :options="options" placeholder="This is disabled" disabled />
      <n-select v-model:value="readonlyValue" :options="options" placeholder="This is readonly" readonly />
    </n-space>
  </n-card>
</template>