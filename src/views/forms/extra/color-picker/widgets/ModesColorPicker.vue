<script setup lang="ts">
import { ref } from 'vue'

const hexValue = ref('#18a058')
const rgbValue = ref('rgb(24, 160, 88)')
const hslValue = ref('hsl(142, 74%, 36%)')
</script>

<template>
  <n-card title="Color Picker Modes">
    <n-space vertical :size="16">
      <n-space vertical>
        <n-color-picker v-model:value="hexValue" mode="hex" />
        <n-color-picker v-model:value="rgbValue" mode="rgb" />
        <n-color-picker v-model:value="hslValue" mode="hsl" />
      </n-space>
      <n-p>HEX: {{ hexValue }}</n-p>
      <n-p>RGB: {{ rgbValue }}</n-p>
      <n-p>HSL: {{ hslValue }}</n-p>
    </n-space>
  </n-card>
</template>