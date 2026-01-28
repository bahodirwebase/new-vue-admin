<script lang="ts" setup>
import { ref } from 'vue'
import { shippingRules, stateOptions, countryOptions } from '../constants'
import { useCheckoutStore } from '../store'

const checkoutStore = useCheckoutStore()
const formRef = ref()
const validate = () => {
  return formRef.value?.validate();
};
defineExpose({ validate });
</script>

<template>
  <n-form
    ref="formRef"
    :model="checkoutStore.shippingForm"
    :rules="shippingRules"
    label-placement="left"
    label-width="120px"
  >
    <n-grid cols="1 lg:2" :x-gap="16" responsive="screen">
      <n-gi>
        <n-form-item label="First Name" path="firstName">
          <n-input v-model:value="checkoutStore.shippingForm.firstName" placeholder="John" />
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-form-item label="Last Name" path="lastName">
          <n-input v-model:value="checkoutStore.shippingForm.lastName" placeholder="Doe" />
        </n-form-item>
      </n-gi>
    </n-grid>

    <n-form-item label="Email" path="email">
      <n-input
        v-model:value="checkoutStore.shippingForm.email"
        placeholder="john.doe@example.com"
      />
    </n-form-item>

    <n-form-item label="Phone" path="phone">
      <n-input
        v-model:value="checkoutStore.shippingForm.phone"
        placeholder="+1 (555) 123-4567"
      />
    </n-form-item>

    <n-form-item label="Address" path="address">
      <n-input
        v-model:value="checkoutStore.shippingForm.address"
        placeholder="123 Main Street"
      />
    </n-form-item>

    <n-grid :x-gap="16" cols="1 lg:2" responsive="screen">
      <n-gi>
        <n-form-item label="City" path="city">
          <n-input v-model:value="checkoutStore.shippingForm.city" placeholder="New York" />
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-form-item label="State" path="state">
          <n-select
            v-model:value="checkoutStore.shippingForm.state"
            placeholder="Select State"
            :options="stateOptions"
          />
        </n-form-item>
      </n-gi>
    </n-grid>

    <n-grid  :x-gap="16" cols="1 lg:2" responsive="screen">
      <n-gi>
        <n-form-item label="ZIP Code" path="zipCode">
          <n-input v-model:value="checkoutStore.shippingForm.zipCode" placeholder="10001" />
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-form-item label="Country" path="country">
          <n-select
            v-model:value="checkoutStore.shippingForm.country"
            placeholder="Select Country"
            :options="countryOptions"
          />
        </n-form-item>
      </n-gi>
    </n-grid>

    <n-form-item>
      <n-checkbox v-model:checked="checkoutStore.shippingForm.saveAddress">
        Save this address for future purchases
      </n-checkbox>
    </n-form-item>
  </n-form>
</template>
