<template>
  <div class="data-table">
    <n-card title="Data Table" class="table-card">
      <template #header-extra>
        <n-space>
          <n-button @click="showAddModal = true" type="primary" size="small">
            <n-icon :component="AddOutline" />
            Add User
          </n-button>
          <n-button @click="exportData" type="info" size="small">
            <n-icon :component="DownloadOutline" />
            Export
          </n-button>
          <n-button @click="refreshData" type="default" size="small">
            <n-icon :component="RefreshOutline" />
            Refresh
          </n-button>
        </n-space>
      </template>

      <!-- Search and Filter -->
      <n-space class="mb-4">
        <n-input
          v-model:value="searchText"
          placeholder="Search users..."
          clearable
          style="width: 300px"
          @input="handleSearch"
        >
          <template #prefix>
            <n-icon :component="SearchOutline" />
          </template>
        </n-input>
        
        <n-select
          v-model:value="statusFilter"
          placeholder="Filter by status"
          :options="statusOptions"
          clearable
          style="width: 150px"
          @update:value="handleFilter"
        />
        
        <n-select
          v-model:value="roleFilter"
          placeholder="Filter by role"
          :options="roleOptions"
          clearable
          style="width: 150px"
          @update:value="handleFilter"
        />
      </n-space>

      <!-- Advanced Data Table -->
      <n-data-table
        :columns="columns"
        :data="filteredData"
        :pagination="pagination"
        :loading="loading"
        :bordered="true"
        :striped="true"
        :row-key="rowKey"
        @update:page="handlePageChange"
        @update:page-size="handlePageSizeChange"
      />

      <!-- Statistics -->
      <n-grid :cols="4" :x-gap="16" class="mt-6">
        <n-gi>
          <n-statistic label="Total Users" :value="totalUsers" />
        </n-gi>
        <n-gi>
          <n-statistic label="Active Users" :value="activeUsers" />
        </n-gi>
        <n-gi>
          <n-statistic label="Pending Users" :value="pendingUsers" />
        </n-gi>
        <n-gi>
          <n-statistic label="Inactive Users" :value="inactiveUsers" />
        </n-gi>
      </n-grid>
    </n-card>

    <!-- Add/Edit User Modal -->
    <n-modal v-model:show="showAddModal" preset="dialog" title="Add New User">
      <n-form :model="newUser" :rules="formRules" ref="formRef">
        <n-form-item label="Name" path="name">
          <n-input v-model:value="newUser.name" placeholder="Enter name" />
        </n-form-item>
        <n-form-item label="Email" path="email">
          <n-input v-model:value="newUser.email" placeholder="Enter email" />
        </n-form-item>
        <n-form-item label="Role" path="role">
          <n-select v-model:value="newUser.role" :options="roleOptions" />
        </n-form-item>
        <n-form-item label="Status" path="status">
          <n-select v-model:value="newUser.status" :options="statusOptions" />
        </n-form-item>
        <n-form-item label="Salary" path="salary">
          <n-input-number v-model:value="newUser.salary" placeholder="Enter salary" />
        </n-form-item>
      </n-form>
      <template #action>
        <n-space>
          <n-button @click="showAddModal = false">Cancel</n-button>
          <n-button type="primary" @click="handleAddUser">Add User</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue'
import { 
  NTag, 
  NButton, 
  NIcon, 
  NAvatar,
  NDropdown,
  useMessage,
  type DataTableColumns,
  type FormRules,
  type FormInst
} from 'naive-ui'
import { 
  AddOutline,
  DownloadOutline,
  RefreshOutline,
  SearchOutline,
  EyeOutline,
  CreateOutline,
  TrashOutline,
  EllipsisVerticalOutline
} from '@vicons/ionicons5'

const message = useMessage()
const formRef = ref<FormInst | null>(null)

type User = {
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

const loading = ref(false)
const searchText = ref('')
const statusFilter = ref<string | null>(null)
const roleFilter = ref<string | null>(null)
const showAddModal = ref(false)

const pagination = ref({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 50, 100]
})

