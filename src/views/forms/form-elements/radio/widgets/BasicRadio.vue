<script setup lang="ts">
import { ref } from 'vue'

const basicRadio = ref('')
</script>

<template>
  <n-card title="Basic Radio">
    <n-space vertical :size="16">
      <n-radio-group v-model:value="basicRadio">
        <n-radio value="option1">Option 1</n-radio>
        <n-radio value="option2">Option 2</n-radio>
        <n-radio value="option3">Option 3</n-radio>
      </n-radio-group>
      <n-p>Selected value: {{ basicRadio || 'None' }}</n-p>
    </n-space>
  </n-card>
</template>