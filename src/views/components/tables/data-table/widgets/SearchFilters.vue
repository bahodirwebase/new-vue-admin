<script setup lang="ts">
import { NSpace, NInput, NSelect, NIcon } from 'naive-ui'
import { SearchOutline } from '@vicons/ionicons5'
import { STATUS_OPTIONS, ROLE_OPTIONS } from '../constants'

const searchText = defineModel<string>('searchText')
const statusFilter = defineModel<string | null>('statusFilter')
const roleFilter = defineModel<string | null>('roleFilter')

const emit = defineEmits<{
  search: []
  filter: []
}>()

const handleSearch = () => {
  emit('search')
}

const handleFilter = () => {
  emit('filter')
}
</script>

<template>
  <n-space class="search-filter-section mb-4">
    <n-input
      v-model:value="searchText"
      placeholder="Search users..."
      clearable
      class="search-input"
      @input="handleSearch"
    >
      <template #prefix>
        <n-icon :component="SearchOutline" />
      </template>
    </n-input>
    
    <n-select
      v-model:value="statusFilter"
      placeholder="Filter by status"
      :options="STATUS_OPTIONS"
      clearable
      class="filter-select"
      @update:value="handleFilter"
    />
    
    <n-select
      v-model:value="roleFilter"
      placeholder="Filter by role"
      :options="ROLE_OPTIONS"
      clearable
      class="filter-select"
      @update:value="handleFilter"
    />
  </n-space>
</template>
