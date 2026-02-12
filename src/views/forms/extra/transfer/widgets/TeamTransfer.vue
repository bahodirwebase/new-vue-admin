<script setup lang="ts">
import { ref, h } from 'vue'
import { NAvatar } from 'naive-ui'
import { useMessage } from 'naive-ui'

const message = useMessage()
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

<template>
  <n-card title="Real World Example - Team Assignment">
    <n-space vertical :size="16">
      <n-space vertical :size="12">
        <span>Assign team members to project:</span>
        <n-transfer size="small" v-model:value="assignedMembers" :options="teamOptions"
          :render-source-label="renderTeamMember" :render-target-label="renderAssignedMember" source-filterable
          target-filterable />
      </n-space>
      <n-input v-model:value="projectName" placeholder="Project name" style="margin-top: 12px;" />
      <n-input v-model:value="projectDescription" type="textarea" placeholder="Project description" :rows="3"
        style="margin-top: 12px;" />
      <n-button type="primary" @click="assignTeam" style="margin-top: 12px;">
        Assign Team
      </n-button>
    </n-space>
  </n-card>
</template>

<style scoped>
</style>
