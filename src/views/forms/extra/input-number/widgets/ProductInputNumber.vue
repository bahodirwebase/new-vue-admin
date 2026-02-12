<script setup lang="ts">
import { ref, computed } from 'vue'

const quantity = ref(1)
const price = ref(99.99)
const discount = ref(10)
const weight = ref(2.5)

const total = computed(() => {
  return (quantity.value || 0) * (price.value || 0)
})

const finalPrice = computed(() => {
  const discountAmount = total.value * ((discount.value || 0) / 100)
  return total.value - discountAmount
})
</script>

<template>
  <n-card title="Real World Example - Product Configuration">
    <n-space vertical :size="16">
      <div class="product-config">
        <n-space vertical :size="12">
          <span>Quantity:</span>
          <n-input-number v-model:value="quantity" :min="1" :max="99" :step="1" />
        </n-space>
        <n-space vertical :size="12">
          <span>Price ($):</span>
          <n-input-number v-model:value="price" :min="0" :precision="2" :step="0.01" />
        </n-space>
        <n-space vertical :size="12">
          <span>Discount (%):</span>
          <n-input-number v-model:value="discount" :min="0" :max="100" :step="1" />
        </n-space>
        <n-space vertical :size="12">
          <span>Weight (kg):</span>
          <n-input-number v-model:value="weight" :min="0" :precision="3" :step="0.1" />
        </n-space>
      </div>
      <div class="calculation-result">
        <n-p><strong>Total: ${{ total.toFixed(2) }}</strong></n-p>
        <n-p><strong>Final Price: ${{ finalPrice.toFixed(2) }}</strong></n-p>
        <n-p><strong>Total Weight: {{ weight }} kg</strong></n-p>
      </div>
    </n-space>
  </n-card>
</template>

<style scoped>
.product-config {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  background: var(--bg-secondary);
  margin-bottom: 16px;
}

.calculation-result {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  background: var(--bg-primary);
}

.calculation-result :deep(.n-p) {
  color: var(--text-primary);
  font-size: 16px;
  margin-bottom: 8px;
}
</style>
