<script setup lang="ts">
import { provide, ref } from "vue";
import { type FormInst } from "naive-ui";

import ShippingInformation from "./components/ShippingInformation.vue";
import PaymentMethod from "./components/PaymentMethod.vue";
import OrderReview from "./components/OrderReview.vue";
import OrderSummary from "./components/OrderSummary.vue";
import NavigationButtons from "./components/NavigationButtons.vue";
import SecurityBadge from "./components/SecurityBadge.vue";
import OrderSuccessModal from "./components/OrderSuccessModal.vue";

import { STEPS } from "./constants";
import { useCheckoutStore } from "./store";

const checkoutStore = useCheckoutStore();

const shippingFormRef = ref<FormInst | null>(null);
const paymentFormRef = ref<FormInst | null>(null);

const validateShipping = async () => {
  return await shippingFormRef.value?.validate();
};

const validatePayment = async () => {
  return await paymentFormRef.value?.validate();
};

provide("checkoutActions", { validateShipping, validatePayment });
</script>
<template>
  <div class="checkout">
    <!-- Checkout Progress -->
    <div class="checkout-progress">
      <n-steps
        :current="checkoutStore.currentStep"
        :status="checkoutStore.stepStatus"
      >
        <n-step
          v-for="step in STEPS"
          :key="step.key"
          :title="step.title"
          :description="step.description"
        />
      </n-steps>
    </div>

    <!-- Checkout Content -->
    <div class="checkout-content">
      <n-grid cols="1 xs:2 sm:3" :x-gap="24" responsive="screen">
        <!-- Main Form Area -->
        <n-gi :span="2">
          <!-- Step 1: Shipping Information -->
          <n-card
            v-if="checkoutStore.currentStep === 1"
            title="Shipping Information"
            class="step-card"
          >
            <shipping-information ref="shippingFormRef" />
          </n-card>

          <!-- Step 2: Payment Method -->
          <n-card
            v-if="checkoutStore.currentStep === 2"
            title="Payment Method"
            class="step-card"
          >
            <payment-method />
          </n-card>

          <!-- Step 3: Order Review -->
          <n-card
            v-if="checkoutStore.currentStep === 3"
            title="Order Review"
            class="step-card"
          >
            <order-review :current-step="checkoutStore.currentStep" />
          </n-card>

          <!-- Navigation Buttons -->
          <navigation-buttons
            :current-step="checkoutStore.currentStep"
            :step-status="checkoutStore.stepStatus"
          />
        </n-gi>

        <!-- Order Summary Sidebar -->
        <n-gi>
          <order-summary />
          <security-badge />
        </n-gi>
      </n-grid>
    </div>

    <!-- Order Success Modal -->
    <order-success-modal />
  </div>
</template>

<style>
@import "./styles/checkout.scss";
</style>
