<script lang="ts" setup>
import { useProductDetailStore } from '../store';

const productStore = useProductDetailStore();
</script>
<template>
  <n-modal v-model:show="productStore.showDeleteModal" preset="dialog">
    <template #header>Confirm Delete</template>
    <div>
      Are you sure you want to delete "{{ productStore.product?.name }}"? This action cannot
      be undone.
    </div>
    <template #action>
      <n-space>
        <n-button @click="productStore.showDeleteModal = false">Cancel</n-button>
        <n-button type="error" @click="productStore.deleteProduct">Delete</n-button>
      </n-space>
    </template>
  </n-modal>
</template>
