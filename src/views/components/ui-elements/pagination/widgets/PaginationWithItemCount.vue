<template>
  <n-card title="Pagination with Item Count">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Show Total
        </h3>
        <div class="pagination-container">
          <n-pagination
            v-model:page="pageTotal"
            :item-count="totalItems"
            :page-size="itemsPerPage"
            show-size-picker
            :page-sizes="[10, 20, 50, 100]"
            :page-slot="6"
          />
        </div>
      </div>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const pageTotal = ref(1)
const totalItems = ref(250)
const itemsPerPage = ref(20)
</script>

<style scoped>
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
  :deep(.n-pagination) {
    justify-content: center;
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
