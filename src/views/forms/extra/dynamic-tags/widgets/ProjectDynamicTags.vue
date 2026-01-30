<template>
  <n-card title="Real World Example - Project Tags">
    <n-space vertical :size="16">
      <div class="project-tags">
        <n-input v-model:value="projectName" placeholder="Project name" style="margin-bottom: 12px;" />
        <n-dynamic-tags v-model:value="projectTags" placeholder="Add project tag" :render-tag="renderProjectTag"
          :max="8" />
        <n-input v-model:value="projectDescription" type="textarea" placeholder="Project description" :rows="3"
          style="margin-top: 12px;" />
      </div>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { NTag } from 'naive-ui'
import { useMessage } from 'naive-ui'

const message = useMessage()
const projectName = ref('')
const projectTags = ref(['frontend', 'vue'])
const projectDescription = ref('')

const renderProjectTag = (value: any) => {
  const colors: Array<'primary' | 'success' | 'warning' | 'error' | 'info'> = ['primary', 'success', 'warning', 'error', 'info']
  const color = colors[Math.floor(Math.random() * colors.length)]

  return h(NTag, {
    type: color,
    closable: true,
    onClose: () => {
      message.success(`Tag "${value}" removed`)
    }
  }, { default: () => `🏷️ ${value}` })
}
</script>

<style scoped>
.project-tags {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  background: var(--bg-secondary);
}
</style>
