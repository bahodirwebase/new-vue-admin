<script setup lang="ts">
import { ref } from 'vue'
import { CASCADER_OPTIONS } from '../constants'

const hoverValue = ref(null)
</script>

<template>
  <n-card>
    <div class="chart-header">
      <h2 class="chart-title">Expand Trigger</h2>
    </div>
    <n-space vertical :size="16">
      <n-cascader v-model:value="hoverValue" :options="CASCADER_OPTIONS" expand-trigger="hover"
        placeholder="Hover to expand" />
      <div class="selection-display">
        Selected: {{ JSON.stringify(hoverValue) }}
      </div>
    </n-space>
  </n-card>
</template>

<style scoped>
.selection-display {
  padding: 8px 12px;
  background: var(--bg-secondary);
  border-radius: 6px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
  color: var(--text-secondary);
}
</style>
