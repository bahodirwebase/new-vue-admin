<script setup lang="ts">
import { computed } from "vue";
import {
  GridOutline,
  DownloadOutline,
  AddOutline,
  ListOutline,
  ArrowBackOutline,
  FilterOutline,
} from "@vicons/ionicons5";

import ProductList from "./widgets/ProductList/index.vue";
import ProductDetail from "./widgets/ProductDetail/index.vue";
import ShoppingCart from "./widgets/ShoppingCart/index.vue";
import Checkout from "./widgets/Checkout/index.vue";
import EcommerceSidebar from "./components/EcommerceSidebar.vue";
import { useBreakpoints } from "@/composables/useBreakpoints";
import { useEcommerceStore } from "./store";

const ecommerceStore = useEcommerceStore();
const { isDesktop } = useBreakpoints();

const currentComponent = computed(() => {
  switch (ecommerceStore.currentView) {
    case "products":
      return ProductList;
    case "product-detail":
      return ProductDetail;
    case "cart":
      return ShoppingCart;
    case "checkout":
      return Checkout;
    default:
      return ProductList;
  }
});

const getCurrentViewLabel = computed(() => {
  switch (ecommerceStore.currentView) {
    case "products":
      return "Product Management";
    case "product-detail":
      return "Product Detail";
    case "cart":
      return "Shopping Cart";
    case "checkout":
      return "Checkout";
    default:
      return "Product Management";
  }
});
</script>
<template>
  <div class="ecommerce-app">
    <!-- Header -->
    <header class="ecommerce-header">
      <div class="header-content">
        <h2>E-commerce ( {{ getCurrentViewLabel }} )</h2>
        <p>Manage your inventory, pricing, and product details</p>
      </div>
      <div class="header-actions">
        <n-space>
          <n-button
            @click="ecommerceStore.goBack"
            v-if="ecommerceStore.currentView === 'checkout'"
          >
            <template #icon>
              <n-icon>
                <ArrowBackOutline />
              </n-icon>
            </template>
            Back to Cart
          </n-button>
          <n-button
            @click="ecommerceStore.continueShopping"
            v-if="ecommerceStore.currentView == 'cart'"
          >
            <template #icon>
              <n-icon>
                <ArrowBackOutline />
              </n-icon>
            </template>
            Continue Shopping
          </n-button>
          <template v-if="ecommerceStore.currentView == 'products'">
            <n-button-group>
              <n-button
                :type="
                  ecommerceStore.viewMode === 'grid' ? 'primary' : 'default'
                "
                @click="ecommerceStore.viewMode = 'grid'"
              >
                <template #icon>
                  <n-icon>
                    <GridOutline />
                  </n-icon>
                </template>
              </n-button>
              <n-button
                :type="
                  ecommerceStore.viewMode === 'list' ? 'primary' : 'default'
                "
                @click="ecommerceStore.viewMode = 'list'"
              >
                <template #icon>
                  <n-icon>
                    <ListOutline />
                  </n-icon>
                </template>
              </n-button>
            </n-button-group>
            <n-button @click="ecommerceStore.exportProducts">
              <template #icon>
                <n-icon>
                  <DownloadOutline />
                </n-icon>
              </template>
              Export
            </n-button>
            <n-button
              type="primary"
              @click="ecommerceStore.showAddProductModal = true"
            >
              <template #icon>
                <n-icon>
                  <AddOutline />
                </n-icon>
              </template>
              Add Product
            </n-button>
          </template>
          <n-button
            type="primary"
            @click="ecommerceStore.showFilterModal = true"
            v-if="!isDesktop"
          >
            <template #icon>
              <n-icon>
                <FilterOutline />
              </n-icon>
            </template>
            Filter
          </n-button>
        </n-space>
      </div>
    </header>

    <!-- Main Content -->
    <main class="ecommerce-main">
      <!-- Sidebar -->
      <aside class="ecommerce-sidebar" v-if="isDesktop">
        <EcommerceSidebar />
      </aside>

      <!-- Content Area -->
      <div class="content-area">
        <component :is="currentComponent" />
      </div>
    </main>
    <n-modal v-model:show="ecommerceStore.showFilterModal">
      <EcommerceSidebar />
    </n-modal>
  </div>
</template>

<style scoped>
.ecommerce-app {
  display: flex;
  flex-direction: column;
}

.ecommerce-header {
  padding: 24px 0;
  border-bottom: 1px solid var(--n-border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--n-card-color);
}

.ecommerce-main {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.ecommerce-sidebar {
  width: 280px;
  border-right: 1px solid var(--n-border-color);
  background: var(--n-card-color);
  overflow-y: auto;
}

.content-area {
  flex: 1;
  overflow-y: auto;
  margin-left: 24px;
  border-radius: 12px;
}

@media (max-width: 768px) {
  .ecommerce-header {
    padding: 16px 8px;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  .ecommerce-main {
    flex-direction: column;
  }

  .ecommerce-sidebar {
    width: 100%;
    max-height: 300px;
  }
  .content-area {
    margin-left: 0;
  }
}
</style>
