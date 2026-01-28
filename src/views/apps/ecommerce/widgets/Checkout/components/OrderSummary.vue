<script lang="ts" setup>
import { useCheckout } from "../composables/useCheckout";

const { totalItems, subtotal, shipping, tax, discount, total } = useCheckout();
</script>
<template>
  <n-card title="Order Summary" class="order-summary-card">
    <div class="summary-content">
      <div class="summary-row">
        <span>Subtotal ({{ totalItems }} items)</span>
        <span>${{ subtotal.toFixed(2) }}</span>
      </div>

      <div class="summary-row">
        <span>Shipping</span>
        <span>${{ shipping.toFixed(2) }}</span>
      </div>

      <div class="summary-row">
        <span>Tax</span>
        <span>${{ tax.toFixed(2) }}</span>
      </div>

      <div v-if="discount > 0" class="summary-row discount">
        <span>Discount</span>
        <span>-${{ discount.toFixed(2) }}</span>
      </div>

      <n-divider />

      <div class="summary-row total">
        <span>Total</span>
        <span>${{ total.toFixed(2) }}</span>
      </div>
    </div>
  </n-card>
</template>
