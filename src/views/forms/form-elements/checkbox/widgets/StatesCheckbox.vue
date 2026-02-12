<script setup lang="ts">
import { ref } from 'vue'

const normalValue = ref(false)
const disabledValue = ref(true)
const indeterminateValue = ref(false)
</script>

<template>
  <n-card title="Checkbox States">
    <n-space vertical :size="16">
      <n-space align="center" :size="12">
        <span>Normal:</span>
        <n-checkbox v-model:value="normalValue">Normal</n-checkbox>
      </n-space>
      <n-space align="center" :size="12">
        <span>Disabled:</span>
        <n-checkbox v-model:value="disabledValue" disabled>Disabled</n-checkbox>
      </n-space>
      <n-space align="center" :size="12">
        <span>Indeterminate:</span>
        <n-checkbox v-model:value="indeterminateValue" :indeterminate="true">
          Indeterminate
        </n-checkbox>
      </n-space>
    </n-space>
  </n-card>
</template>