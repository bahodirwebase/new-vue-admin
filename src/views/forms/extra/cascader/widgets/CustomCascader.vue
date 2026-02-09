<template>
  <n-card>
    <div class="chart-header">
      <h2 class="chart-title">Custom Render</h2>
    </div>
    <n-space vertical :size="16">
      <n-cascader v-model:value="customValue" :options="CUSTOM_OPTIONS" :render-option="renderCustomOption"
        placeholder="Custom rendered options" />
      <div class="selection-display">
        Selected: {{ JSON.stringify(customValue) }}
      </div>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { CUSTOM_OPTIONS } from '../constants'
import CustomTag from '@/components/CustomTag.vue'

const customValue = ref(null)

const renderCustomOption = ({ option }: any) => {
  return h('div', { style: 'display: flex; align-items: center; gap: 8px;' }, [
    option.type && h(CustomTag, {
      type: option.type === 'framework' ? 'info' : 'success',
      size: 'small'
    }, { default: () => option.type }),
    h('span', option.label)
  ])
}
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
