<script lang="ts" setup>
import { ArrowBackOutline, CreateOutline, TrashOutline } from '@vicons/ionicons5'
import { useProductDetailStore } from '../store'

const productDetailStore = useProductDetailStore()
</script>
<template>
  <div class="header-actions">
    <n-space>
      <n-button @click="productDetailStore.goBack">
        <template #icon>
          <n-icon><ArrowBackOutline /></n-icon>
        </template>
        Back to Products
      </n-button>
      <n-button @click="productDetailStore.editProduct">
        <template #icon>
          <n-icon><CreateOutline /></n-icon>
        </template>
        Edit Product
      </n-button>
      <n-button type="error" @click="productDetailStore.confirmDelete">
        <template #icon>
          <n-icon><TrashOutline /></n-icon>
        </template>
        Delete
      </n-button>
    </n-space>
  </div>
</template>
