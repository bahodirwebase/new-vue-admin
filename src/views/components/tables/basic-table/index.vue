<script setup lang="ts">
import { NSpace, NCard, NButton, NIcon, useMessage } from 'naive-ui'
import { RefreshOutline } from '@vicons/ionicons5'

import SimpleTable from './widgets/SimpleTable.vue'
import BorderedTable from './widgets/BorderedTable.vue'
import StripedTable from './widgets/StripedTable.vue'
import SmallTable from './widgets/SmallTable.vue'
import StyledTable from './widgets/StyledTable.vue'

const message = useMessage()

const refreshData = () => {
  message.success('Data refreshed successfully!')
}
</script>

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

      <n-space vertical :size="24">
        <SimpleTable />
        <BorderedTable />
        <StripedTable />
        <SmallTable />
        <StyledTable />
      </n-space>
    </n-card>
  </div>
</template>

<style>
@import './styles/basic-table.scss';
</style>
