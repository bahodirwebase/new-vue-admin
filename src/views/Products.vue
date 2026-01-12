<template>
  <div class="products-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Products</h1>
        <p class="page-subtitle">Manage your products</p>
      </div>

      <n-card title="Product List">
        <n-grid :cols="4" :x-gap="16" :y-gap="16">
          <n-grid-item v-for="product in products" :key="product.id">
            <n-card hoverable>
              <div class="product-card">
                <div class="product-image">
                  <n-icon :component="CubeOutline" :size="48" color="#6366f1" />
                </div>
                <h3 class="product-title">{{ product.name }}</h3>
                <p class="product-price">${{ product.price }}</p>
                <n-button block type="primary">View Details</n-button>
              </div>
            </n-card>
          </n-grid-item>
        </n-grid>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CubeOutline } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'

const products = ref([
  { id: 1, name: 'Product 1', price: 99.99 },
  { id: 2, name: 'Product 2', price: 149.99 },
  { id: 3, name: 'Product 3', price: 199.99 },
  { id: 4, name: 'Product 4', price: 249.99 }
])
</script>

<style scoped>
.products-page {
  max-width: 100%;
}

.page-header {
  margin-bottom: 8px;
}

.page-title {
  font-family: var(--font-secondary);
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
}

.product-card {
  text-align: center;
}

.product-image {
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
}

.product-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.product-price {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 16px;
}
</style>
