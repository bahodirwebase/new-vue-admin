<template>
  <n-card title="Pagination Examples">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Table Pagination
        </h3>
        <div class="pagination-container">
          <n-pagination
            v-model:page="tablePage"
            :item-count="tableTotal"
            :page-size="tablePageSize"
            show-size-picker
            :page-sizes="[5, 10, 20]"
            :page-slot="7"
          />
        </div>
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
        <div class="pagination-container">
          <n-pagination
            v-model:page="compactPage"
            :page-count="25"
            simple
            :page-slot="7"
          />
        </div>
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

/* Pagination container for horizontal scroll */
.pagination-container {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: var(--n-scrollbar-color) transparent;
}

.pagination-container::-webkit-scrollbar {
  height: 4px;
}

.pagination-container::-webkit-scrollbar-track {
  background: transparent;
}

.pagination-container::-webkit-scrollbar-thumb {
  background-color: var(--n-scrollbar-color);
  border-radius: 2px;
}

/* Mobile responsive styles */
@media (max-width: 768px) {
  .page-indicator {
    font-size: 12px;
    text-align: center;
  }
}

@media (max-width: 480px) {
  :deep(.n-pagination .n-pagination-item) {
    min-width: 32px;
    height: 32px;
    font-size: 12px;
  }
  
  :deep(.n-select) {
    min-width: 80px;
  }
}
</style>
