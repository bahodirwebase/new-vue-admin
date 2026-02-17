import type { DataTableColumns, FormRules } from 'naive-ui'
import { h } from 'vue'
import CustomTag from '@/components/custom/CustomTag.vue'
import {
  NButton,
  NIcon,
  NAvatar,
  NDropdown
} from 'naive-ui'
import {
  EyeOutline,
  CreateOutline,
  TrashOutline,
  EllipsisVerticalOutline
} from '@vicons/ionicons5'

export type User = {
  id: number
  name: string
  email: string
  role: string
  status: string
  avatar: string
  joinDate: string
  salary: number
  department: string
  location: string
}

export const STATUS_OPTIONS = [
  { label: 'Active', value: 'Active', type: 'success' as const },
  { label: 'Pending', value: 'Pending', type: 'warning' as const },
  { label: 'Inactive', value: 'Inactive', type: 'error' as const }
]

export const ROLE_OPTIONS = [
  { label: 'Admin', value: 'Admin', type: 'error' as const },
  { label: 'Manager', value: 'Manager', type: 'warning' as const },
  { label: 'Developer', value: 'Developer', type: 'info' as const },
  { label: 'Designer', value: 'Designer', type: 'success' as const },
  { label: 'Marketing', value: 'Marketing', type: 'default' as const }
]

export const DEPARTMENT_OPTIONS = [
  { label: 'IT', value: 'IT' },
  { label: 'Design', value: 'Design' },
  { label: 'Management', value: 'Management' },
  { label: 'Marketing', value: 'Marketing' }
]

export const LOCATION_OPTIONS = [
  { label: 'New York', value: 'New York' },
  { label: 'San Francisco', value: 'San Francisco' },
  { label: 'Chicago', value: 'Chicago' },
  { label: 'Boston', value: 'Boston' },
  { label: 'Seattle', value: 'Seattle' },
  { label: 'Los Angeles', value: 'Los Angeles' },
  { label: 'Austin', value: 'Austin' },
  { label: 'Portland', value: 'Portland' }
]

export const TABLE_COLUMNS: DataTableColumns<User> = [
  {
    type: 'selection',
    disabled(row) {
      return row.name === 'John Doe'
    }
  },
  {
    title: 'Avatar',
    key: 'avatar',
    width: 80,
    render(row) {
      return h(NAvatar, {
        src: row.avatar,
        size: 'medium',
        round: true
      })
    }
  },
  {
    title: 'Name',
    key: 'name',
    width: 150,
    sorter: 'default'
  },
  {
    title: 'Email',
    key: 'email',
    width: 200,
    sorter: 'default',
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: 'Role',
    key: 'role',
    width: 120,
    sorter: 'default',
    render(row) {
      const roleType = ROLE_OPTIONS.find(r => r.value === row.role)?.type || 'default'
      return h(CustomTag, {
        type: roleType,
        size: 'small'
      }, { default: () => row.role })
    }
  },
  {
    title: 'Status',
    key: 'status',
    width: 100,
    sorter: 'default',
    render(row) {
      const statusType = STATUS_OPTIONS.find(s => s.value === row.status)?.type || 'default'
      return h(CustomTag, {
        type: statusType,
        size: 'small'
      }, { default: () => row.status })
    }
  },
  {
    title: 'Department',
    key: 'department',
    width: 120,
    sorter: 'default'
  },
  {
    title: 'Location',
    key: 'location',
    width: 120,
    sorter: 'default'
  },
  {
    title: 'Salary',
    key: 'salary',
    width: 120,
    sorter: (a, b) => a.salary - b.salary,
    render(row) {
      return `$${row.salary.toLocaleString()}`
    }
  },
  {
    title: 'Join Date',
    key: 'joinDate',
    width: 120,
    sorter: 'default'
  },
  {
    title: 'Actions',
    key: 'actions',
    width: 120,
    render(row) {
      const dropdownOptions = [
        {
          label: 'View',
          key: 'view',
          icon: () => h(NIcon, { component: EyeOutline })
        },
        {
          label: 'Edit',
          key: 'edit',
          icon: () => h(NIcon, { component: CreateOutline })
        },
        {
          label: 'Delete',
          key: 'delete',
          icon: () => h(NIcon, { component: TrashOutline })
        }
      ]

      return h(NDropdown, {
        options: dropdownOptions,
        onSelect: (key: string) => handleAction(key, row)
      }, {
        default: () => h(NButton, {
          size: 'small',
          quaternary: true,
          circle: true
        }, { default: () => h(NIcon, { component: EllipsisVerticalOutline }) })
      })
    }
  }
]

export const SAMPLE_USERS: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=1', joinDate: '2023-01-15', salary: 75000, department: 'IT', location: 'New York' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=5', joinDate: '2023-02-20', salary: 65000, department: 'IT', location: 'San Francisco' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Designer', status: 'Pending', avatar: 'https://i.pravatar.cc/150?img=3', joinDate: '2023-03-10', salary: 55000, department: 'Design', location: 'Chicago' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=9', joinDate: '2023-04-05', salary: 70000, department: 'Management', location: 'Boston' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Developer', status: 'Inactive', avatar: 'https://i.pravatar.cc/150?img=7', joinDate: '2023-05-12', salary: 62000, department: 'IT', location: 'Seattle' },
  { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'Marketing', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=11', joinDate: '2023-06-18', salary: 58000, department: 'Marketing', location: 'Los Angeles' },
  { id: 7, name: 'Edward Norton', email: 'edward@example.com', role: 'Developer', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=13', joinDate: '2023-07-22', salary: 68000, department: 'IT', location: 'Austin' },
  { id: 8, name: 'Fiona Green', email: 'fiona@example.com', role: 'Designer', status: 'Pending', avatar: 'https://i.pravatar.cc/150?img=15', joinDate: '2023-08-30', salary: 52000, department: 'Design', location: 'Portland' }
]

export const FORM_RULES: FormRules = {
  name: [
    { required: true, message: 'Please enter name', trigger: 'blur' }
  ],
  email: [
    { required: true, message: 'Please enter email', trigger: 'blur' },
    { type: 'email', message: 'Please enter valid email', trigger: 'blur' }
  ],
  role: [
    { required: true, message: 'Please select role', trigger: 'change' }
  ],
  salary: [
    { required: true, message: 'Please enter salary', trigger: 'blur' }
  ]
}

export const PAGINATION_CONFIG = {
  page: 1,
  pageSize: 10,
  itemCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100]
}

export const createNewUser = (): User => ({
  id: 0,
  name: '',
  email: '',
  role: '',
  status: 'Active',
  avatar: '',
  joinDate: new Date().toISOString().split('T')[0],
  salary: 0,
  department: '',
  location: ''
})

// Action handlers (these would be implemented in the parent component)
export const handleAction = (action: string, user: User) => {
  console.log('Action:', action, 'User:', user)
}
