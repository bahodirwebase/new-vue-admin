<template>
  <n-card title="Multiple Select">
    <n-space vertical :size="16">
      <n-select v-model:value="multipleValues" :options="options" multiple placeholder="Select multiple options"
        clearable />
      <n-p>Selected values: {{ multipleValues.length > 0 ? multipleValues.join(', ') : 'None' }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const multipleValues = ref([])
const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
  { label: 'Option 5', value: 'option5' }
]
</script>
