import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useEcommerceStore = defineStore("ecommerce", () => {
  const viewMode = ref<"grid" | "list">("grid");
  const currentView = ref("products");


  const showAddProductModal = ref(false);
  const showFilterModal = ref(false);

  const router = useRouter();

  const setViewMode = (mode: "grid" | "list") => {
    viewMode.value = mode;
  };
  const exportProducts = () => {
    // TODO: Implement export functionality
    console.log("Export products");
  };
  const continueShopping = () => {
    router.push("/apps/ecommerce");
  };
  const goBack = () => {
    router.push("/apps/ecommerce/cart");
  };
  const toggleFilterModal = () => {
    showFilterModal.value = !showFilterModal.value;
  };


  return {
    currentView,
    viewMode,
    showAddProductModal,
    showFilterModal,
    setViewMode,
    exportProducts,
    continueShopping,
    goBack,
    toggleFilterModal
  };
});
