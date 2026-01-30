<template>
  <n-card title="Real World Example - File Explorer">
    <n-space vertical :size="16">
      <div class="file-explorer">
        <n-space vertical :size="12">
          <span>Select files or folders:</span>
          <n-tree-select v-model:value="selectedFiles" :options="fileOptions" :render-option="renderFileOption"
            checkable filterable placeholder="Choose files..." />
        </n-space>
        <n-input v-model:value="destination" placeholder="Destination path" style="margin-top: 12px;" />
        <n-space :size="8" style="margin-top: 12px;">
          <n-button type="primary" @click="copyFiles">
            Copy Files
          </n-button>
          <n-button @click="moveFiles">
            Move Files
          </n-button>
          <n-button @click="deleteFiles">
            Delete Files
          </n-button>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { NTag } from 'naive-ui'
import { useMessage } from 'naive-ui'

const message = useMessage()
const selectedFiles = ref([])
const destination = ref('')

const fileOptions = [
  {
    label: '📁 Project Files',
    value: 'projects',
    type: 'folder',
    children: [
      {
        label: '📁 Frontend',
        value: 'frontend',
        type: 'folder',
        children: [
          { label: '📄 App.vue', value: 'app-vue', type: 'file', size: '2.5 KB' },
          { label: '📄 components/', value: 'components', type: 'folder', size: '1.2 MB' },
          { label: '📄 package.json', value: 'package', type: 'file', size: '1.8 KB' }
        ]
      },
      {
        label: '📁 Backend',
        value: 'backend',
        type: 'folder',
        children: [
          { label: '📄 server.js', value: 'server', type: 'file', size: '3.2 KB' },
          { label: '📄 database.js', value: 'database', type: 'file', size: '2.1 KB' }
        ]
      }
    ]
  },
  {
    label: '📁 Documents',
    value: 'documents',
    type: 'folder',
    children: [
      { label: '📄 README.md', value: 'readme', type: 'file', size: '4.5 KB' },
      { label: '📄 LICENSE', value: 'license', type: 'file', size: '1.1 KB' }
    ]
  }
]

const renderFileOption = ({ option }: any) => {
  return h('div', { style: 'display: flex; align-items: center; gap: 8px;' }, [
    h('span', { style: 'font-size: 16px;' }, option.label.split(' ')[0]),
    h('span', option.label.split(' ')[1]),
    option.size && h(NTag, {
      type: 'info',
      size: 'small'
    }, { default: () => option.size })
  ])
}

const copyFiles = () => {
  if (selectedFiles.value.length === 0) {
    message.error('Please select files to copy')
    return
  }
  message.success(`Copying ${selectedFiles.value.length} files to ${destination.value || 'default location'}`)
}

const moveFiles = () => {
  if (selectedFiles.value.length === 0) {
    message.error('Please select files to move')
    return
  }
  message.success(`Moving ${selectedFiles.value.length} files to ${destination.value || 'default location'}`)
}

const deleteFiles = () => {
  if (selectedFiles.value.length === 0) {
    message.error('Please select files to delete')
    return
  }
  message.warning(`Deleting ${selectedFiles.value.length} files`)
}
</script>

<style scoped>
.file-explorer {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  background: var(--bg-secondary);
}
</style>
