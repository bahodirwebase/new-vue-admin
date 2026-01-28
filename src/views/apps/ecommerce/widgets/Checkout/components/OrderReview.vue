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
  <div class="order-review">
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
      <h4>Order Items</h4>
      <div class="items-review">
        <div v-for="item in checkoutStore.orderItems" :key="item.id" class="review-item">
          <img :src="item.image" :alt="item.name" />
          <div class="item-info">
            <span class="item-name">{{ item.name }}</span>
            <span class="item-quantity">Qty: {{ item.quantity }}</span>
          </div>
          <span class="item-price">
            ${{ calculateItemTotal(item).toFixed(2) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
