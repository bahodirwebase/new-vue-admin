import { computed } from "vue";
import { useProductDetailStore } from "../store";

export function useProductDetail() {
  const productDetailStore = useProductDetailStore();
  const currentImage = computed(() => {
    return (
      productDetailStore.product?.images[
        productDetailStore.currentImageIndex
      ] || ""
    );
  });
  const getStatusType = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "warning";
      case "out_of_stock":
        return "error";
      default:
        return "default";
    }
  };
  const formatStatus = (status: string) => {
    return status.replace("_", " ").toUpperCase();
  };
  const getStockClass = (stock: number) => {
    if (stock === 0) return "stock-out";
    if (stock < 10) return "stock-low";
    return "stock-good";
  };
  const getStockStatus = (stock: number) => {
    if (stock === 0) return "Out of Stock";
    if (stock < 10) return "Low Stock";
    if (stock < 50) return "Limited Stock";
    return "In Stock";
  };
  const getRatingPercentage = (rating: number) => {
    const reviews = productDetailStore.product.reviews || [];
    const count = reviews.filter((r) => Math.floor(r.rating) === rating).length;
    return reviews.length > 0 ? (count / reviews.length) * 100 : 0;
  };
  const getRatingCount = (rating: number) => {
    const reviews = productDetailStore.product.reviews || [];
    return reviews.filter((r) => Math.floor(r.rating) === rating).length;
  };
  const getLogType = (type: string) => {
    return type as "info" | "success" | "warning" | "error";
  };
  return {
    currentImage,
    getStatusType,
    formatStatus,
    getStockClass,
    getStockStatus,
    getRatingPercentage,
    getRatingCount,
    getLogType
  };
}
