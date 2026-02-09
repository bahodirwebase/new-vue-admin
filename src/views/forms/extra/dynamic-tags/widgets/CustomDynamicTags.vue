<template>
  <n-card title="Dynamic Tags with Custom Render">
    <n-space vertical :size="16">
      <n-dynamic-tags v-model:value="customValue" placeholder="Add skill" :render-tag="renderCustomTag" />
      <n-p>Skills: {{ JSON.stringify(customValue) }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { useMessage } from 'naive-ui'
import CustomTag from '@/components/CustomTag.vue'

const message = useMessage()
const customValue = ref(['JavaScript', 'Python', 'Docker'])

const renderCustomTag = (value: any) => {
  return h(CustomTag, {
    type: 'info',
    closable: true,
    onClose: () => {
      message.success(`Tag "${value}" removed`)
    }
  }, { default: () => `💻 ${value}` })
}
</script>
