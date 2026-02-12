<script setup lang="ts">
import { ref, computed } from 'vue'

const pageSimple = ref(1)
const pageJumper = ref(1)
const pageSize = ref(1)
const pageSizeValue = ref(10)

const totalPages = computed(() => Math.ceil(100 / pageSizeValue.value))

const handlePageSizeChange = (size: number) => {
  pageSizeValue.value = size
  pageSize.value = 1
}
</script>

<template>
  <n-card title="Pagination Styles">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Simple Style
        </h3>
        <div class="pagination-container">
          <n-pagination v-model:page="pageSimple" :page-count="15" simple />
        </div>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          With Quick Jumper
        </h3>
        <div class="pagination-container">
          <n-pagination v-model:page="pageJumper" :page-count="50" show-quick-jumper show-size-picker
            :page-sizes="[10, 20, 30, 50]" :page-slot="5" />
        </div>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          With Page Size Selector
        </h3>
        <div class="pagination-container">
          <n-pagination v-model:page="pageSize" :page-count="totalPages" :page-size="pageSizeValue"
            :page-sizes="[5, 10, 20, 50]" show-size-picker @update:page-size="handlePageSizeChange" :page-slot="6" />
        </div>
        <span class="page-indicator" style="display: block; margin-top: 8px">
          Showing {{ (pageSize - 1) * pageSizeValue + 1 }}-{{
            Math.min(pageSize * pageSizeValue, 100)
          }}
          of 100 items
        </span>
      </div>
    </n-space>
  </n-card>
</template>

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

  :deep(.n-input-number) {
    min-width: 60px;
  }
}
</style>
