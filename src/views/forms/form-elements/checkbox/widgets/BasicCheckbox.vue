<template>
  <n-card title="Basic Checkbox">
    <n-space vertical :size="16">
      <n-checkbox v-model:value="basicValue">
        Basic checkbox
      </n-checkbox>
      <n-p>Checkbox state: {{ basicValue ? 'Checked' : 'Unchecked' }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const basicValue = ref(false)
</script>
