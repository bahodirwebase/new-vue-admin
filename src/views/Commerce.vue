<template>
  <div class="commerce-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Commerce Dashboard</h1>
        <p class="page-subtitle">E-commerce analytics and metrics</p>
      </div>

      <n-card title="Commerce Overview">
        <n-grid :cols="4" :x-gap="16" :y-gap="16">
          <n-grid-item>
            <n-statistic label="Total Sales" :value="45678">
              <template #prefix>$</template>
              <template #suffix>
                <span style="color: #10b981; font-size: 14px">+22.1%</span>
              </template>
            </n-statistic>
          </n-grid-item>
          <n-grid-item>
            <n-statistic label="Orders" :value="1234">
              <template #suffix>
                <span style="color: #10b981; font-size: 14px">+18.5%</span>
              </template>
            </n-statistic>
          </n-grid-item>
          <n-grid-item>
            <n-statistic label="Products Sold" :value="5678">
              <template #suffix>
                <span style="color: #f59e0b; font-size: 14px">-2.3%</span>
              </template>
            </n-statistic>
          </n-grid-item>
          <n-grid-item>
            <n-statistic label="Avg. Order Value" :value="37.05">
              <template #prefix>$</template>
            </n-statistic>
          </n-grid-item>
        </n-grid>
      </n-card>

      <n-grid :cols="2" :x-gap="16" :y-gap="16">
        <n-grid-item>
          <n-card title="Sales Performance">
            <SalesChart />
          </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card title="Product Categories">
            <CategoryChart />
          </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card title="Order Status">
            <OrderStatusChart />
          </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card title="Quarterly Revenue">
            <RevenueChart />
          </n-card>
        </n-grid-item>
      </n-grid>

      <n-card title="Recent Orders">
        <n-list>
          <n-list-item v-for="order in orders" :key="order.id">
            <div class="order-item">
              <div class="order-info">
                <div class="order-title">Order #{{ order.id }}</div>
                <div class="order-details">{{ order.customer }} - ${{ order.amount }}</div>
              </div>
              <n-tag :type="order.status === 'Completed' ? 'success' : 'warning'">
                {{ order.status }}
              </n-tag>
            </div>
          </n-list-item>
        </n-list>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SalesChart from '@/components/charts/SalesChart.vue'
import CategoryChart from '@/components/charts/CategoryChart.vue'
import OrderStatusChart from '@/components/charts/OrderStatusChart.vue'
import RevenueChart from '@/components/charts/RevenueChart.vue'

const orders = ref([
  { id: '12345', customer: 'John Doe', amount: 125.50, status: 'Completed' },
  { id: '12346', customer: 'Jane Smith', amount: 89.99, status: 'Pending' },
  { id: '12347', customer: 'Mike Johnson', amount: 234.00, status: 'Completed' },
  { id: '12348', customer: 'Sarah Wilson', amount: 56.75, status: 'Processing' }
])
</script>

<style scoped>
.commerce-page {
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

.order-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.order-info {
  flex: 1;
}

.order-title {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.order-details {
  font-size: 14px;
  color: var(--text-secondary);
}

:deep(.n-card) {
  height: 100%;
}

:deep(.n-card .n-card__content) {
  padding: 16px;
}

@media (max-width: 768px) {
  :deep(.n-grid) {
    grid-template-columns: 1fr !important;
  }
}
</style>
