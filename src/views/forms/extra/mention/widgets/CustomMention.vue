<script setup lang="ts">
import { ref, h } from 'vue'

const customValue = ref('')
const customOptions = [
  { label: 'Admin', value: 'admin', role: 'Administrator', avatar: '👨‍💼' },
  { label: 'Developer', value: 'dev', role: 'Developer', avatar: '👨‍💻' },
  { label: 'Designer', value: 'designer', role: 'Designer', avatar: '👩‍🎨' }
]

const renderCustomOption = ({ option }: any) => {
  return h('div', { style: 'display: flex; align-items: center; gap: 8px;' }, [
    h('span', { style: 'font-size: 20px;' }, option.avatar),
    h('div', [
      h('div', { style: 'font-weight: 600;' }, option.label),
      h('div', { style: 'font-size: 12px; color: var(--text-secondary);' }, option.role)
    ])
  ])
}
</script>

<template>
  <n-card title="Mention with Custom Render">
    <n-space vertical :size="16">
      <n-mention v-model:value="customValue" :options="customOptions" :render-option="renderCustomOption"
        placeholder="Type @ to mention..." />
      <n-p>Text: {{ customValue }}</n-p>
    </n-space>
  </n-card>
</template>