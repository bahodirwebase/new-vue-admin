<script setup lang="ts">
import { ref } from 'vue'

const marksValue = ref(30)
const customMarksValue = ref(40)

const marks = {
  0: '0°C',
  20: '20°C',
  40: '40°C',
  60: '60°C',
  80: '80°C',
  100: '100°C'
}

const customMarks = {
  0: 'Min',
  25: 'Low',
  50: 'Medium',
  75: 'High',
  100: 'Max'
}
</script>

<template>
  <n-card title="Slider Marks">
    <n-space vertical :size="16">
      <n-slider v-model:value="marksValue" :marks="marks" />
      <n-p>Marks value: {{ marksValue }}</n-p>
      <n-slider v-model:value="customMarksValue" :marks="customMarks" />
      <n-p>Custom marks value: {{ customMarksValue }}</n-p>
    </n-space>
  </n-card>
</template>