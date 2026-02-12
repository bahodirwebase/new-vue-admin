<script setup lang="ts">
import { ref } from 'vue'

const primaryValue = ref(4)
const successValue = ref(3)
const warningValue = ref(2)
const errorValue = ref(1)
</script>

<template>
  <n-card title="Rate with Colors">
    <n-space vertical :size="16">
      <n-space vertical :size="8">
        <span>Primary:</span>
        <n-rate v-model:value="primaryValue" color="#6366f1" />
      </n-space>
      <n-space vertical :size="8">
        <span>Success:</span>
        <n-rate v-model:value="successValue" color="#18a058" />
      </n-space>
      <n-space vertical :size="8">
        <span>Warning:</span>
        <n-rate v-model:value="warningValue" color="#f0a020" />
      </n-space>
      <n-space vertical :size="8">
        <span>Error:</span>
        <n-rate v-model:value="errorValue" color="#d03050" />
      </n-space>
    </n-space>
  </n-card>
</template>