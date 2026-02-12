<script setup lang="ts">
import { ref } from 'vue'

const tooltipValue = ref(3)
const tooltips = ['Terrible', 'Bad', 'Normal', 'Good', 'Excellent']
</script>

<template>
  <n-card title="Rate with Tooltips">
    <n-space vertical :size="16">
      <n-rate v-model:value="tooltipValue" :tooltips="tooltips" />
      <n-p>Rating: {{ tooltipValue }}</n-p>
    </n-space>
  </n-card>
</template>