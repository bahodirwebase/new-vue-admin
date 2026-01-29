<script setup lang="ts">
import { NDataTable } from 'naive-ui'
import { STYLED_COLUMNS, STYLED_SAMPLE_DATA } from '../constants'

const rowClassName = (row: any) => {
  if (row.status === 'Inactive') return 'inactive-row'
  if (row.role === 'Admin') return 'admin-row'
  return ''
}
</script>

<template>
  <div class="table-variant">
    <h4 class="variant-title">Table with Custom Styles</h4>
    <n-data-table
      :columns="STYLED_COLUMNS"
      :data="STYLED_SAMPLE_DATA"
      :pagination="false"
      :row-class-name="rowClassName"
    />
  </div>
</template>
