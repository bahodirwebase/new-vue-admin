<script lang="ts" setup>
import { ref } from "vue";
import { CATEGORY_OPTIONS } from "../../../constants";
import { FORM_RULES } from "../constants";
import { useEcommerceStore } from "@/views/apps/ecommerce/store";


const store = useEcommerceStore();

const newProduct = ref({
  name: "",
  category: "",
  price: 0,
  stock: 0,
  description: "",
  image: "",
  isNew: false,
  isOnSale: false,
});



const saveProduct = () => {
  // TODO: Implement save logic
  console.log("Save product:", newProduct.value);
  store.showAddProductModal = false;
};
</script>

<template>
  <n-modal
    v-model:show="store.showAddProductModal"
    preset="card"
    title="Add New Product"
    style="width: 600px"
  >
    <n-form
      ref="formRef"
      :model="newProduct"
      :rules="FORM_RULES"
      label-placement="left"
      label-width="120px"
    >
      <n-form-item label="Product Name" path="name">
        <n-input
          v-model:value="newProduct.name"
          placeholder="Enter product name"
        />
      </n-form-item>

      <n-form-item label="Category" path="category">
        <n-select
          v-model:value="newProduct.category"
          placeholder="Select category"
          :options="CATEGORY_OPTIONS"
        />
      </n-form-item>

      <n-form-item label="Price" path="price">
        <n-input-number
          v-model:value="newProduct.price"
          placeholder="0.00"
          :precision="2"
          :min="0"
          style="width: 100%"
        />
      </n-form-item>

      <n-form-item label="Stock" path="stock">
        <n-input-number
          v-model:value="newProduct.stock"
          placeholder="0"
          :min="0"
          style="width: 100%"
        />
      </n-form-item>

      <n-form-item label="Description" path="description">
        <n-input
          v-model:value="newProduct.description"
          type="textarea"
          placeholder="Enter product description"
          :rows="3"
        />
      </n-form-item>

      <n-form-item label="Image URL" path="image">
        <n-input
          v-model:value="newProduct.image"
          placeholder="Enter image URL"
        />
      </n-form-item>

      <n-form-item>
        <n-space>
          <n-checkbox v-model:checked="newProduct.isNew"
            >New Product</n-checkbox
          >
          <n-checkbox v-model:checked="newProduct.isOnSale">On Sale</n-checkbox>
        </n-space>
      </n-form-item>
    </n-form>

    <template #footer>
      <n-space justify="end">
        <n-button @click="store.showAddProductModal = false">Cancel</n-button>
        <n-button type="primary" @click="saveProduct">Save Product</n-button>
      </n-space>
    </template>
  </n-modal>
</template>
