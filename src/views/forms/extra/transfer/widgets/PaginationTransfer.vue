<template>
  <n-card title="Transfer with Pagination">
    <n-space vertical :size="16">
      <n-transfer v-model:value="paginationValue" :options="largeOptions" :pagination="{ pageSize: 10 }"
        source-filterable />
      <n-p>Selected: {{ JSON.stringify(paginationValue) }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const paginationValue = ref(['item1', 'item3'])
const largeOptions = Array.from({ length: 50 }, (_, i) => ({
  label: `Item ${i + 1}`,
  value: `item${i + 1}`
}))
</script>
