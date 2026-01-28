<script setup lang="ts">
import { CreateOutline, TrashOutline } from "@vicons/ionicons5";
import { useProductFilter } from "../composables/useProductFilter";
import { useActions } from "../composables/useActions";

const { filteredProducts, getStockClass } = useProductFilter();
const { viewProduct, editProduct, deleteProduct } = useActions();
</script>

<template>
  <div class="products-grid">
    <n-card
      v-for="product in filteredProducts"
      :key="product.id"
      class="product-card"
      hoverable
      @click="viewProduct(product)"
    >
      <div class="product-image">
        <img :src="product.image" :alt="product.name" />
        <div class="product-badges">
          <n-tag v-if="product.isNew" type="success" size="small">New</n-tag>
          <n-tag v-if="product.isOnSale" type="warning" size="small"
            >Sale</n-tag
          >
          <n-tag v-if="product.stock === 0" type="error" size="small"
            >Out of Stock</n-tag
          >
        </div>
      </div>

      <div class="product-info">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-category">{{ product.category }}</p>
        <div class="product-price">
          <span v-if="product.isOnSale" class="original-price"
            >${{ product.price }}</span
          >
          <span class="current-price"
            >${{ product.salePrice || product.price }}</span
          >
        </div>
        <div class="product-stock">
          <span :class="getStockClass(product.stock)">
            {{ product.stock }} in stock
          </span>
        </div>
      </div>

      <div class="product-actions">
        <n-space>
          <n-button size="small" @click.stop="editProduct(product)">
            <template #icon>
              <n-icon><CreateOutline /></n-icon>
            </template>
          </n-button>
          <n-button
            size="small"
            type="error"
            @click.stop="deleteProduct(product)"
          >
            <template #icon>
              <n-icon><TrashOutline /></n-icon>
            </template>
          </n-button>
        </n-space>
      </div>
    </n-card>
  </div>
</template>

<style scoped>
@import url("../styles/product-list.scss");
</style>
