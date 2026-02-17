<script setup lang="ts">
import { ref, h } from 'vue'
import CustomTag from '@/components/custom/CustomTag.vue'

const customValue = ref(['vue', 'react'])
const customOptions = [
  { label: 'Vue.js', value: 'vue', type: 'framework', color: '#42b883' },
  { label: 'React', value: 'react', type: 'framework', color: '#61dafb' },
  { label: 'Angular', value: 'angular', type: 'framework', color: '#dd0031' },
  { label: 'Node.js', value: 'node', type: 'backend', color: '#339933' },
  { label: 'Python', value: 'python', type: 'backend', color: '#3776ab' }
]

const renderSourceLabel = ({ option }: any) => {
  return h('div', { style: 'display: flex; align-items: center; gap: 8px;' }, [
    h(CustomTag, {
      type: option.type === 'framework' ? 'info' : 'success',
      size: 'small'
    }, { default: () => option.type }),
    h('span', option.label)
  ])
}

const renderTargetLabel = ({ option }: any) => {
  return h('div', { style: 'display: flex; align-items: center; gap: 8px;' }, [
    h('span', {
      style: `display: inline-block; width: 12px; height: 12px; border-radius: 50%; background: ${option.color};`
    }),
    h('span', option.label)
  ])
}
</script>

<template>
  <n-card title="Transfer with Custom Render">
    <n-space vertical :size="16">
      <n-transfer size="small" v-model:value="customValue" :options="customOptions" :render-source-label="renderSourceLabel"
        :render-target-label="renderTargetLabel" />
      <n-p>Selected: {{ JSON.stringify(customValue) }}</n-p>
    </n-space>
  </n-card>
</template>