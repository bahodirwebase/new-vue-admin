<script setup lang="ts">
import { ref } from 'vue'
import { CASCADER_OPTIONS } from '../constants'

const basicValue = ref(null)
</script>

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

<template>
  <n-card>
    <div class="chart-header">
      <h2 class="chart-title">Basic Cascader</h2>
    </div>
    <n-space vertical :size="16">
      <n-cascader v-model:value="basicValue" :options="CASCADER_OPTIONS" placeholder="Select option" />
      <div class="selection-display">
        Selected: {{ JSON.stringify(basicValue) }}
      </div>
    </n-space>
  </n-card>
</template>
