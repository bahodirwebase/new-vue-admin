<template>
  <n-card title="Rate with Allow Half">
    <n-space vertical :size="16">
      <n-rate v-model:value="halfValue" :allow-half="true" />
      <n-p>Rating: {{ halfValue }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const halfValue = ref(3.5)
</script>
