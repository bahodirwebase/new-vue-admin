<template>
  <n-card title="Tree Select with Custom Render">
    <n-space vertical :size="16">
      <n-tree-select v-model:value="customValue" :options="customOptions" :render-option="renderCustomOption"
        placeholder="Custom rendered options" />
      <n-p>Selected: {{ JSON.stringify(customValue) }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { NTag } from 'naive-ui'

const customValue = ref('vue')
const customOptions = [
  {
    label: 'Frontend',
    value: 'frontend',
    type: 'category',
    children: [
      { label: 'Vue.js', value: 'vue', type: 'framework' },
      { label: 'React', value: 'react', type: 'framework' },
      { label: 'Angular', value: 'angular', type: 'framework' }
    ]
  },
  {
    label: 'Backend',
    value: 'backend',
    type: 'category',
    children: [
      { label: 'Node.js', value: 'node', type: 'runtime' },
      { label: 'Python', value: 'python', type: 'language' },
      { label: 'Java', value: 'java', type: 'language' }
    ]
  }
]

const renderCustomOption = ({ option }: any) => {
  return h('div', { style: 'display: flex; align-items: center; gap: 8px;' }, [
    option.type && h(NTag, {
      type: option.type === 'framework' ? 'info' : option.type === 'category' ? 'warning' : 'success',
      size: 'small'
    }, { default: () => option.type }),
    h('span', option.label)
  ])
}
</script>
