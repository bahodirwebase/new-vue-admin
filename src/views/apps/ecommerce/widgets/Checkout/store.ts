import { defineStore } from "pinia";
import { ref } from "vue";
import { OrderItem } from "./types/types";
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


  const placeOrder = async () => {
    processing.value = true;

    try {
      // Simulate order processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate order number
      orderNumber.value = "ORD-" + Date.now().toString().slice(-8);

      // Show success modal
      showSuccessModal.value = true;
      stepStatus.value = "finish";
    } catch (error) {
      console.error("Order error:", error);
      stepStatus.value = "error";
    } finally {
      processing.value = false;
    }
  };
  const previousStep = () => {
    currentStep.value--;
  };


  return {
    shippingForm,
    paymentForm,
    orderItems,
    currentStep,
    stepStatus,
    orderNumber,
    processing,
    showSuccessModal,
    // shippingFormRef,
    // paymentFormRef,
    placeOrder,
    previousStep,
    // nextStep,
  };
});
