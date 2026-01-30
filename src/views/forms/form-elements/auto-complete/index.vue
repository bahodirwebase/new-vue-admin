<template>
  <div class="autocomplete-demo">
    <n-space vertical :size="24">
      <n-grid x-gap="12" :cols="2">
        <n-gi>
          <n-card title="Basic AutoComplete">
            <n-space vertical :size="16">
              <n-auto-complete v-model:value="basicValue" :options="basicOptions" placeholder="Type to search..." />
              <n-p>Selected value: {{ basicValue || 'None' }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Custom Filter">
            <n-space vertical :size="16">
              <n-auto-complete v-model:value="filterValue" :options="filterOptions" :filter-option="customFilter"
                placeholder="Custom filter..." />
              <n-p>Selected value: {{ filterValue || 'None' }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Multiple Selection">
            <n-space vertical :size="16">
              <n-auto-complete v-model:value="multipleValue" :options="multipleOptions" multiple
                placeholder="Select multiple options..." />
              <n-p>Selected values: {{ JSON.stringify(multipleValue) }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Grouped Options">
            <n-space vertical :size="16">
              <n-auto-complete v-model:value="groupedValue" :options="groupedOptions"
                placeholder="Search in groups..." />
              <n-p>Selected value: {{ groupedValue || 'None' }}</n-p>
            </n-space>
          </n-card>
        </n-gi>
        <n-gi>
          <n-card title="Async Options">
            <n-space vertical :size="16">
              <n-auto-complete v-model:value="asyncValue" :options="asyncOptions" :loading="asyncLoading"
                placeholder="Search async..." clearable @update:value="performAsyncSearch" />
              <n-p>Selected value: {{ asyncValue || 'None' }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Custom Render">
            <n-space vertical :size="16">
              <n-auto-complete v-model:value="customValue" :options="customOptions" :render-option="renderCustomOption"
                placeholder="Custom rendered options" />
              <n-p>Selected value: {{ customValue || 'None' }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Real World Example - Email Compose">
            <n-space vertical :size="16">
              <n-input v-model:value="emailSubject" placeholder="Email subject" style="margin-bottom: 12px;" />
              <n-auto-complete v-model:value="emailTo" :options="emailOptions" placeholder="To:"
                style="margin-bottom: 12px;" />
              <n-input v-model:value="emailMessage" type="textarea" placeholder="Message" :rows="4" />
            </n-space>
          </n-card>
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { NTag } from 'naive-ui'

// Basic AutoComplete
const basicValue = ref('')
const basicOptions = [
  { label: 'Vue.js', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' }
]

// Custom Filter
const filterValue = ref('')
const filterOptions = [
  { label: 'Frontend Developer', value: 'frontend' },
  { label: 'Backend Developer', value: 'backend' },
  { label: 'Full Stack Developer', value: 'fullstack' },
  { label: 'UI/UX Designer', value: 'designer' }
]

const customFilter = (inputValue: string, option: any) => {
  return option.label.toLowerCase().includes(inputValue.toLowerCase())
}

// Multiple Selection
const multipleValue = ref([])
const multipleOptions = [
  { label: 'JavaScript', value: 'js' },
  { label: 'TypeScript', value: 'ts' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' }
]

// Grouped Options
const groupedValue = ref('')
const groupedOptions = [
  {
    label: 'Frontend',
    type: 'group',
    children: [
      { label: 'Vue.js', value: 'vue' },
      { label: 'React', value: 'react' },
      { label: 'Angular', value: 'angular' }
    ]
  },
  {
    label: 'Backend',
    type: 'group',
    children: [
      { label: 'Node.js', value: 'node' },
      { label: 'Python', value: 'python' },
      { label: 'Java', value: 'java' }
    ]
  }
]

// Async Options
const asyncValue = ref('')
const asyncOptions = ref<string[]>([])
const asyncLoading = ref(false)

const performAsyncSearch = (query: string) => {
  asyncLoading.value = true
  setTimeout(() => {
    if (query) {
      asyncOptions.value = [
        `${query} Result 1`,
        `${query} Result 2`,
        `${query} Result 3`
      ]
    } else {
      asyncOptions.value = []
    }
    asyncLoading.value = false
  }, 500)
}

// Custom Render
const customValue = ref('')
const customOptions = [
  { label: 'Vue.js', value: 'vue', type: 'framework', color: '#42b883' },
  { label: 'React', value: 'react', type: 'framework', color: '#61dafb' },
  { label: 'Node.js', value: 'node', type: 'backend', color: '#339933' }
]

const renderCustomOption = ({ option }: any) => {
  return h('div', { style: 'display: flex; align-items: center; gap: 8px;' }, [
    h(NTag, {
      type: option.type === 'framework' ? 'info' : 'success',
      size: 'small'
    }, { default: () => option.type }),
    h('span', option.label)
  ])
}

// Real World Example - Email Compose
const emailSubject = ref('')
const emailTo = ref('')
const emailMessage = ref('')
const emailOptions = [
  { label: 'John Doe', value: 'john@example.com' },
  { label: 'Jane Smith', value: 'jane@example.com' },
  { label: 'Bob Johnson', value: 'bob@example.com' },
  { label: 'Alice Brown', value: 'alice@example.com' }
]
</script>

<style scoped>
.autocomplete-demo {
  padding: 0;
}

.n-p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
}

</style>
