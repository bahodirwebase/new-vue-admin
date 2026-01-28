import { CartItem } from "../types";
import { computed } from "vue";
import { useShoppingCartStore } from "../store";

const shoppingCartStore = useShoppingCartStore();

export function useShoppingCart() {
  const calculateItemTotal = (item: CartItem) => {
    return (item.salePrice || item.price) * item.quantity;
  };
  const totalItems = computed(() => {
    return shoppingCartStore.cartItems.reduce(
      (total, item) => total + item.quantity,
      0,
    );
  });
  const subtotal = computed(() => {
    return shoppingCartStore.cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  });
  const shipping = computed(() => {
    return subtotal.value > 100 ? 0 : 9.99;
  });
  const tax = computed(() => {
    return subtotal.value * 0.08; // 8% tax
  });
  const discount = computed(() => {
    return shoppingCartStore.promoCode === "SAVE10" ? subtotal.value * 0.1 : 0;
  });
  const total = computed(() => {
    return subtotal.value + shipping.value + tax.value - discount.value;
  });
  return {
    calculateItemTotal,
    totalItems,
    subtotal,
    shipping,
    tax,
    discount,
    total,
  };
}
