<script setup lang="ts">
import { ref } from 'vue'

const basicValue = ref(false)
</script>

<template>
  <n-card title="Basic Checkbox">
    <n-space vertical :size="16">
      <n-checkbox v-model:checked="basicValue">
        Basic checkbox
      </n-checkbox>
      <n-p>Checkbox state: {{ basicValue ? 'Checked' : 'Unchecked' }}</n-p>
    </n-space>
  </n-card>
</template>