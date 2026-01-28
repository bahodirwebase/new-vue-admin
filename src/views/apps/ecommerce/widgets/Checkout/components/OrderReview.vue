<script lang="ts" setup>
import { useCheckoutStore } from "../store";
import { useCheckout } from "../composables/useCheckout";


interface IProps{
    currentStep: number;
}

const props = defineProps<IProps>();

const checkoutStore = useCheckoutStore();
const { getPaymentLabel, calculateItemTotal } = useCheckout();

</script>
<template>
  <div class="gap-6 d-flex flex-column">
    <!-- Shipping Address Review -->
    <div class="review-section">
      <h4>Shipping Address</h4>
      <div class="address-review">
        <p>
          <strong
            >{{ checkoutStore.shippingForm.firstName }}
            {{ checkoutStore.shippingForm.lastName }}</strong
          ><br />
          {{ checkoutStore.shippingForm.address }}<br />
          {{ checkoutStore.shippingForm.city }},
          {{ checkoutStore.shippingForm.state }}
          {{ checkoutStore.shippingForm.zipCode }}<br />
          {{ checkoutStore.shippingForm.country }}<br />
          {{ checkoutStore.shippingForm.email }}<br />
          {{ checkoutStore.shippingForm.phone }}
        </p>
        <n-button size="small" @click="currentStep = 1">Edit</n-button>
      </div>
    </div>

    <!-- Payment Method Review -->
    <div class="review-section">
      <h4>Payment Method</h4>
      <div class="payment-review">
        <div v-if="checkoutStore.paymentForm.type === 'card'">
          <p>
            <strong>Credit Card</strong><br />
            **** **** **** {{ checkoutStore.paymentForm.cardNumber?.slice(-4)
            }}<br />
            {{ checkoutStore.paymentForm.cardholderName }}
          </p>
        </div>
        <div v-else>
          <p>
            <strong>{{
              getPaymentLabel(checkoutStore.paymentForm.type)
            }}</strong>
          </p>
        </div>
        <n-button size="small" @click="currentStep = 2">Edit</n-button>
      </div>
    </div>

    <!-- Order Items Review -->
    <div class="review-section">
      <h4 class="font-weight-600 mb-3">Order Items</h4>
      <div class="d-flex flex-column gap-3">
        <div v-for="item in checkoutStore.orderItems" :key="item.id" class="review-item d-flex p-3">
          <img :src="item.image" :alt="item.name" />
          <div class="flex-1 d-flex flex-column gap-1">
            <span class="item-name">{{ item.name }}</span>
            <span class="item-quantity">Qty: {{ item.quantity }}</span>
          </div>
          <span class="item-price font-weight-600">
            ${{ calculateItemTotal(item).toFixed(2) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>