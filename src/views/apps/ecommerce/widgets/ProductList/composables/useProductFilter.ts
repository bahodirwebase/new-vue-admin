import { computed, ref } from "vue";
import { useEcommerceStore } from "../../../store"; // O'zingizning store manzilingiz
import { products_list } from "../constants"; // Statik ma'lumotlar
import { Product } from "../../../types";

export function useProductFilter() {
  const store = useEcommerceStore();
  const loading = ref(false);
  const products = ref(products_list as Product[]);

  // 1. Asosiy Filtrlash Logikasi
  const filteredProducts = computed(() => {
    let result = [...products.value];

    // Qidiruv (Search)
    if (store.searchQuery) {
      const query = store.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query),
      );
    }

    // Kategoriya bo'yicha filtr
    if (store.selectedCategory) {
      result = result.filter((p) => p.category === store.selectedCategory);
    }

    // Status bo'yicha filtr
    if (store.selectedStatus) {
      result = result.filter((p) => p.status === store.selectedStatus);
    }

    // 2. Saralash (Sorting)
    result.sort((a, b) => {
      const priceA = a.salePrice || a.price;
      const priceB = b.salePrice || b.price;

      switch (store.sortBy) {
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
    store.pagination.itemCount = result.length;

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

  return {
    filteredProducts,
    loading,
    getStockStatus,
    getStockClass,
  };
}
