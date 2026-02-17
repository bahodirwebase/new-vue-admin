import type { DataTableColumns } from 'naive-ui'
import { h } from 'vue'
import { NButton, NIcon } from 'naive-ui'
import CustomTag from '@/components/custom/CustomTag.vue'
import { EyeOutline, CreateOutline, TrashOutline } from '@vicons/ionicons5'

export type RowData = {
  id: number
  name: string
  email: string
  role: string
  status: string
  avatar: string
  joinDate: string
  salary: number
}

export const TABLE_SIZES = [
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium' },
  { label: 'Large', value: 'large' }
]

export const TABLE_VARIANTS = [
  { label: 'Default', bordered: false, striped: false },
  { label: 'Bordered', bordered: true, striped: false },
  { label: 'Striped', bordered: false, striped: true },
  { label: 'Bordered & Striped', bordered: true, striped: true }
]

export const STATUS_OPTIONS = [
  { label: 'Active', value: 'Active', type: 'success' as const },
  { label: 'Pending', value: 'Pending', type: 'warning' as const },
  { label: 'Inactive', value: 'Inactive', type: 'error' as const }
]

export const ROLE_OPTIONS = [
  { label: 'Admin', value: 'Admin', type: 'error' as const },
  { label: 'Manager', value: 'Manager', type: 'warning' as const },
  { label: 'Developer', value: 'Developer', type: 'info' as const },
  { label: 'Designer', value: 'Designer', type: 'success' as const }
]

export const SIMPLE_COLUMNS: DataTableColumns<RowData> = [
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
      const statusType = STATUS_OPTIONS.find(s => s.value === row.status)?.type || 'default'
      return h(CustomTag, {
        type: statusType,
        size: 'small'
      }, { default: () => row.status })
    }
  }
]

export const STYLED_COLUMNS: DataTableColumns<RowData> = [
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
      const roleType = ROLE_OPTIONS.find(r => r.value === row.role)?.type || 'default'
      return h(CustomTag, {
        type: roleType,
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

export const SAMPLE_DATA: RowData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', avatar: '', joinDate: '2023-01-15', salary: 75000 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', status: 'Active', avatar: '', joinDate: '2023-02-20', salary: 65000 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Designer', status: 'Pending', avatar: '', joinDate: '2023-03-10', salary: 55000 },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', status: 'Active', avatar: '', joinDate: '2023-04-05', salary: 70000 },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Developer', status: 'Inactive', avatar: '', joinDate: '2023-05-12', salary: 62000 }
]

export const STYLED_SAMPLE_DATA: RowData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=1', joinDate: '2023-01-15', salary: 75000 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=5', joinDate: '2023-02-20', salary: 65000 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Designer', status: 'Pending', avatar: 'https://i.pravatar.cc/150?img=3', joinDate: '2023-03-10', salary: 55000 },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=9', joinDate: '2023-04-05', salary: 70000 },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Developer', status: 'Inactive', avatar: 'https://i.pravatar.cc/150?img=7', joinDate: '2023-05-12', salary: 62000 }
]

// Action handlers (these would be implemented in the parent component)
export const viewUser = (row: RowData) => {
  console.log('View user:', row)
}

export const editUser = (row: RowData) => {
  console.log('Edit user:', row)
}

export const deleteUser = (row: RowData) => {
  console.log('Delete user:', row)
}
