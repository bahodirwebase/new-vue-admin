<template>
  <n-card title="Basic Dynamic Tags">
    <n-space vertical :size="16">
      <n-dynamic-tags v-model:value="basicValue" placeholder="Add tag" />
      <n-p>Tags: {{ JSON.stringify(basicValue) }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const basicValue = ref(['Vue.js', 'TypeScript'])
</script>
