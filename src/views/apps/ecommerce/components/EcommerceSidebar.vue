<script lang="ts" setup>
import { onMounted, ref } from "vue";
import {
  CATEGORY_OPTIONS,
  STATUS_OPTIONS,
  PRICE_RANGE_OPTIONS,
  NAVIGATION_OPTIONS,
} from "../constants";
import { useEcommerceStore } from "../store";

const ecommerceStore = useEcommerceStore();

const filters = ref({
  category: null,
  status: null,
  priceRange: null,
});

const stats = ref({
  totalProducts: 1248,
  activeOrders: 67,
  revenueToday: 12458,
  newCustomers: 23,
});

const applyFilters = () => {
  console.log("Applying filters:", filters.value);
};

const refreshData = () => {
  // Simulate data refresh
  stats.value = {
    totalProducts: Math.floor(Math.random() * 2000) + 1000,
    activeOrders: Math.floor(Math.random() * 100) + 20,
    revenueToday: Math.floor(Math.random() * 20000) + 5000,
    newCustomers: Math.floor(Math.random() * 50) + 10,
  };
};

onMounted(() => {
  refreshData();
});
</script>

<template>
  <n-card title="E-commerce Tools" class="sidebar-card">
    <n-space vertical size="large">
      <!-- Navigation -->
      <div class="nav-section">
        <h4>Navigation</h4>
        <n-button-group vertical size="large" style="width: 100%">
          <n-button
            v-for="nav in NAVIGATION_OPTIONS"
            :key="nav.value"
            :type="
              ecommerceStore.currentView === nav.value ? 'primary' : 'default'
            "
            @click="ecommerceStore.currentView = nav.value"
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
            <n-tag type="info" size="small">{{ stats.totalProducts }}</n-tag>
          </div>
          <div class="stat-item">
            <span class="stat-label">Active Orders</span>
            <n-tag type="success" size="small">{{ stats.activeOrders }}</n-tag>
          </div>
          <div class="stat-item">
            <span class="stat-label">Revenue Today</span>
            <n-tag type="warning" size="small"
              >${{ stats.revenueToday.toLocaleString() }}</n-tag
            >
          </div>
          <div class="stat-item">
            <span class="stat-label">New Customers</span>
            <n-tag type="error" size="small">{{ stats.newCustomers }}</n-tag>
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
            :options="CATEGORY_OPTIONS"
            clearable
          />
          <n-select
            v-model:value="filters.status"
            placeholder="Select Status"
            :options="STATUS_OPTIONS"
            clearable
          />
          <n-select
            v-model:value="filters.priceRange"
            placeholder="Price Range"
            :options="PRICE_RANGE_OPTIONS"
            clearable
          />
          <n-button @click="applyFilters" type="primary" block>
            Apply Filters
          </n-button>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>

<style scoped>
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
</style>

