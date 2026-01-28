import { defineStore } from "pinia";
import { ref } from "vue";
import { CART_ITEMS } from "./constants";
import { CartItem } from "./types";

export const useShoppingCartStore = defineStore("shopping-cart", () => {
  const cartItems = ref<CartItem[]>(CART_ITEMS);
  const promoCode = ref("");

  const updateQuantity = (itemId: number, quantity: number) => {
    const item = cartItems.value.find((item) => item.id === itemId);
    if (item) {
      item.quantity = quantity;
    }
  };

  const removeItem = (itemId: number) => {
    const index = cartItems.value.findIndex((item) => item.id === itemId);
    if (index > -1) {
      cartItems.value.splice(index, 1);
    }
  };
  const applyPromoCode = () => {
    if (promoCode.value === "SAVE10") {
      // Show success message
      console.log("Promo code applied!");
    } else {
      // Show error message
      console.log("Invalid promo code");
    }
  };
  const viewProduct = (product: any) => {
    // TODO: Navigate to product detail
    console.log("View product:", product);
  };

  const addToCart = (product: any) => {
    // TODO: Add to cart logic
    console.log("Add to cart:", product);
  };

  return {
    cartItems,
    updateQuantity,
    removeItem,
    promoCode,
    applyPromoCode,
    viewProduct,
    addToCart,
  };
});
