import { ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { Product } from "./types";
import { PRODUCT } from './constants'
import { message } from '@/utils/naive-discrete-api'

export const useProductDetailStore = defineStore("product-detail", () => {
  const router = useRouter();

  const currentImageIndex = ref(0);
  const selectedVariants = ref<Record<string, string>>({});
  const quantity = ref(1);
  const product = ref<Product>(PRODUCT);
  const showDeleteModal = ref(false);

  const editProduct = () => {
    // TODO: Navigate to edit page or open modal
    console.log("Edit product:", product.value);
  };

  const confirmDelete = () => {
    showDeleteModal.value = true;
  };
  const selectVariant = (variantName: string, value: string) => {
    selectedVariants.value[variantName] = value;
  };
  const goBack = () => {
    router.push("/apps/ecommerce");
  };
  const addToCart = () => {
    // Create cart item
    const cartItem = {
      id: product.value.id,
      name: product.value.name,
      price: product.value.price,
      salePrice: product.value.salePrice,
      stock: product.value.stock,
      image: product.value.images[0],
      quantity: quantity.value,
      variants: selectedVariants.value,
      isOnSale: product.value.isOnSale,
    };

    // Get existing cart from localStorage
    const existingCart = JSON.parse(
      localStorage.getItem("ecommerce-cart") || "[]",
    );

    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex(
      (item: any) =>
        item.id === cartItem.id &&
        JSON.stringify(item.variants) === JSON.stringify(cartItem.variants),
    );

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      existingCart[existingItemIndex].quantity += quantity.value;
    } else {
      // Add new item
      existingCart.push(cartItem);
    }

    // Save to localStorage
    localStorage.setItem("ecommerce-cart", JSON.stringify(existingCart));

    // Show success message
    message.success(`${quantity.value} × ${product.value.name} added to cart`);

    // Update cart count (you might want to use a store for this)
    const cartCount = existingCart.reduce(
      (total: number, item: any) => total + item.quantity,
      0,
    );
    localStorage.setItem("ecommerce-cart-count", cartCount.toString());
  };

  const deleteProduct = () => {
    // TODO: Implement delete logic
    console.log("Delete product:", product.value);
    showDeleteModal.value = false;
    goBack();
  };
  return {
    editProduct,
    confirmDelete,
    goBack,
    currentImageIndex,
    selectedVariants,
    selectVariant,
    quantity,
    addToCart,
    showDeleteModal,
    deleteProduct,
    product
  };
});
