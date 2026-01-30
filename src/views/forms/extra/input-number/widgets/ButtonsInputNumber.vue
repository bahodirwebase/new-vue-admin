<template>
  <n-card title="Input Number with Buttons">
    <n-space vertical :size="16">
      <n-input-number v-model:value="buttonValue" :button-placement="'both'" placeholder="With buttons" />
      <n-p>Value: {{ buttonValue }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const buttonValue = ref(5)
</script>
