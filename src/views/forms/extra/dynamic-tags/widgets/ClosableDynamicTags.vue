<template>
  <n-card title="Dynamic Tags with Closable">
    <n-space vertical :size="16">
      <n-dynamic-tags v-model:value="closableValue" placeholder="Add tag" :closable="true" />
      <n-p>Tags: {{ JSON.stringify(closableValue) }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const closableValue = ref(['Frontend', 'Backend', 'DevOps'])
</script>
