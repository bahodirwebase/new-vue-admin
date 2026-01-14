<template>
  <div class="tree-select-demo">
    <n-space vertical :size="24">
      <n-card title="Basic Tree Select">
        <n-space vertical :size="16">
          <n-tree-select
            v-model:value="basicValue"
            :options="basicOptions"
            placeholder="Select option"
          />
          <n-p>Selected: {{ JSON.stringify(basicValue) }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Multiple Selection">
        <n-space vertical :size="16">
          <n-tree-select
            v-model:value="multipleValue"
            :options="basicOptions"
            multiple
            placeholder="Select multiple options"
          />
          <n-p>Selected: {{ JSON.stringify(multipleValue) }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Checkable Tree Select">
        <n-space vertical :size="16">
          <n-tree-select
            v-model:value="checkableValue"
            :options="basicOptions"
            checkable
            placeholder="Checkable selection"
          />
          <n-p>Selected: {{ JSON.stringify(checkableValue) }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Tree Select with Search">
        <n-space vertical :size="16">
          <n-tree-select
            v-model:value="searchValue"
            :options="basicOptions"
            filterable
            placeholder="Search and select"
          />
          <n-p>Selected: {{ JSON.stringify(searchValue) }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Tree Select with Custom Render">
        <n-space vertical :size="16">
          <n-tree-select
            v-model:value="customValue"
            :options="customOptions"
            :render-option="renderCustomOption"
            placeholder="Custom rendered options"
          />
          <n-p>Selected: {{ JSON.stringify(customValue) }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Tree Select with Expand All">
        <n-space vertical :size="16">
          <n-tree-select
            v-model:value="expandValue"
            :options="basicOptions"
            :default-expand-all="true"
            placeholder="All expanded by default"
          />
          <n-p>Selected: {{ JSON.stringify(expandValue) }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Tree Select Sizes">
        <n-space vertical :size="16">
          <n-space>
            <n-tree-select v-model:value="smallValue" size="small" placeholder="Small" />
            <n-tree-select v-model:value="mediumValue" size="medium" placeholder="Medium" />
            <n-tree-select v-model:value="largeValue" size="large" placeholder="Large" />
          </n-space>
        </n-space>
      </n-card>

      <n-card title="Real World Example - File Explorer">
        <n-space vertical :size="16">
          <div class="file-explorer">
            <n-space vertical :size="12">
              <span>Select files or folders:</span>
              <n-tree-select
                v-model:value="selectedFiles"
                :options="fileOptions"
                :render-option="renderFileOption"
                checkable
                filterable
                placeholder="Choose files..."
              />
            </n-space>
            <n-input
              v-model:value="destination"
              placeholder="Destination path"
              style="margin-top: 12px;"
            />
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
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { NTag } from 'naive-ui'
import { useMessage } from 'naive-ui'

const message = useMessage()

// Basic Tree Select
const basicValue = ref('option1')

const basicOptions = [
  {
    label: 'Documents',
    value: 'documents',
    children: [
      {
        label: 'Work',
        value: 'work',
        children: [
          { label: 'Report.pdf', value: 'report' },
          { label: 'Presentation.pptx', value: 'presentation' }
        ]
      },
      {
        label: 'Personal',
        value: 'personal',
        children: [
          { label: 'Resume.docx', value: 'resume' },
          { label: 'Cover Letter.docx', value: 'cover' }
        ]
      }
    ]
  },
  {
    label: 'Media',
    value: 'media',
    children: [
      {
        label: 'Images',
        value: 'images',
        children: [
          { label: 'Photo1.jpg', value: 'photo1' },
          { label: 'Photo2.jpg', value: 'photo2' }
        ]
      },
      {
        label: 'Videos',
        value: 'videos',
        children: [
          { label: 'Tutorial.mp4', value: 'tutorial' },
          { label: 'Movie.avi', value: 'movie' }
        ]
      }
    ]
  }
]

// Multiple Selection
const multipleValue = ref(['work', 'images'])

// Checkable Tree Select
const checkableValue = ref(['report', 'photo1'])

// Tree Select with Search
const searchValue = ref('presentation')

// Tree Select with Custom Render
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

// Tree Select with Expand All
const expandValue = ref('documents')

// Tree Select Sizes
const smallValue = ref('')
const mediumValue = ref('')
const largeValue = ref('')

// Real World Example - File Explorer
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
.tree-select-demo {
  padding: 0;
}

.n-card {
  margin-bottom: 16px;
}

.n-p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
}

.file-explorer {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  background: var(--bg-secondary);
}
</style>
