<template>
  <n-card title="Dynamic Tags with Max">
    <n-space vertical :size="16">
      <n-dynamic-tags v-model:value="maxValue" placeholder="Add tag" :max="5" />
      <n-p>Tags (max 5): {{ JSON.stringify(maxValue) }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const maxValue = ref(['Tag 1', 'Tag 2', 'Tag 3'])
</script>
