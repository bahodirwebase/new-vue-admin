<script setup lang="ts">
import { SearchOutline, RefreshOutline } from "@vicons/ionicons5";
import {
  CATEGORY_OPTIONS,
  STATUS_OPTIONS,
  SORT_OPTIONS,
} from "../../../constants";
import { useProductFilter } from "../composables/useProductFilter";

const { pagination, searchQuery, selectedCategory, selectedStatus, sortBy } =
  useProductFilter();

const handleSearch = () => {
  pagination.value.page = 1;
};

const handleFilterChange = () => {
  pagination.value.page = 1;
};

const handleSort = () => {
  pagination.value.page = 1;
};

const resetFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = null;
  selectedStatus.value = null;
  sortBy.value = "name";
  pagination.value.page = 1;
};
</script>

<template>
  <n-card class="filters-card">
    <n-space align="center" wrap>
      <n-input
        v-model:value="searchQuery"
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
        v-model:value="selectedCategory"
        placeholder="Category"
        :options="CATEGORY_OPTIONS"
        style="width: 150px"
        clearable
        @update:value="handleFilterChange"
      />

      <n-select
        v-model:value="selectedStatus"
        placeholder="Status"
        :options="STATUS_OPTIONS"
        style="width: 120px"
        clearable
        @update:value="handleFilterChange"
      />

      <n-select
        v-model:value="sortBy"
        placeholder="Sort by"
        :options="SORT_OPTIONS"
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
    flex-direction: column !important;
    align-items: stretch !important;
  }

  .filters-card :deep(.n-input),
  .filters-card :deep(.n-select) {
    width: 100% !important;
  }
}
</style>
