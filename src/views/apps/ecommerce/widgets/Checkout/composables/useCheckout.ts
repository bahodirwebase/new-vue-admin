import { computed } from "vue";
import { OrderItem } from "../types/types";
import { useCheckoutStore } from "../store";

const checkoutStore = useCheckoutStore();
export function useCheckout() {
  const getPaymentLabel = (type: string) => {
    switch (type) {
      case "paypal":
        return "PayPal";
      case "apple":
        return "Apple Pay";
      default:
        return "Credit Card";
    }
  };

  const calculateItemTotal = (item: OrderItem) => {
    return (item.salePrice || item.price) * item.quantity;
  };
  const totalItems = computed(() => {
    return checkoutStore.orderItems.reduce(
      (total, item) => total + item.quantity,
      0,
    );
  });

  const subtotal = computed(() => {
    return checkoutStore.orderItems.reduce((total, item) => {
      return total + calculateItemTotal(item);
    }, 0);
  });

  const shipping = computed(() => {
    return subtotal.value > 100 ? 0 : 9.99;
  });

  const tax = computed(() => {
    return subtotal.value * 0.08; // 8% tax
  });

  const discount = computed(() => {
    return 0; // No discount in checkout
  });

  const total = computed(() => {
    return subtotal.value + shipping.value + tax.value - discount.value;
  });

  return {
    getPaymentLabel,
    calculateItemTotal,
    // nextStep,
    totalItems,
    subtotal,
    shipping,
    tax,
    discount,
    total,
  };
}
