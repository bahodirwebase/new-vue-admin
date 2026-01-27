import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useEcommerceStore = defineStore("ecommerce", () => {
  const viewMode = ref<"grid" | "list">("grid");
  const showAddProductModal = ref(false);

  const searchQuery = ref("");
  const selectedCategory = ref(null);
  const selectedStatus = ref(null);
  const sortBy = ref("name");
  const pagination = ref({
    page: 1,
    pageSize: 10,
    itemCount: 0,
    showSizePicker: true,
    pageSizes: [10, 20, 50],
  });

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
  const handlePageChange = (page: number) => {
    pagination.value.page = page;
  };

  return {
    sortBy,
    selectedStatus,
    selectedCategory,
    searchQuery,
    pagination,
    viewMode,
    showAddProductModal,
    setViewMode,
    exportProducts,
    continueShopping,
    goBack,
    handlePageChange,
  };
});
