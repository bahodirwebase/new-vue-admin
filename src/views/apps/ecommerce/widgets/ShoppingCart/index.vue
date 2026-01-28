<script setup lang="ts">
import { useEcommerceStore } from "../../store";
import { useShoppingCartStore } from "./store";

import CartItems from "./components/CartItems.vue";
import OrderSummary from "./components/OrderSummary.vue";
import RecommendedProducts from "./components/RecommendedProducts.vue";

const store = useEcommerceStore();
const shoppingCartStore = useShoppingCartStore();

</script>
<template>
  <div class="shopping-cart">
    <!-- Empty Cart -->
    <div v-if="shoppingCartStore.cartItems.length === 0" class="empty-cart">
      <n-empty description="Your cart is empty">
        <template #extra>
          <n-button type="primary" @click="store.continueShopping">
            Start Shopping
          </n-button>
        </template>
      </n-empty>
    </div>

    <!-- Cart Content -->
    <div v-else class="cart-content">
      <n-grid :cols="3" :x-gap="24">
        <!-- Cart Items -->
        <n-gi :span="2">
          <CartItems />
        </n-gi>

        <!-- Order Summary -->
        <n-gi>
          <OrderSummary />
        </n-gi>
      </n-grid>
    </div>

    <!-- Recommended Products -->
    <RecommendedProducts />
  </div>
</template>
<style scoped>
@import "./styles/shopping-cart.css";
</style>
