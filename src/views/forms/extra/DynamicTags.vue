<template>
  <div class="dynamic-tags-demo">
    <n-space vertical :size="24">
      <n-grid :x-gap="12" :cols="2">
        <n-gi>
          <n-card title="Basic Dynamic Tags">
            <n-space vertical :size="16">
              <n-dynamic-tags v-model:value="basicValue" placeholder="Add tag" />
              <n-p>Tags: {{ JSON.stringify(basicValue) }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Dynamic Tags with Closable">
            <n-space vertical :size="16">
              <n-dynamic-tags v-model:value="closableValue" placeholder="Add tag" :closable="true" />
              <n-p>Tags: {{ JSON.stringify(closableValue) }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Dynamic Tags with Max">
            <n-space vertical :size="16">
              <n-dynamic-tags v-model:value="maxValue" placeholder="Add tag" :max="5" />
              <n-p>Tags (max 5): {{ JSON.stringify(maxValue) }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Dynamic Tags with Validation">
            <n-space vertical :size="16">
              <n-dynamic-tags v-model:value="validatedValue" placeholder="Add valid tag" :on-create="validateTag" />
              <n-p>Valid tags: {{ JSON.stringify(validatedValue) }}</n-p>
            </n-space>
          </n-card>

        </n-gi>
        <n-gi>
          <n-card title="Dynamic Tags with Custom Render">
            <n-space vertical :size="16">
              <n-dynamic-tags v-model:value="customValue" placeholder="Add skill" :render-tag="renderCustomTag" />
              <n-p>Skills: {{ JSON.stringify(customValue) }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Dynamic Tags with Presets">
            <n-space vertical :size="16">
              <n-dynamic-tags v-model:value="presetValue" placeholder="Add option" :options="presetOptions" />
              <n-p>Options: {{ JSON.stringify(presetValue) }}</n-p>
            </n-space>
          </n-card>

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
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { NTag } from 'naive-ui'

// Basic Dynamic Tags
const basicValue = ref(['Vue.js', 'TypeScript'])

// Dynamic Tags with Closable
const closableValue = ref(['Frontend', 'Backend', 'DevOps'])

// Dynamic Tags with Max
const maxValue = ref(['Tag 1', 'Tag 2', 'Tag 3'])

// Dynamic Tags with Validation
const validatedValue = ref(['valid-tag'])

const validateTag = (value: string) => {
  if (!value || value.length < 2) return null
  if (!/^[a-zA-Z0-9-]+$/.test(value)) return null
  return value.toLowerCase()
}

// Dynamic Tags with Custom Render
const customValue = ref(['JavaScript', 'Python', 'Docker'])

const renderCustomTag = ({ value, handleClose }: any) => {
  return h(NTag, {
    type: 'info',
    closable: true,
    onClose: handleClose
  }, { default: () => `💻 ${value}` })
}

// Dynamic Tags with Presets
const presetValue = ref(['Feature'])
const presetOptions = [
  { label: 'Feature', value: 'feature' },
  { label: 'Bug', value: 'bug' },
  { label: 'Enhancement', value: 'enhancement' },
  { label: 'Documentation', value: 'documentation' },
  { label: 'Testing', value: 'testing' }
]

// Real World Example - Project Tags
const projectName = ref('')
const projectTags = ref(['frontend', 'vue'])
const projectDescription = ref('')

const renderProjectTag = ({ value, handleClose }: any) => {
  const colors: Array<'primary' | 'success' | 'warning' | 'error' | 'info'> = ['primary', 'success', 'warning', 'error', 'info']
  const color = colors[Math.floor(Math.random() * colors.length)]

  return h(NTag, {
    type: color,
    closable: true,
    onClose: handleClose
  }, { default: () => `🏷️ ${value}` })
}
</script>

<style scoped>
.dynamic-tags-demo {
  padding: 0;
}

.n-p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
}

.project-tags {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  background: var(--bg-secondary);
}
</style>
