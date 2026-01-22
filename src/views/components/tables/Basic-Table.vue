<template>
  <div class="basic-table">
    <n-card title="Basic Table" class="table-card">
      <template #header-extra>
        <n-space>
          <n-button @click="refreshData" type="primary" size="small">
            <n-icon :component="RefreshOutline" />
            Refresh
          </n-button>
        </n-space>
      </template>

      <!-- Simple Table -->
      <n-h3>Simple Table</n-h3>
      <n-data-table
        :columns="simpleColumns"
        :data="simpleData"
        :pagination="false"
        :bordered="false"
      />

      <n-divider />

      <!-- Bordered Table -->
      <n-h3>Bordered Table</n-h3>
      <n-data-table
        :columns="simpleColumns"
        :data="simpleData"
        :pagination="false"
        :bordered="true"
      />

      <n-divider />

      <!-- Striped Table -->
      <n-h3>Striped Table</n-h3>
      <n-data-table
        :columns="simpleColumns"
        :data="simpleData"
        :pagination="false"
        :striped="true"
      />

      <n-divider />

      <!-- Small Table -->
      <n-h3>Small Size Table</n-h3>
      <n-data-table
        :columns="simpleColumns"
        :data="simpleData"
        :pagination="false"
        size="small"
      />

      <n-divider />

      <!-- Table with Custom Styles -->
      <n-h3>Table with Custom Styles</n-h3>
      <n-data-table
        :columns="styledColumns"
        :data="styledData"
        :pagination="false"
        :row-class-name="rowClassName"
      />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { NTag, NButton, NIcon, useMessage } from 'naive-ui'
import { RefreshOutline, EyeOutline, CreateOutline, TrashOutline } from '@vicons/ionicons5'
import type { DataTableColumns } from 'naive-ui'

const message = useMessage()

type RowData = {
  id: number
  name: string
  email: string
  role: string
  status: string
  avatar: string
  joinDate: string
  salary: number
}

const simpleColumns: DataTableColumns<RowData> = [
  {
    title: 'ID',
    key: 'id',
    width: 60,
    sorter: 'default'
  },
  {
    title: 'Name',
    key: 'name',
    sorter: 'default'
  },
  {
    title: 'Email',
    key: 'email',
    sorter: 'default'
  },
  {
    title: 'Role',
    key: 'role',
    sorter: 'default'
  },
  {
    title: 'Status',
    key: 'status',
    render(row) {
      return h(NTag, {
        type: row.status === 'Active' ? 'success' : row.status === 'Pending' ? 'warning' : 'error',
        size: 'small'
      }, { default: () => row.status })
    }
  }
]

const styledColumns: DataTableColumns<RowData> = [
  {
    title: 'Avatar',
    key: 'avatar',
    render(row) {
      return h('img', {
        src: row.avatar,
        style: {
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          objectFit: 'cover'
        }
      })
    }
  },
  {
    title: 'Name',
    key: 'name',
    sorter: 'default'
  },
  {
    title: 'Email',
    key: 'email',
    sorter: 'default'
  },
  {
    title: 'Role',
    key: 'role',
    render(row) {
      return h(NTag, {
        type: row.role === 'Admin' ? 'error' : row.role === 'Manager' ? 'warning' : 'info',
        size: 'small'
      }, { default: () => row.role })
    }
  },
  {
    title: 'Salary',
    key: 'salary',
    sorter: (a, b) => a.salary - b.salary,
    render(row) {
      return `$${row.salary.toLocaleString()}`
    }
  },
  {
    title: 'Join Date',
    key: 'joinDate',
    sorter: 'default'
  },
  {
    title: 'Actions',
    key: 'actions',
    render(row) {
      return h('div', { class: 'flex gap-2' }, [
        h(NButton, {
          size: 'small',
          type: 'info',
          onClick: () => viewUser(row)
        }, { default: () => h(NIcon, { component: EyeOutline }) }),
        h(NButton, {
          size: 'small',
          type: 'warning',
          onClick: () => editUser(row)
        }, { default: () => h(NIcon, { component: CreateOutline }) }),
        h(NButton, {
          size: 'small',
          type: 'error',
          onClick: () => deleteUser(row)
        }, { default: () => h(NIcon, { component: TrashOutline }) })
      ])
    }
  }
]

const simpleData = ref<RowData[]>([
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', avatar: '', joinDate: '2023-01-15', salary: 75000 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', status: 'Active', avatar: '', joinDate: '2023-02-20', salary: 65000 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Designer', status: 'Pending', avatar: '', joinDate: '2023-03-10', salary: 55000 },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', status: 'Active', avatar: '', joinDate: '2023-04-05', salary: 70000 },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Developer', status: 'Inactive', avatar: '', joinDate: '2023-05-12', salary: 62000 }
])

const styledData = ref<RowData[]>([
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=1', joinDate: '2023-01-15', salary: 75000 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=5', joinDate: '2023-02-20', salary: 65000 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Designer', status: 'Pending', avatar: 'https://i.pravatar.cc/150?img=3', joinDate: '2023-03-10', salary: 55000 },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=9', joinDate: '2023-04-05', salary: 70000 },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Developer', status: 'Inactive', avatar: 'https://i.pravatar.cc/150?img=7', joinDate: '2023-05-12', salary: 62000 }
])

const rowClassName = (row: RowData) => {
  if (row.status === 'Inactive') return 'inactive-row'
  if (row.role === 'Admin') return 'admin-row'
  return ''
}

const refreshData = () => {
  message.success('Data refreshed successfully!')
}

const viewUser = (user: RowData) => {
  message.info(`Viewing user: ${user.name}`)
}

const editUser = (user: RowData) => {
  message.warning(`Editing user: ${user.name}`)
}

const deleteUser = (user: RowData) => {
  message.error(`Deleting user: ${user.name}`)
}
</script>

<style scoped>
.basic-table {
  display: flex;
  flex-direction: column;
  gap: 16px;
}


:deep(.n-data-table) {
  font-size: 14px;
}

:deep(.inactive-row) {
  opacity: 0.6;
  background-color: #f5f5f5;
}

:deep(.admin-row) {
  background-color: #fff2e8;
}

.flex {
  display: flex;
}

.gap-2 {
  gap: 8px;
}
</style>
