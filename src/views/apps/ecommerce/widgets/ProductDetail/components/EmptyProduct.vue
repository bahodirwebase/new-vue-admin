<script lang="ts" setup>
import { useProductDetailStore } from '../store';
const productStore = useProductDetailStore();
</script>
<template>
  <n-result
    status="404"
    title="Product Not Found"
    description="The product you're looking for doesn't exist."
  >
    <template #footer>
      <n-button @click="productStore.goBack">Go Back to Products</n-button>
    </template>
  </n-result>
</template>
