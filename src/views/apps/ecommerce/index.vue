<template>
  <div class="ecommerce-app">
    <!-- Header -->
    <header class="ecommerce-header">
      <div class="header-content">
        <h2>E-commerce ( {{ currentView }} Product Management)</h2>
        <p>Manage your inventory, pricing, and product details</p>
      </div>
      <div class="header-actions">
        <n-space>
          <n-button-group>
            <n-button
              :type="ecommerceStore.viewMode === 'grid' ? 'primary' : 'default'"
              @click="ecommerceStore.viewMode = 'grid'"
            >
              <template #icon>
                <n-icon><GridOutline /></n-icon>
              </template>
            </n-button>
            <n-button
              :type="ecommerceStore.viewMode === 'list' ? 'primary' : 'default'"
              @click="ecommerceStore.viewMode = 'list'"
            >
              <template #icon>
                <n-icon><ListOutline /></n-icon>
              </template>
            </n-button>
          </n-button-group>
          <n-button @click="ecommerceStore.exportProducts">
            <template #icon>
              <n-icon><DownloadOutline /></n-icon>
            </template>
            Export
          </n-button>
          <n-button type="primary" @click="ecommerceStore.showAddProductModal = true">
            <template #icon>
              <n-icon><AddOutline /></n-icon>
            </template>
            Add Product
          </n-button>
        </n-space>
      </div>
    </header>

    <!-- Main Content -->
    <main class="ecommerce-main">
      <!-- Sidebar -->
      <aside class="ecommerce-sidebar">
        <n-card title="E-commerce Tools" class="sidebar-card">
          <n-space vertical size="large">
            <!-- Navigation -->
            <div class="nav-section">
              <h4>Navigation</h4>
              <n-button-group vertical size="large" style="width: 100%">
                <n-button
                  v-for="nav in navigationOptions"
                  :key="nav.value"
                  :type="currentView === nav.value ? 'primary' : 'default'"
                  @click="currentView = nav.value"
                  style="width: 100%; justify-content: flex-start"
                >
                  <template #icon>
                    <n-icon :component="nav.icon" />
                  </template>
                  {{ nav.label }}
                </n-button>
              </n-button-group>
            </div>

            <!-- Quick Stats -->
            <div class="stats-section">
              <h4>Quick Stats</h4>
              <n-space vertical size="medium">
                <div class="stat-item">
                  <span class="stat-label">Total Products</span>
                  <n-tag type="info" size="small">{{
                    stats.totalProducts
                  }}</n-tag>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Active Orders</span>
                  <n-tag type="success" size="small">{{
                    stats.activeOrders
                  }}</n-tag>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Revenue Today</span>
                  <n-tag type="warning" size="small"
                    >${{ stats.revenueToday.toLocaleString() }}</n-tag
                  >
                </div>
                <div class="stat-item">
                  <span class="stat-label">New Customers</span>
                  <n-tag type="error" size="small">{{
                    stats.newCustomers
                  }}</n-tag>
                </div>
              </n-space>
            </div>

            <!-- Filters -->
            <div class="filters-section">
              <h4>Filters</h4>
              <n-space vertical size="medium">
                <n-select
                  v-model:value="filters.category"
                  placeholder="Select Category"
                  :options="categoryOptions"
                  clearable
                />
                <n-select
                  v-model:value="filters.status"
                  placeholder="Select Status"
                  :options="statusOptions"
                  clearable
                />
                <n-select
                  v-model:value="filters.priceRange"
                  placeholder="Price Range"
                  :options="priceRangeOptions"
                  clearable
                />
                <n-button @click="applyFilters" type="primary" block>
                  Apply Filters
                </n-button>
              </n-space>
            </div>
          </n-space>
        </n-card>
      </aside>

      <!-- Content Area -->
      <div class="content-area">
        <component :is="currentComponent" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  GridOutline,
  CartOutline,
  PeopleOutline,
  BarChartOutline,
  SettingsOutline,
  DownloadOutline,
  AddOutline,
  ListOutline
} from "@vicons/ionicons5";
import ProductList from "./components/ProductList.vue";
import ProductDetail from "./components/ProductDetail.vue";
import ShoppingCart from "./components/ShoppingCart.vue";
import Checkout from "./components/Checkout.vue";
import { useEcommerceStore } from "./store";

const currentView = ref("products");

const ecommerceStore = useEcommerceStore();

const navigationOptions = [
  { label: "Products", value: "products", icon: GridOutline },
  { label: "Shopping Cart", value: "cart", icon: CartOutline },
  { label: "Checkout", value: "checkout", icon: SettingsOutline },
  { label: "Orders", value: "orders", icon: CartOutline },
  { label: "Customers", value: "customers", icon: PeopleOutline },
  { label: "Analytics", value: "analytics", icon: BarChartOutline },
  { label: "Settings", value: "settings", icon: SettingsOutline },
];

const stats = ref({
  totalProducts: 1248,
  activeOrders: 67,
  revenueToday: 12458,
  newCustomers: 23,
});

const filters = ref({
  category: null,
  status: null,
  priceRange: null,
});

const categoryOptions = [
  { label: "Electronics", value: "electronics" },
  { label: "Clothing", value: "clothing" },
  { label: "Books", value: "books" },
  { label: "Home & Garden", value: "home" },
  { label: "Sports", value: "sports" },
];

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Out of Stock", value: "out_of_stock" },
  { label: "Discontinued", value: "discontinued" },
];

const priceRangeOptions = [
  { label: "$0 - $50", value: "0-50" },
  { label: "$50 - $100", value: "50-100" },
  { label: "$100 - $500", value: "100-500" },
  { label: "$500+", value: "500+" },
];

const currentComponent = computed(() => {
  switch (currentView.value) {
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

const refreshData = () => {
  // Simulate data refresh
  stats.value = {
    totalProducts: Math.floor(Math.random() * 2000) + 1000,
    activeOrders: Math.floor(Math.random() * 100) + 20,
    revenueToday: Math.floor(Math.random() * 20000) + 5000,
    newCustomers: Math.floor(Math.random() * 50) + 10,
  };
};

const applyFilters = () => {
  console.log("Applying filters:", filters.value);
};

onMounted(() => {
  refreshData();
});
</script>

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

.header-left h1 {
  margin: 0 0 4px 0;
  font-size: 24px;
  font-weight: 600;
  color: var(--n-text-color-1);
}

.header-left p {
  margin: 0;
  color: var(--n-text-color-3);
  font-size: 14px;
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

.nav-section h4,
.stats-section h4,
.filters-section h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--n-text-color-2);
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.stat-label {
  font-size: 13px;
  color: var(--n-text-color-2);
}

.content-area {
  flex: 1;
  overflow-y: auto;
  margin-left: 24px;
  border-radius: 12px;
}

@media (max-width: 768px) {
  .ecommerce-header {
    padding: 16px;
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
}
</style>
