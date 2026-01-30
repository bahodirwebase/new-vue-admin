<template>
  <n-card title="Input Number States">
    <n-space vertical :size="16">
      <n-space>
        <n-input-number v-model:value="normalValue" placeholder="Normal" />
        <n-input-number v-model:value="disabledValue" disabled placeholder="Disabled" />
        <n-input-number v-model:value="readonlyValue" readonly placeholder="Readonly" />
      </n-space>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const normalValue = ref(10)
const disabledValue = ref(20)
const readonlyValue = ref(30)
</script>
