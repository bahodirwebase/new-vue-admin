<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Tag</h1>
        <p class="page-subtitle">Tags are used for categorizing and labeling content</p>
      </div>

      <n-card title="Basic Tags">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Tag Types</h3>
            <n-space>
              <n-tag>Default</n-tag>
              <n-tag type="success">Success</n-tag>
              <n-tag type="info">Info</n-tag>
              <n-tag type="warning">Warning</n-tag>
              <n-tag type="error">Error</n-tag>
            </n-space>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Closable Tags</h3>
            <n-space>
              <n-tag closable @close="handleClose('tag1')">Closable</n-tag>
              <n-tag type="success" closable @close="handleClose('tag2')">Success</n-tag>
              <n-tag type="error" closable @close="handleClose('tag3')">Error</n-tag>
            </n-space>
          </div>
        </n-space>
      </n-card>

      <n-card title="Tag Styles">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Rounded Tags</h3>
            <n-space>
              <n-tag round>Default</n-tag>
              <n-tag type="success" round>Success</n-tag>
              <n-tag type="info" round>Info</n-tag>
              <n-tag type="warning" round>Warning</n-tag>
              <n-tag type="error" round>Error</n-tag>
            </n-space>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Custom Colors</h3>
            <n-space>
              <n-tag color="#ff6b6b">Custom Red</n-tag>
              <n-tag color="#4ecdc4">Custom Teal</n-tag>
              <n-tag color="#45b7d1">Custom Blue</n-tag>
              <n-tag color="#96ceb4">Custom Green</n-tag>
              <n-tag color="#ffeaa7">Custom Yellow</n-tag>
              <n-tag color="#dfe6e9">Custom Gray</n-tag>
            </n-space>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Tag Sizes</h3>
            <n-space align="center">
              <n-tag size="small">Small</n-tag>
              <n-tag size="medium">Medium</n-tag>
              <n-tag size="large">Large</n-tag>
            </n-space>
          </div>
        </n-space>
      </n-card>

      <n-card title="Icon Tags">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Tags with Icons</h3>
            <n-space>
              <n-tag>
                <template #icon>
                  <n-icon :component="CheckmarkCircleOutline" />
                </template>
                Completed
              </n-tag>
              <n-tag type="warning">
                <template #icon>
                  <n-icon :component="AlertCircleOutline" />
                </template>
                Pending
              </n-tag>
              <n-tag type="error">
                <template #icon>
                  <n-icon :component="WarningOutline" />
                </template>
                Failed
              </n-tag>
              <n-tag type="info">
                <template #icon>
                  <n-icon :component="InformationCircleOutline" />
                </template>
                Information
              </n-tag>
            </n-space>
          </div>
        </n-space>
      </n-card>

      <n-card title="Dynamic Tags">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Add/Remove Tags</h3>
            <n-space>
              <n-tag 
                v-for="tag in dynamicTags" 
                :key="tag"
                closable
                @close="removeTag(tag)"
              >
                {{ tag }}
              </n-tag>
              <n-button size="small" dashed @click="showAddInput">
                <template #icon>
                  <n-icon :component="AddOutline" />
                </template>
                Add Tag
              </n-button>
            </n-space>
            <div v-if="showInput" class="add-input">
              <n-input 
                v-model:value="newTag" 
                size="small" 
                placeholder="Enter tag name"
                @keyup.enter="addTag"
                @blur="cancelAdd"
                ref="inputRef"
              />
            </div>
          </div>
        </n-space>
      </n-card>

      <n-card title="Status Tags">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">User Status</h3>
            <div class="status-tags">
              <div class="status-item">
                <span class="status-label">Online:</span>
                <n-tag type="success" round size="small">
                  <template #icon>
                    <n-icon :component="RadioButtonOnOutline" />
                  </template>
                  Active
                </n-tag>
              </div>
              <div class="status-item">
                <span class="status-label">Offline:</span>
                <n-tag type="error" round size="small">
                  <template #icon>
                    <n-icon :component="RadioButtonOffOutline" />
                  </template>
                  Inactive
                </n-tag>
              </div>
              <div class="status-item">
                <span class="status-label">Away:</span>
                <n-tag type="warning" round size="small">
                  <template #icon>
                    <n-icon :component="TimeOutline" />
                  </template>
                  Away
                </n-tag>
              </div>
            </div>
          </div>
        </n-space>
      </n-card>

      <n-card title="Filter Tags">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Category Filters</h3>
            <n-space>
              <n-tag 
                v-for="category in categories" 
                :key="category"
                :type="selectedCategories.includes(category) ? 'primary' : 'default'"
                checkable
                @checked="toggleCategory(category)"
              >
                {{ category }}
              </n-tag>
            </n-space>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Technology Filters</h3>
            <n-space>
              <n-tag 
                v-for="tech in technologies" 
                :key="tech"
                :type="selectedTechs.includes(tech) ? 'success' : 'default'"
                checkable
                @checked="toggleTech(tech)"
              >
                {{ tech }}
              </n-tag>
            </n-space>
          </div>

          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Selected Filters</h3>
            <n-space>
              <n-tag 
                v-for="filter in allSelected" 
                :key="filter"
                closable
                type="primary"
                @close="removeFilter(filter)"
              >
                {{ filter }}
              </n-tag>
              <n-button 
                v-if="allSelected.length > 0" 
                size="small" 
                text 
                type="primary"
                @click="clearAllFilters"
              >
                Clear All
              </n-button>
            </n-space>
          </div>
        </n-space>
      </n-card>

      <n-card title="Numbered Tags">
        <n-space vertical :size="16">
          <div>
            <h3 style="margin-bottom: 12px; color: var(--text-primary)">Badge Tags</h3>
            <n-space>
              <n-tag>
                Notifications
                <template #avatar>
                  <n-avatar size="small" round>5</n-avatar>
                </template>
              </n-tag>
              <n-tag type="error">
                Errors
                <template #avatar>
                  <n-avatar size="small" round>12</n-avatar>
                </template>
              </n-tag>
              <n-tag type="success">
                Completed
                <template #avatar>
                  <n-avatar size="small" round>28</n-avatar>
                </template>
              </n-tag>
              <n-tag type="warning">
                Pending
                <template #avatar>
                  <n-avatar size="small" round>3</n-avatar>
                </template>
              </n-tag>
            </n-space>
          </div>
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, computed } from 'vue'
import {
  CheckmarkCircleOutline,
  AlertCircleOutline,
  WarningOutline,
  InformationCircleOutline,
  AddOutline,
  RadioButtonOnOutline,
  RadioButtonOffOutline,
  TimeOutline
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'

const dynamicTags = ref(['Vue.js', 'TypeScript', 'Naive UI'])
const newTag = ref('')
const showInput = ref(false)
const inputRef = ref()

const categories = ['Frontend', 'Backend', 'Mobile', 'Desktop', 'DevOps']
const technologies = ['JavaScript', 'Python', 'React', 'Vue', 'Node.js', 'Docker']

const selectedCategories = ref<string[]>([])
const selectedTechs = ref<string[]>([])

const allSelected = computed(() => [
  ...selectedCategories.value,
  ...selectedTechs.value
])

const handleClose = (tag: string) => {
  console.log('Tag closed:', tag)
}

const showAddInput = () => {
  showInput.value = true
  nextTick(() => {
    inputRef.value?.focus()
  })
}

const addTag = () => {
  if (newTag.value.trim()) {
    dynamicTags.value.push(newTag.value.trim())
    newTag.value = ''
  }
  showInput.value = false
}

const cancelAdd = () => {
  newTag.value = ''
  showInput.value = false
}

const removeTag = (tag: string) => {
  const index = dynamicTags.value.indexOf(tag)
  if (index > -1) {
    dynamicTags.value.splice(index, 1)
  }
}

const toggleCategory = (category: string) => {
  const index = selectedCategories.value.indexOf(category)
  if (index > -1) {
    selectedCategories.value.splice(index, 1)
  } else {
    selectedCategories.value.push(category)
  }
}

const toggleTech = (tech: string) => {
  const index = selectedTechs.value.indexOf(tech)
  if (index > -1) {
    selectedTechs.value.splice(index, 1)
  } else {
    selectedTechs.value.push(tech)
  }
}

const removeFilter = (filter: string) => {
  const catIndex = selectedCategories.value.indexOf(filter)
  if (catIndex > -1) {
    selectedCategories.value.splice(catIndex, 1)
  }
  
  const techIndex = selectedTechs.value.indexOf(filter)
  if (techIndex > -1) {
    selectedTechs.value.splice(techIndex, 1)
  }
}

const clearAllFilters = () => {
  selectedCategories.value = []
  selectedTechs.value = []
}
</script>

<style scoped>
.ui-page {
  max-width: 100%;
}

.page-header {
  margin-bottom: 8px;
}

.page-title {
  font-family: var(--font-secondary);
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
}

.add-input {
  margin-top: 12px;
  max-width: 200px;
}

.status-tags {
  padding: 8px 0;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.status-label {
  min-width: 80px;
  font-weight: 500;
  color: var(--text-primary);
}
</style>
