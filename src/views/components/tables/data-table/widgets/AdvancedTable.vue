<script setup lang="ts">
import { NDataTable } from 'naive-ui'
import { TABLE_COLUMNS } from '../constants'

interface Props {
  data: any[]
  loading: boolean
  pagination: any
}

defineProps<Props>()

const emit = defineEmits<{
  'update:page': [page: number]
  'update:page-size': [pageSize: number]
}>()

const handlePageChange = (page: number) => {
  emit('update:page', page)
}

const handlePageSizeChange = (pageSize: number) => {
  emit('update:page-size', pageSize)
}
</script>

<template>
  <n-data-table
    :columns="TABLE_COLUMNS"
    :data="data"
    :pagination="pagination"
    :loading="loading"
    :bordered="true"
    :striped="true"
    :row-key="(row: any) => row.id"
    @update:page="handlePageChange"
    @update:page-size="handlePageSizeChange"
  />
</template>
