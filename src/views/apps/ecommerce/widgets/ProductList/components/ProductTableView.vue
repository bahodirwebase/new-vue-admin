<script lang="ts" setup>
import { ref } from "vue";
import { useProductFilter } from "../composables/useProductFilter";
import { useTableColumns } from "../composables/useTableColumns";

const { filteredProducts, pagination, handlePageChange } = useProductFilter();

const loading = ref(false);

const { tableColumns } = useTableColumns();
</script>
<template>
  <n-data-table
    :columns="tableColumns"
    :data="filteredProducts"
    :pagination="pagination"
    :loading="loading"
    striped
    @update:page="handlePageChange"
  />
</template>
<style scoped>
@import url("../styles/product-list.css");
</style>
