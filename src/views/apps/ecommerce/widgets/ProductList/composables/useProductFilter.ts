import { computed, ref } from "vue";
import { PRODUCTS_LIST } from "../constants"; // Statik ma'lumotlar
import { Product } from "../../../types";

export function useProductFilter() {
  const loading = ref(false);
  const products = ref(PRODUCTS_LIST as Product[]);

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

  // 1. Asosiy Filtrlash Logikasi
  const filteredProducts = computed(() => {
    let result = [...products.value];

    // Qidiruv (Search)
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query),
      );
    }

    // Kategoriya bo'yicha filtr
    if (selectedCategory.value) {
      result = result.filter((p) => p.category === selectedCategory.value);
    }

    // Status bo'yicha filtr
    if (selectedStatus.value) {
      result = result.filter((p) => p.status === selectedStatus.value);
    }

    // 2. Saralash (Sorting)
    result.sort((a, b) => {
      const priceA = a.salePrice || a.price;
      const priceB = b.salePrice || b.price;

      switch (sortBy.value) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price_asc":
          return priceA - priceB;
        case "price_desc":
          return priceB - priceA;
        case "stock":
          return a.stock - b.stock;
        case "date":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        default:
          return 0;
      }
    });

    // Store'dagi pagination'ni yangilash
    pagination.value.itemCount = result.length;

    return result;
  });

  // 3. Yordamchi funksiyalar (Helpers)
  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", type: "error" };
    if (stock < 10) return { label: "Low Stock", type: "warning" };
    return { label: "In Stock", type: "success" };
  };

  const getStockClass = (stock: number) => {
    if (stock === 0) return "stock-out";
    if (stock < 10) return "stock-low";
    return "stock-good";
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
    filteredProducts,
    loading,
    getStockStatus,
    getStockClass,
    handlePageChange,
  };
}
