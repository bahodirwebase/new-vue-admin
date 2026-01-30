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
    <n-space vertical :size="24">
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
</style>
