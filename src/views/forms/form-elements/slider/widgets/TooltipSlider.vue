<template>
  <n-card title="Slider with Tooltip">
    <n-space vertical :size="16">
      <n-slider v-model:value="tooltipValue" :tooltip="false" />
      <n-p>No tooltip: {{ tooltipValue }}</n-p>
      <n-slider v-model:value="customTooltipValue" :format-tooltip="formatTooltip" />
      <n-p>Custom tooltip: {{ customTooltipValue }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tooltipValue = ref(50)
const customTooltipValue = ref(50)

const formatTooltip = (value: number) => {
  return `${value}% Complete`
}
</script>
