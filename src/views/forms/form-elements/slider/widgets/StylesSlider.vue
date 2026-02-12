<script setup lang="ts">
import { ref } from 'vue'

const styleValue = ref(50)
const styleValue2 = ref(50)

const railStyle = ({
  focused,
  disabled
}: {
  focused: boolean
  disabled: boolean
}) => {
  return {
    background: disabled ? '#ccc' : focused ? '#18a058' : '#2080f0'
  }
}
</script>

<template>
  <n-card title="Slider Styles">
    <n-space vertical :size="16">
      <n-slider v-model:value="styleValue" color="#ff6b6b" />
      <n-p>Custom color: {{ styleValue }}</n-p>
      <n-slider v-model:value="styleValue2" :rail-style="railStyle" />
      <n-p>Custom rail style: {{ styleValue2 }}</n-p>
    </n-space>
  </n-card>
</template>