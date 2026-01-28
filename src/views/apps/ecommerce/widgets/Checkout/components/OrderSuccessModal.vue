<script lang="ts" setup>
import { CheckmarkCircleOutline } from "@vicons/ionicons5";
import { useCheckoutStore } from "../store";
import { useRouter } from "vue-router";

const checkoutStore = useCheckoutStore();
const router = useRouter();

const continueShopping = () => {
  router.push("/apps/ecommerce");
};
const viewOrder = () => {
  // TODO: Navigate to order details
  console.log("View order:", checkoutStore.orderNumber);
};
</script>
<template>
  <n-modal v-model:show="checkoutStore.showSuccessModal" preset="dialog">
    <template #header>
      <div class="d-flex flex-column align-center gap-4">
        <n-icon size="48" color="#18a058">
          <CheckmarkCircleOutline />
        </n-icon>
        <h3 class="success-header-title font-weight-600 m-0">Order Placed Successfully!</h3>
      </div>
    </template>
    <div class="success-content">
      <p>
        Thank you for your order! Your order number is
        <strong>#{{ checkoutStore.orderNumber }}</strong
        >.
      </p>
      <p>
        You will receive a confirmation email shortly with your order details.
      </p>
    </div>
    <template #action>
      <n-space>
        <n-button @click="continueShopping">Continue Shopping</n-button>
        <n-button type="primary" @click="viewOrder">View Order</n-button>
      </n-space>
    </template>
  </n-modal>
</template>