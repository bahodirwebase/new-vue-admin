<script lang="ts" setup>
import { PAYMENT_RULES } from "../constants";
import { useCheckoutStore } from "../store";

const checkoutStore = useCheckoutStore();

</script>
<template>
  <n-form
    ref="paymentFormRef"
    :model="checkoutStore.paymentForm"
    :rules="PAYMENT_RULES"
    label-placement="left"
    label-width="120px"
  >
    <n-form-item label="Payment Type">
      <n-radio-group v-model:value="checkoutStore.paymentForm.type">
        <n-radio-button value="card">Credit Card</n-radio-button>
        <n-radio-button value="paypal">PayPal</n-radio-button>
        <n-radio-button value="apple">Apple Pay</n-radio-button>
      </n-radio-group>
    </n-form-item>

    <!-- Credit Card Form -->
    <div v-if="checkoutStore.paymentForm.type === 'card'">
      <n-form-item label="Card Number" path="cardNumber">
        <n-input
          v-model:value="checkoutStore.paymentForm.cardNumber"
          placeholder="1234 5678 9012 3456"
          maxlength="19"
        />
      </n-form-item>

      <n-grid :cols="2" :x-gap="16">
        <n-gi>
          <n-form-item label="Expiry Date" path="expiryDate">
            <n-input
              v-model:value="checkoutStore.paymentForm.expiryDate"
              placeholder="MM/YY"
              maxlength="5"
            />
          </n-form-item>
        </n-gi>
        <n-gi>
          <n-form-item label="CVV" path="cvv">
            <n-input
              v-model:value="checkoutStore.paymentForm.cvv"
              placeholder="123"
              maxlength="4"
              show-password-on="click"
            />
          </n-form-item>
        </n-gi>
      </n-grid>

      <n-form-item label="Cardholder Name" path="cardholderName">
        <n-input
          v-model:value="checkoutStore.paymentForm.cardholderName"
          placeholder="John Doe"
        />
      </n-form-item>
    </div>

    <!-- PayPal Form -->
    <div v-if="checkoutStore.paymentForm.type === 'paypal'">
      <n-alert type="info" title="PayPal Payment">
        You will be redirected to PayPal to complete your payment securely.
      </n-alert>
    </div>

    <!-- Apple Pay Form -->
    <div v-if="checkoutStore.paymentForm.type === 'apple'">
      <n-alert type="info" title="Apple Pay">
        Use Touch ID or Face ID to complete your purchase with Apple Pay.
      </n-alert>
    </div>

    <n-form-item>
      <n-checkbox v-model:checked="checkoutStore.paymentForm.savePayment">
        Save payment method for future purchases
      </n-checkbox>
    </n-form-item>
  </n-form>
</template>
