<template>
  <n-card title="Radio States">
    <n-space vertical :size="16">
      <n-radio-group v-model:value="statesRadio">
        <n-radio value="normal" :disabled="false">Normal</n-radio>
        <n-radio value="disabled" disabled>Disabled</n-radio>
        <n-radio value="checked" :default-checked="true" disabled>Checked & Disabled</n-radio>
      </n-radio-group>
      <n-p>Selected value: {{ statesRadio || 'None' }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const statesRadio = ref('')
</script>
