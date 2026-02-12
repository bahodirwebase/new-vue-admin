<script setup lang="ts">
import { ref } from 'vue'

const normalValue = ref(50)
const disabledValue = ref(50)
const readonlyValue = ref(50)
</script>

<template>
  <n-card title="Slider States">
    <n-space vertical :size="16">
      <div>
        <span style="margin-right: 12px;">Normal:</span>
        <n-slider v-model:value="normalValue" style="width: 200px; display: inline-block;" />
      </div>
      <div>
        <span style="margin-right: 12px;">Disabled:</span>
        <n-slider v-model:value="disabledValue" disabled style="width: 200px; display: inline-block;" />
      </div>
      <div>
        <span style="margin-right: 12px;">Readonly:</span>
        <n-slider v-model:value="readonlyValue" readonly style="width: 200px; display: inline-block;" />
      </div>
    </n-space>
  </n-card>
</template>