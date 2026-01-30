<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  NCard, 
  NSpace, 
  NButton, 
  NIcon, 
  useMessage
} from 'naive-ui'
import { 
  AddOutline,
  DownloadOutline,
  RefreshOutline
} from '@vicons/ionicons5'

import SearchFilters from './widgets/SearchFilters.vue'
import AdvancedTable from './widgets/AdvancedTable.vue'
import StatisticsGrid from './widgets/StatisticsGrid.vue'
import AddUserModal from './widgets/AddUserModal.vue'

import { 
  SAMPLE_USERS, 
  PAGINATION_CONFIG,
  type User 
} from './constants'

const message = useMessage()

const loading = ref(false)
const searchText = ref('')
const statusFilter = ref<string | null>(null)
const roleFilter = ref<string | null>(null)
const showAddModal = ref(false)
const allData = ref<User[]>(SAMPLE_USERS)
const pagination = ref({ ...PAGINATION_CONFIG })

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

const handleAddUser = (user: User) => {
  const newId = Math.max(...allData.value.map(u => u.id)) + 1
  const userToAdd = {
    ...user,
    id: newId,
    avatar: `https://i.pravatar.cc/150?img=${newId + 20}`
  }
  allData.value.push(userToAdd)
  message.success('User added successfully!')
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

      <SearchFilters 
        v-model:search-text="searchText"
        v-model:status-filter="statusFilter"
        v-model:role-filter="roleFilter"
        @search="handleSearch"
        @filter="handleFilter"
      />

      <AdvancedTable 
        :data="filteredData"
        :loading="loading"
        :pagination="pagination"
        @update:page="handlePageChange"
        @update:page-size="handlePageSizeChange"
      />

      <StatisticsGrid 
        :total-users="totalUsers"
        :active-users="activeUsers"
        :pending-users="pendingUsers"
        :inactive-users="inactiveUsers"
      />
    </n-card>

    <AddUserModal 
      v-model:show="showAddModal"
      @add="handleAddUser"
    />
  </div>
</template>

<style lang="scss">
@use './styles/data-table.scss';
</style>
