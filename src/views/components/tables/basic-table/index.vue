<script setup lang="ts">
import { NSpace, NCard, NButton, NIcon, useMessage } from 'naive-ui'
import { RefreshOutline } from '@vicons/ionicons5'

import PageHeader from "@/components/custom/PageHeader.vue";
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
    <n-space vertical :size="18">
      <PageHeader title="Basic Table" subtitle="Simple and styled table components with various layout options" />
      
      <n-card class="table-card">
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
    </n-space>
  </div>
</template>

<style lang="scss">
@use './styles/basic-table.scss';

</style>
