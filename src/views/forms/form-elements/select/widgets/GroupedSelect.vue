<script setup lang="ts">
import { ref } from 'vue'

const groupedValue = ref(null)
const groupedOptions = [
  {
    type: 'group',
    label: 'Fruits',
    key: 'fruits',
    children: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Orange', value: 'orange' }
    ]
  },
  {
    type: 'group',
    label: 'Vegetables',
    key: 'vegetables',
    children: [
      { label: 'Carrot', value: 'carrot' },
      { label: 'Broccoli', value: 'broccoli' },
      { label: 'Spinach', value: 'spinach' }
    ]
  }
]
</script>

<template>
  <n-card title="Grouped Select">
    <n-space vertical :size="16">
      <n-select v-model:value="groupedValue" :options="groupedOptions" placeholder="Select from groups" />
      <n-p>Selected value: {{ groupedValue || 'None' }}</n-p>
    </n-space>
  </n-card>
</template>