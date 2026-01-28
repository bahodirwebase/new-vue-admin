import { defineStore } from "pinia";
import { ref } from "vue";
import { OrderItem } from "./types";
import { ORDER_ITEMS_LIST } from "./constants";

export const useCheckoutStore = defineStore("checkout", () => {
  const shippingForm = ref({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    saveAddress: false,
  });
  const paymentForm = ref({
    type: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    savePayment: false,
  });
  const orderItems = ref<OrderItem[]>(ORDER_ITEMS_LIST);
  const currentStep = ref(1);
  const stepStatus = ref<"process" | "finish" | "error" | "wait">("process");
  const orderNumber = ref("");
  const processing = ref(false);
  const showSuccessModal = ref(false);

  return {
    shippingForm,
    paymentForm,
    orderItems,
    currentStep,
    stepStatus,
    orderNumber,
    processing,
    showSuccessModal
  };
});
