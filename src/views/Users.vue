<template>
  <div class="users-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Users</h1>
        <p class="page-subtitle">Manage your users</p>
      </div>

      <n-card>
        <n-data-table
          :columns="columns"
          :data="users"
          :pagination="pagination"
        />
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NTag, NAvatar } from 'naive-ui'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
  avatar: string
}

const users = ref<User[]>([
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', avatar: 'JD' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', avatar: 'JS' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive', avatar: 'BJ' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator', status: 'Active', avatar: 'AB' }
])

const columns: DataTableColumns<User> = [
  {
    title: 'User',
    key: 'name',
    render(row) {
      return h('div', { style: 'display: flex; align-items: center; gap: 12px' }, [
        h(NAvatar, { round: true, size: 32 }, { default: () => row.avatar }),
        h('div', [
          h('div', { style: 'font-weight: 500' }, row.name),
          h('div', { style: 'font-size: 13px; color: var(--text-tertiary)' }, row.email)
        ])
      ])
    }
  },
  {
    title: 'Role',
    key: 'role',
    render(row) {
      return h(NTag, { type: 'info' }, { default: () => row.role })
    }
  },
  {
    title: 'Status',
    key: 'status',
    render(row) {
      return h(NTag, {
        type: row.status === 'Active' ? 'success' : 'error'
      }, { default: () => row.status })
    }
  },
  {
    title: 'Actions',
    key: 'actions',
    render() {
      return h('div', { style: 'display: flex; gap: 8px' }, [
        h(NButton, { size: 'small', type: 'primary' }, { default: () => 'Edit' }),
        h(NButton, { size: 'small' }, { default: () => 'Delete' })
      ])
    }
  }
]

const pagination = {
  pageSize: 10
}
</script>

<style scoped>
.users-page {
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
</style>
