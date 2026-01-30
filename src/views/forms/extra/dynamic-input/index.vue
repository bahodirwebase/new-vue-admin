<template>
  <div class="dynamic-input-demo">
    <n-space vertical :size="24">
      <n-grid :x-gap="12" :cols="2">
        <n-gi>
          <n-card title="Basic Dynamic Input">
            <n-space vertical :size="16">
              <n-dynamic-input v-model:value="basicValue" placeholder="Enter item" />
              <n-p>Items: {{ JSON.stringify(basicValue) }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Dynamic Input with Presets">
            <n-space vertical :size="16">
              <n-dynamic-input v-model:value="presetValue" placeholder="Enter email" :preset="emailPreset" />
              <n-p>Emails: {{ JSON.stringify(presetValue) }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Dynamic Input with Custom Create">
            <n-space vertical :size="16">
              <n-dynamic-input v-model:value="customValue" placeholder="Enter tag" :on-create="createTag" />
              <n-p>Tags: {{ JSON.stringify(customValue) }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Dynamic Input with Validation">
            <n-space vertical :size="16">
              <n-dynamic-input v-model:value="validatedValue" placeholder="Enter valid email"
                :on-create="validateEmail" />
              <n-p>Valid emails: {{ JSON.stringify(validatedValue) }}</n-p>
            </n-space>
          </n-card>
        </n-gi>
        <n-gi>
          <n-card title="Dynamic Input with Max Items">
            <n-space vertical :size="16">
              <n-dynamic-input v-model:value="maxValue" placeholder="Enter skill" :max="3" />
              <n-p>Skills (max 3): {{ JSON.stringify(maxValue) }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Dynamic Input with Key-Value">
            <n-space vertical :size="16">
              <n-dynamic-input v-model:value="keyValue" :preset="keyValuePreset" />
              <n-p>Key-Value pairs: {{ JSON.stringify(keyValue) }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Real World Example - Team Members">
            <n-space vertical :size="16">
              <div class="team-form">
                <n-dynamic-input v-model:value="teamMembers" :preset="memberPreset" placeholder="Add team member" />
                <n-input v-model:value="teamName" placeholder="Team name" style="margin-top: 12px;" />
                <n-input v-model:value="teamDescription" type="textarea" placeholder="Team description" :rows="3"
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
import { NInput } from 'naive-ui'

// Basic Dynamic Input
const basicValue = ref(['Item 1', 'Item 2'])

// Dynamic Input with Presets
const presetValue = ref(['user@example.com'])

const emailPreset = () => {
  return h(NInput, {
    placeholder: 'Enter email address'
  })
}

// Dynamic Input with Custom Create
const customValue = ref(['vue', 'react'])

const createTag = (value: string) => {
  if (!value) return null
  return value.toLowerCase().replace(/\s+/g, '-')
}

// Dynamic Input with Validation
const validatedValue = ref(['valid@example.com'])

const validateEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value)) {
    return null
  }
  return value
}

// Dynamic Input with Max Items
const maxValue = ref(['JavaScript', 'TypeScript'])

// Dynamic Input with Key-Value
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

// Real World Example - Team Members
const teamMembers = ref([
  { name: 'John Doe', role: 'Developer' },
  { name: 'Jane Smith', role: 'Designer' }
])
const teamName = ref('')
const teamDescription = ref('')

const memberPreset = () => {
  return h('div', { style: 'display: flex; gap: 8px;' }, [
    h(NInput, {
      placeholder: 'Name',
      style: { flex: 1 }
    }),
    h(NInput, {
      placeholder: 'Role',
      style: { width: '120px' }
    })
  ])
}
</script>

<style scoped>
.dynamic-input-demo {
  padding: 0;
}

.n-p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
}

.team-form {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  background: var(--bg-secondary);
}
</style>