const newUser = ref<User>({
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

const formRules: FormRules = {
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

const statusOptions = [
  { label: 'Active', value: 'Active' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Inactive', value: 'Inactive' }
]

const roleOptions = [
  { label: 'Admin', value: 'Admin' },
  { label: 'Manager', value: 'Manager' },
  { label: 'Developer', value: 'Developer' },
  { label: 'Designer', value: 'Designer' },
  { label: 'Marketing', value: 'Marketing' }
]

const allData = ref<User[]>([
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=1', joinDate: '2023-01-15', salary: 75000, department: 'IT', location: 'New York' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=5', joinDate: '2023-02-20', salary: 65000, department: 'IT', location: 'San Francisco' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Designer', status: 'Pending', avatar: 'https://i.pravatar.cc/150?img=3', joinDate: '2023-03-10', salary: 55000, department: 'Design', location: 'Chicago' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=9', joinDate: '2023-04-05', salary: 70000, department: 'Management', location: 'Boston' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Developer', status: 'Inactive', avatar: 'https://i.pravatar.cc/150?img=7', joinDate: '2023-05-12', salary: 62000, department: 'IT', location: 'Seattle' },
  { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'Marketing', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=11', joinDate: '2023-06-18', salary: 58000, department: 'Marketing', location: 'Los Angeles' },
  { id: 7, name: 'Edward Norton', email: 'edward@example.com', role: 'Developer', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=13', joinDate: '2023-07-22', salary: 68000, department: 'IT', location: 'Austin' },
  { id: 8, name: 'Fiona Green', email: 'fiona@example.com', role: 'Designer', status: 'Pending', avatar: 'https://i.pravatar.cc/150?img=15', joinDate: '2023-08-30', salary: 52000, department: 'Design', location: 'Portland' }
])

const columns: DataTableColumns<User> = [
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
      const colors: Record<string, 'error' | 'warning' | 'info' | 'success' | 'default'> = {
        Admin: 'error',
        Manager: 'warning',
        Developer: 'info',
        Designer: 'success',
        Marketing: 'default'
      }
      return h(NTag, {
        type: colors[row.role],
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
      return h(NTag, {
        type: row.status === 'Active' ? 'success' : row.status === 'Pending' ? 'warning' : 'error',
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

const filteredData = computed(() => {
  let data = [...allData.value]
  
  if (searchText.value) {
    const search = searchText.value.toLowerCase()
    data = data.filter(user => 
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      user.role.toLowerCase().includes(search) ||
      user.department.toLowerCase().includes(search)
    )
  }
  
  if (statusFilter.value) {
    data = data.filter(user => user.status === statusFilter.value)
  }
  
  if (roleFilter.value) {
    data = data.filter(user => user.role === roleFilter.value)
  }
  
  pagination.value.itemCount = data.length
  return data
})

const totalUsers = computed(() => allData.value.length)
const activeUsers = computed(() => allData.value.filter(u => u.status === 'Active').length)
const pendingUsers = computed(() => allData.value.filter(u => u.status === 'Pending').length)
const inactiveUsers = computed(() => allData.value.filter(u => u.status === 'Inactive').length)

const rowKey = (row: User) => row.id

const handleSearch = () => {
  pagination.value.page = 1
}

const handleFilter = () => {
  pagination.value.page = 1
}

const handlePageChange = (page: number) => {
  pagination.value.page = page
}

const handlePageSizeChange = (pageSize: number) => {
  pagination.value.pageSize = pageSize
  pagination.value.page = 1
}

const handleAction = (action: string, user: User) => {
  switch (action) {
    case 'view':
      message.info(`Viewing user: ${user.name}`)
      break
    case 'edit':
      message.warning(`Editing user: ${user.name}`)
      break
    case 'delete':
      message.error(`Deleting user: ${user.name}`)
      break
  }
}

const handleAddUser = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      const newId = Math.max(...allData.value.map(u => u.id)) + 1
      const userToAdd = {
        ...newUser.value,
        id: newId,
        avatar: `https://i.pravatar.cc/150?img=${newId + 20}`
      }
      allData.value.push(userToAdd)
      message.success('User added successfully!')
      showAddModal.value = false
      
      // Reset form
      newUser.value = {
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
      }
    }
  })
}

const refreshData = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    message.success('Data refreshed successfully!')
  }, 1000)
}

const exportData = () => {
  message.info('Exporting data to CSV...')
}
</script>

<style scoped>
.data-table {
  display: flex;
  flex-direction: column;
  gap: 16px;
}



.mb-4 {
  margin-bottom: 16px;
}

.mt-6 {
  margin-top: 24px;
}
</style>
