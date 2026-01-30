<template>
  <n-card title="Pagination Examples">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Table Pagination
        </h3>
        <n-pagination
          v-model:page="tablePage"
          :item-count="tableTotal"
          :page-size="tablePageSize"
          show-size-picker
          :page-sizes="[5, 10, 20]"
        />
        <p class="page-indicator" style="margin-top: 8px">
          Displaying {{ (tablePage - 1) * tablePageSize + 1 }}-{{
            Math.min(tablePage * tablePageSize, tableTotal)
          }}
          of {{ tableTotal }} records
        </p>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Compact Pagination
        </h3>
        <n-pagination
          v-model:page="compactPage"
          :page-count="25"
          simple
        />
      </div>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tablePage = ref(1)
const tablePageSize = ref(10)
const tableTotal = ref(100)
const compactPage = ref(1)
</script>

<style scoped>
.page-indicator {
  color: var(--text-secondary);
  font-size: 14px;
}
</style>
