<script setup lang="ts">
import { ref } from 'vue'

const verticalRadio = ref('')
</script>

<template>
  <n-card title="Vertical Radio Group">
    <n-space vertical :size="16">
      <n-radio-group v-model:value="verticalRadio" vertical>
        <n-radio value="small">Small Size</n-radio>
        <n-radio value="medium">Medium Size</n-radio>
        <n-radio value="large">Large Size</n-radio>
      </n-radio-group>
      <n-p>Selected value: {{ verticalRadio || 'None' }}</n-p>
    </n-space>
  </n-card>
</template>


