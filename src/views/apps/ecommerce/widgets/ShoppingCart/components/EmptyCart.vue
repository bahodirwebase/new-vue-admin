<script lang="ts" setup>
import { useEcommerceStore } from "@/views/apps/ecommerce/store";

const store = useEcommerceStore();
</script>
<template>
  <n-empty description="Your cart is empty">
    <template #extra>
      <n-button type="primary" @click="store.continueShopping">
        Start Shopping
      </n-button>
    </template>
  </n-empty>
</template>
