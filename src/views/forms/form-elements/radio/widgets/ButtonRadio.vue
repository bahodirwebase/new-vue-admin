<script setup lang="ts">
import { ref } from 'vue'

const buttonRadio = ref('')
</script>

<template>
  <n-card title="Radio Button Group">
    <n-space vertical :size="16">
      <n-radio-group v-model:value="buttonRadio">
        <n-radio-button value="left">Left</n-radio-button>
        <n-radio-button value="center">Center</n-radio-button>
        <n-radio-button value="right">Right</n-radio-button>
      </n-radio-group>
      <n-p>Selected value: {{ buttonRadio || 'None' }}</n-p>
    </n-space>
  </n-card>
</template>