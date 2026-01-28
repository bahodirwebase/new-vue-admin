<script setup lang="ts">
import { provide, ref } from "vue";
import { useRouter } from "vue-router";
import {
  ShieldCheckmarkOutline,
  CheckmarkCircleOutline,
} from "@vicons/ionicons5";
import { type FormInst } from "naive-ui";

import ShippingInformation from "./components/ShippingInformation.vue";
import PaymentMethod from "./components/PaymentMethod.vue";
import OrderReview from "./components/OrderReview.vue";
import OrderSummary from "./components/OrderSummary.vue";
import NavigationButtons from "./components/NavigationButtons.vue";

import { STEPS } from "./constants";
import { useCheckoutStore } from "./store";


const shippingFormRef = ref<FormInst | null>(null);
const paymentFormRef = ref<FormInst | null>(null);

const router = useRouter();
const checkoutStore = useCheckoutStore();

const continueShopping = () => {
  router.push("/apps/ecommerce");
};

const validateShipping = async () => {
  return await shippingFormRef.value?.validate();
};  

const validatePayment = async () => {
  return await paymentFormRef.value?.validate();
};  



provide({ validateShipping, validatePayment });
const viewOrder = () => {
  // TODO: Navigate to order details
  console.log("View order:", checkoutStore.orderNumber);
};
</script>
<template>
  <div class="checkout">
    <!-- Checkout Progress -->
    <div class="checkout-progress">
      <n-steps :current="checkoutStore.currentStep" :status="checkoutStore.stepStatus">
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
        <n-gi :span="2" >
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
          <navigation-buttons :current-step="checkoutStore.currentStep" :step-status="checkoutStore.stepStatus" />
        </n-gi>

        <!-- Order Summary Sidebar -->
        <n-gi>
          
            <order-summary />
          <!-- Security Badge -->
          <n-card class="security-card">
            <div class="security-content">
              <n-icon size="32" color="#18a058">
                <ShieldCheckmarkOutline />
              </n-icon>
              <h4>Secure Checkout</h4>
              <p>
                Your payment information is encrypted and secure. We never store
                your credit card details.
              </p>
            </div>
          </n-card>
        </n-gi>
      </n-grid>
    </div>

    <!-- Order Success Modal -->
    <n-modal v-model:show="checkoutStore.showSuccessModal" preset="dialog">
      <template #header>
        <div class="success-header">
          <n-icon size="48" color="#18a058">
            <CheckmarkCircleOutline />
          </n-icon>
          <h3>Order Placed Successfully!</h3>
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
  </div>
</template>

<style scoped>
.checkout-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  padding: 20px;
  background: var(--n-card-color);
  border-radius: 8px;
}

.header-content h2 {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 600;
  color: var(--n-text-color-1);
}

.header-content p {
  margin: 0;
  color: var(--n-text-color-3);
  font-size: 14px;
}

.checkout-progress {
  margin-bottom: 32px;
  padding: 24px;
  background: var(--n-card-color);
  border-radius: 8px;
}

.step-card {
  margin-bottom: 24px;
}

.step-navigation {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}

.order-review {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.review-section h4 {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--n-text-color-1);
}

.address-review,
.payment-review {
  padding: 16px;
  background: var(--n-color);
  border: 1px solid var(--n-border-color);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.address-review p,
.payment-review p {
  margin: 0;
  line-height: 1.6;
  color: var(--n-text-color-2);
}

.items-review {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.review-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--n-color);
  border: 1px solid var(--n-border-color);
  border-radius: 8px;
}

.review-item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-name {
  font-weight: 500;
  color: var(--n-text-color-1);
}

.item-quantity {
  font-size: 14px;
  color: var(--n-text-color-3);
}

.item-price {
  font-weight: 600;
  color: var(--n-text-color-1);
}

.order-summary-card {
  position: sticky;
  top: 24px;
  margin-bottom: 16px;
}

.summary-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.summary-row.discount {
  color: var(--n-success-color);
}

.summary-row.total {
  font-size: 18px;
  font-weight: 600;
  color: var(--n-text-color-1);
}

.security-card {
  text-align: center;
}

.security-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.security-content h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--n-text-color-1);
}

.security-content p {
  margin: 0;
  font-size: 14px;
  color: var(--n-text-color-3);
  line-height: 1.5;
}

.success-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.success-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--n-text-color-1);
}

.success-content {
  text-align: center;
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .checkout-content :deep(.n-grid) {
    grid-template-columns: 1fr;
  }

  .order-summary-card {
    position: static;
  }
}

@media (max-width: 768px) {
  .checkout {
    padding: 16px;
  }

  .checkout-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .checkout-progress {
    padding: 16px;
  }

  .checkout-content :deep(.n-form-item-label) {
    width: 100px !important;
  }

  .address-review,
  .payment-review {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }

  .review-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .review-item img {
    width: 100%;
    height: 120px;
  }
}
</style>
