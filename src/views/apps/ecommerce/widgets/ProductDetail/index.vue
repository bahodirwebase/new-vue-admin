<script setup lang="ts">
import { ref, onMounted } from "vue";

import HeaderActions from "./components/HeaderActions.vue";
import ProductOverview from "./components/ProductOverview.vue";
import ProductTabs from "./components/ProductTabs.vue";
import EmptyProduct from "./components/EmptyProduct.vue";
import { useProductDetailStore } from "./store";

const productDetailStore = useProductDetailStore();
const loading = ref(true);

onMounted(() => {
  // Simulate loading
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});
</script>
<template>
  <div class="product-detail">
    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <n-spin size="large">
        <template #description>Loading product details...</template>
      </n-spin>
    </div>

    <!-- Product Content -->
    <div v-else-if="productDetailStore.product" class="product-content">
      <!-- Header Actions -->
      <HeaderActions />

      <!-- Product Overview -->
      <ProductOverview :product="productDetailStore.product" />

      <!-- Product Tabs -->
      <ProductTabs :product="productDetailStore.product" />
    </div>

    <!-- Not Found State -->
    <div v-else class="not-found">
      <EmptyProduct />
    </div>

    <!-- Delete Confirmation Modal -->
  </div>
</template>
<style lang="scss">
@use "./styles/product-detail.scss";
</style>
