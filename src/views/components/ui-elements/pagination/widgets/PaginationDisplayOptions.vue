<template>
  <n-card title="Pagination Display Options">
    <n-space vertical :size="16">
      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Show Previous/Next
        </h3>
        <div class="pagination-container">
          <n-pagination
            v-model:page="pageNav"
            :page-count="10"
            show-prev
            :page-slot="7"
          />
        </div>
      </div>

      <div>
        <h3 style="margin-bottom: 12px; color: var(--text-primary)">
          Custom Button Text
        </h3>
        <div class="pagination-container">
          <n-pagination :page-count="101" :page-slot="7">
            <template #prev> <span style="white-space: nowrap">Go Prev</span> </template>
            <template #next> <span style="white-space: nowrap">Go Next</span> </template>
          </n-pagination>
        </div>
      </div>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const pageNav = ref(1)
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
  
  :deep(.n-pagination .n-button) {
    padding: 0 8px;
    font-size: 12px;
  }
}
</style>
