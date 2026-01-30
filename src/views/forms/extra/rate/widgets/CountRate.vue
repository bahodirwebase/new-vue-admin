<template>
  <n-card title="Rate with Count">
    <n-space vertical :size="16">
      <n-rate v-model:value="countValue" :count="10" />
      <n-p>Rating: {{ countValue }} / 10</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const countValue = ref(7)
</script>
