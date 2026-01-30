<template>
  <n-card title="Basic Rate">
    <n-space vertical :size="16">
      <n-rate v-model:value="basicValue" />
      <n-p>Rating: {{ basicValue }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const basicValue = ref(3)
</script>
