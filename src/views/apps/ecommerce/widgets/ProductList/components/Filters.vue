<script setup lang="ts">
import { SearchOutline, RefreshOutline } from "@vicons/ionicons5";
import {
  categoryOptions,
  statusOptions,
  sortOptions,
} from "../../../constants";
import { useEcommerceStore } from "../../../store";

const store = useEcommerceStore();

const handleSearch = () => {
  store.pagination.page = 1;
};

const handleFilterChange = () => {
  store.pagination.page = 1;
};

const handleSort = () => {
  store.pagination.page = 1;
};

const resetFilters = () => {
  store.searchQuery = "";
  store.selectedCategory = null;
  store.selectedStatus = null;
  store.sortBy = "name";
  store.pagination.page = 1;
};
</script>

<template>
  <n-card class="filters-card">
    <n-space align="center" wrap>
      <n-input
        v-model:value="store.searchQuery"
        placeholder="Search products..."
        style="width: 300px"
        clearable
        @input="handleSearch"
      >
        <template #prefix>
          <n-icon><SearchOutline /></n-icon>
        </template>
      </n-input>

      <n-select
        v-model:value="store.selectedCategory"
        placeholder="Category"
        :options="categoryOptions"
        style="width: 150px"
        clearable
        @update:value="handleFilterChange"
      />

      <n-select
        v-model:value="store.selectedStatus"
        placeholder="Status"
        :options="statusOptions"
        style="width: 120px"
        clearable
        @update:value="handleFilterChange"
      />

      <n-select
        v-model:value="store.sortBy"
        placeholder="Sort by"
        :options="sortOptions"
        style="width: 150px"
        @update:value="handleSort"
      />

      <n-button @click="resetFilters">
        <template #icon>
          <n-icon><RefreshOutline /></n-icon>
        </template>
        Reset
      </n-button>
    </n-space>
  </n-card>
</template>

<style scoped>
.filters-card {
  margin-bottom: 24px;
}
@media (max-width: 768px) {
  .filters-card :deep(.n-space) {
    flex-direction: column;
    align-items: stretch;
  }

  .filters-card :deep(.n-input),
  .filters-card :deep(.n-select) {
    width: 100% !important;
  }
}
</style>
