<template>
  <n-card title="Custom Render">
    <n-space vertical :size="16">
      <n-auto-complete v-model:value="customValue" :options="customOptions" :render-option="renderCustomOption"
        placeholder="Custom rendered options" />
      <n-p>Selected value: {{ customValue || 'None' }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import CustomTag from '@/components/CustomTag.vue'

const customValue = ref('')
const customOptions = [
  { label: 'Vue.js', value: 'vue', type: 'framework', color: '#42b883' },
  { label: 'React', value: 'react', type: 'framework', color: '#61dafb' },
  { label: 'Node.js', value: 'node', type: 'backend', color: '#339933' }
]

const renderCustomOption = ({ option }: any) => {
  return h('div', { style: 'display: flex; align-items: center; gap: 8px;' }, [
    h(CustomTag, {
      type: option.type === 'framework' ? 'info' : 'success',
      size: 'small'
    }, { default: () => option.type }),
    h('span', option.label)
  ])
}
</script>
