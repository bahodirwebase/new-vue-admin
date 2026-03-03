<script setup lang="ts">
import PageHeader from "@/components/custom/PageHeader.vue"
import BasicTransfer from './widgets/BasicTransfer.vue'
import SearchTransfer from './widgets/SearchTransfer.vue'
import MultipleTransfer from './widgets/MultipleTransfer.vue'
import CustomTransfer from './widgets/CustomTransfer.vue'
import DisabledTransfer from './widgets/DisabledTransfer.vue'
import PaginationTransfer from './widgets/PaginationTransfer.vue'
import TeamTransfer from './widgets/TeamTransfer.vue'
</script>

<template>
  <div class="transfer-demo p-0">
    <n-space vertical :size="18">
      <PageHeader title="Transfer" subtitle="Advanced transfer components with search, pagination, and custom item rendering" />
      
      <n-grid cols="1 sm:2" responsive="screen" :x-gap="12">
        <n-gi>
          <BasicTransfer />
          <SearchTransfer />
          <MultipleTransfer />
          <CustomTransfer />
        </n-gi>
        <n-gi>
          <DisabledTransfer />
          <PaginationTransfer />
          <TeamTransfer />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<style scoped>
</style>
