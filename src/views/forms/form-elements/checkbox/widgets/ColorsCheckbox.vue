<script setup lang="ts">
import { ref } from 'vue'

const primaryValue = ref(false)
const successValue = ref(false)
const warningValue = ref(false)
const errorValue = ref(false)
</script>

<template>
  <n-card title="Custom Colors">
    <n-space vertical :size="16">
      <n-space vertical :size="8">
        <n-checkbox v-model:value="primaryValue" color="#6366f1">
          Primary color
        </n-checkbox>
        <n-checkbox v-model:value="successValue" color="#18a058">
          Success color
        </n-checkbox>
        <n-checkbox v-model:value="warningValue" color="#f0a020">
          Warning color
        </n-checkbox>
        <n-checkbox v-model:value="errorValue" color="#d03050">
          Error color
        </n-checkbox>
      </n-space>
    </n-space>
  </n-card>
</template>