<template>
  <n-card>
    <div class="chart-header">
      <h2 class="chart-title">Multiple Selection</h2>
    </div>
    <n-space vertical :size="16">
      <n-cascader v-model:value="multipleValue" :options="CASCADER_OPTIONS" multiple
        placeholder="Select multiple options" />
      <div class="selection-display">
        Selected: {{ JSON.stringify(multipleValue) }}
      </div>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CASCADER_OPTIONS } from '../constants'

const multipleValue = ref([])
</script>

<style scoped>
.selection-display {
  padding: 8px 12px;
  background: var(--bg-secondary);
  border-radius: 6px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
  color: var(--text-secondary);
  max-height: 100px;
  overflow-y: auto;
}
</style>
