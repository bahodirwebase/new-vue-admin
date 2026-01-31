<script setup lang="ts">
import BasicTransfer from './widgets/BasicTransfer.vue'
import SearchTransfer from './widgets/SearchTransfer.vue'
import MultipleTransfer from './widgets/MultipleTransfer.vue'
import CustomTransfer from './widgets/CustomTransfer.vue'
import DisabledTransfer from './widgets/DisabledTransfer.vue'
import PaginationTransfer from './widgets/PaginationTransfer.vue'
import TeamTransfer from './widgets/TeamTransfer.vue'
</script>

<template>
  <div class="transfer-demo">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Transfer</h1>
        <p class="page-subtitle">Advanced transfer components with search, pagination, and custom item rendering</p>
      </div>
      
      <n-grid :cols="2" :x-gap="12">
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
.transfer-demo {
  padding: 0;
}

.page-title {
  font-family: var(--font-secondary);
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
}
</style>
