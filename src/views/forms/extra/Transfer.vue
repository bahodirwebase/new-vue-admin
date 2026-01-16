<template>
  <div class="transfer-demo">
    <n-space vertical :size="24">

      <n-grid :cols="2" :x-gap="12">
        <n-gi>
          <n-card title="Basic Transfer">
            <n-space vertical :size="16">
              <n-transfer v-model:value="basicValue" :options="basicOptions" />
              <n-p>Selected: {{ JSON.stringify(basicValue) }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Transfer with Search">
            <n-space vertical :size="16">
              <n-transfer v-model:value="searchValue" :options="basicOptions" filterable />
              <n-p>Selected: {{ JSON.stringify(searchValue) }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Transfer with Multiple Selection">
            <n-space vertical :size="16">
              <n-transfer v-model:value="multipleValue" :options="basicOptions" source-filterable target-filterable />
              <n-p>Selected: {{ JSON.stringify(multipleValue) }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Transfer with Custom Render">
            <n-space vertical :size="16">
              <n-transfer v-model:value="customValue" :options="customOptions" :render-source-label="renderSourceLabel"
                :render-target-label="renderTargetLabel" />
              <n-p>Selected: {{ JSON.stringify(customValue) }}</n-p>
            </n-space>
          </n-card>
        </n-gi>
        <n-gi>
          <n-card title="Transfer with Disabled Items">
            <n-space vertical :size="16">
              <n-transfer v-model:value="disabledValue" :options="disabledOptions" />
              <n-p>Selected: {{ JSON.stringify(disabledValue) }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Transfer with Pagination">
            <n-space vertical :size="16">
              <n-transfer v-model:value="paginationValue" :options="largeOptions" :pagination="{ pageSize: 10 }"
                source-filterable />
              <n-p>Selected: {{ JSON.stringify(paginationValue) }}</n-p>
            </n-space>
          </n-card>

          <n-card title="Real World Example - Team Assignment">
            <n-space vertical :size="16">
              <div class="team-assignment">
                <n-space vertical :size="12">
                  <span>Assign team members to project:</span>
                  <n-transfer v-model:value="assignedMembers" :options="teamOptions"
                    :render-source-label="renderTeamMember" :render-target-label="renderAssignedMember"
                    source-filterable target-filterable />
                </n-space>
                <n-input v-model:value="projectName" placeholder="Project name" style="margin-top: 12px;" />
                <n-input v-model:value="projectDescription" type="textarea" placeholder="Project description" :rows="3"
                  style="margin-top: 12px;" />
                <n-button type="primary" @click="assignTeam" style="margin-top: 12px;">
                  Assign Team
                </n-button>
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
import { NTag, NAvatar } from 'naive-ui'
import { useMessage } from 'naive-ui'

const message = useMessage()

// Basic Transfer
const basicValue = ref(['option1', 'option3'])

const basicOptions = [
  { label: 'Frontend Development', value: 'option1' },
  { label: 'Backend Development', value: 'option2' },
  { label: 'UI/UX Design', value: 'option3' },
  { label: 'DevOps', value: 'option4' },
  { label: 'Testing', value: 'option5' }
]

// Transfer with Search
const searchValue = ref(['option2'])

// Transfer with Multiple Selection
const multipleValue = ref(['option1', 'option3'])

// Transfer with Custom Render
const customValue = ref(['vue', 'react'])

const customOptions = [
  { label: 'Vue.js', value: 'vue', type: 'framework', color: '#42b883' },
  { label: 'React', value: 'react', type: 'framework', color: '#61dafb' },
  { label: 'Angular', value: 'angular', type: 'framework', color: '#dd0031' },
  { label: 'Node.js', value: 'node', type: 'backend', color: '#339933' },
  { label: 'Python', value: 'python', type: 'backend', color: '#3776ab' }
]

const renderSourceLabel = ({ option }: any) => {
  return h('div', { style: 'display: flex; align-items: center; gap: 8px;' }, [
    h(NTag, {
      type: option.type === 'framework' ? 'info' : 'success',
      size: 'small'
    }, { default: () => option.type }),
    h('span', option.label)
  ])
}

const renderTargetLabel = ({ option }: any) => {
  return h('div', { style: 'display: flex; align-items: center; gap: 8px;' }, [
    h('span', {
      style: `display: inline-block; width: 12px; height: 12px; border-radius: 50%; background: ${option.color};`
    }),
    h('span', option.label)
  ])
}

// Transfer with Disabled Items
const disabledValue = ref(['option1', 'option3'])

const disabledOptions = [
  { label: 'Active Project 1', value: 'option1' },
  { label: 'Completed Project 2', value: 'option2', disabled: true },
  { label: 'Active Project 3', value: 'option3' },
  { label: 'Archived Project 4', value: 'option4', disabled: true },
  { label: 'Active Project 5', value: 'option5' }
]

// Transfer with Pagination
const paginationValue = ref(['item1', 'item3'])

const largeOptions = Array.from({ length: 50 }, (_, i) => ({
  label: `Item ${i + 1}`,
  value: `item${i + 1}`
}))

// Real World Example - Team Assignment
const assignedMembers = ref([])
const projectName = ref('')
const projectDescription = ref('')

const teamOptions = [
  {
    label: 'John Doe',
    value: 'john',
    role: 'Frontend Developer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
  },
  {
    label: 'Jane Smith',
    value: 'jane',
    role: 'Backend Developer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane'
  },
  {
    label: 'Bob Johnson',
    value: 'bob',
    role: 'UI/UX Designer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob'
  },
  {
    label: 'Alice Brown',
    value: 'alice',
    role: 'DevOps Engineer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice'
  },
  {
    label: 'Charlie Wilson',
    value: 'charlie',
    role: 'QA Engineer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=charlie'
  }
]

const renderTeamMember = ({ option }: any) => {
  return h('div', { style: 'display: flex; align-items: center; gap: 8px;' }, [
    h(NAvatar, { size: 24, src: option.avatar }),
    h('div', [
      h('div', { style: 'font-weight: 600;' }, option.label),
      h('div', { style: 'font-size: 12px; color: var(--text-secondary);' }, option.role)
    ])
  ])
}

const renderAssignedMember = ({ option }: any) => {
  return h('div', { style: 'display: flex; align-items: center; gap: 8px;' }, [
    h(NAvatar, { size: 20, src: option.avatar }),
    h('span', option.label)
  ])
}

const assignTeam = () => {
  if (!projectName.value.trim()) {
    message.error('Please enter a project name')
    return
  }

  if (assignedMembers.value.length === 0) {
    message.error('Please assign at least one team member')
    return
  }

  message.success(`Team assigned to project: ${projectName.value}`)
  console.log('Team assignment:', {
    project: projectName.value,
    description: projectDescription.value,
    members: assignedMembers.value
  })
}
</script>

<style scoped>
.transfer-demo {
  padding: 0;
}

.n-card {
  margin-bottom: 12px;
}

.n-p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
}

.team-assignment {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  background: var(--bg-secondary);
}
</style>
