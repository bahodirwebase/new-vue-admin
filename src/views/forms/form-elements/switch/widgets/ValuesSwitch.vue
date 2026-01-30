<template>
  <n-card title="Switch with Custom Values">
    <n-space vertical :size="16">
      <n-switch v-model:value="valueSwitch" :checked-value="'yes'" :unchecked-value="'no'">
        <template #checked>Yes</template>
        <template #unchecked>No</template>
      </n-switch>
      <n-p>Switch value: {{ valueSwitch }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const valueSwitch = ref('no')
</script>
