<script setup lang="ts">
import Filters from "./components/Filters.vue";
import ProductModal from "./components/ProductModal.vue";
import ProductTableView from "./components/ProductTableView.vue";
import ProductGridView from "./components/ProductGridView.vue";

import { useEcommerceStore } from "../../store";

const store = useEcommerceStore();
</script>
<template>
  <div class="product-list">
    <!-- Search and Filters -->
    <Filters />

    <!-- Products Display -->
    <div class="products-container">
      <ProductGridView v-if="store.viewMode === 'grid'" />
      <ProductTableView v-else />
    </div>

    <!-- Add/Edit Product Modal -->
    <ProductModal />
  </div>
</template>

<style scoped>

.products-container {
  min-height: 400px;
}
</style>
