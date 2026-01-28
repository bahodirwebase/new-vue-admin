<script lang="ts" setup>
import { inject } from 'vue';
import { useCheckoutStore } from "../store";
import { CheckmarkOutline } from "@vicons/ionicons5";

const checkoutStore = useCheckoutStore();
const { validateShipping, validatePayment } = inject<any>('checkoutActions');
  const nextStep = async () => {
    checkoutStore.processing = true;

    try {
      if (checkoutStore.currentStep === 1) {
        await validateShipping();
      } else if (checkoutStore.currentStep === 2) {
        if (checkoutStore.paymentForm.type === "card") {
          await validatePayment();
        }
      }

      checkoutStore.currentStep++;
      checkoutStore.stepStatus = "process";
    } catch (error) {
      console.error("Validation error:", error);
    } finally {
      checkoutStore.processing = false;
    }
  };
</script>
<template>
  <div class="step-navigation">
    <n-space>
      <n-button
        v-if="checkoutStore.currentStep > 1"
        @click="checkoutStore.previousStep"
        :disabled="checkoutStore.processing"
      >
        Previous
      </n-button>
      <n-button
        v-if="checkoutStore.currentStep < 3"
        type="primary"
        @click="nextStep"
        :loading="checkoutStore.processing"
      >
        Continue
      </n-button>
      <n-button
        v-if="checkoutStore.currentStep === 3"
        type="primary"
        size="large"
        @click="checkoutStore.placeOrder"
        :loading="checkoutStore.processing"
      >
        <template #icon>
          <n-icon><CheckmarkOutline /></n-icon>
        </template>
        Place Order
      </n-button>
    </n-space>
  </div>
</template>
