<template>
  <n-card title="Dynamic Input with Key-Value">
    <n-space vertical :size="16">
      <n-dynamic-input v-model:value="keyValue" :preset="keyValuePreset" />
      <n-p>Key-Value pairs: {{ JSON.stringify(keyValue) }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { NInput } from 'naive-ui'

const keyValue = ref([
  { key: 'name', value: 'John Doe' },
  { key: 'email', value: 'john@example.com' }
])

const keyValuePreset = () => {
  return h('div', { style: 'display: flex; gap: 8px;' }, [
    h(NInput, {
      placeholder: 'Key',
      style: { width: '120px' }
    }),
    h(NInput, {
      placeholder: 'Value',
      style: { flex: 1 }
    })
  ])
}
</script>
