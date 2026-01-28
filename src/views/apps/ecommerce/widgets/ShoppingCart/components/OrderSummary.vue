<script lang="ts" setup>
import { useShoppingCartStore } from "../store";
import { useShoppingCart } from "../composables/useShoppingCart";
import { useRouter } from "vue-router";

const router = useRouter();
const shoppingCartStore = useShoppingCartStore();
const { totalItems, subtotal, shipping, tax, discount, total } =
  useShoppingCart();

const proceedToCheckout = () => {
  router.push("/apps/ecommerce/checkout");
};
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

      <!-- Promo Code -->
      <div class="promo-section">
        <n-input
          v-model:value="shoppingCartStore.promoCode"
          placeholder="Enter promo code"
          @keyup.enter="shoppingCartStore.applyPromoCode"
        >
          <template #suffix>
            <n-button
              size="small"
              type="primary"
              @click="shoppingCartStore.applyPromoCode"
              :disabled="!shoppingCartStore.promoCode"
            >
              Apply
            </n-button>
          </template>
        </n-input>
      </div>

      <!-- Action Buttons -->
      <div class="checkout-actions">
        <n-button type="primary" size="large" block @click="proceedToCheckout">
          <template #icon>
            <n-icon><CartOutline /></n-icon>
          </template>
          Proceed to Checkout
        </n-button>
      </div>
    </div>
  </n-card>
</template>
