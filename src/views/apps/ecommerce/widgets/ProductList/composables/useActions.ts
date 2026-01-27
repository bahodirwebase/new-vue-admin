import { Product } from "../../../types";

export function useActions() {
  const viewProduct = (product: Product) => {
    // TODO: Navigate to product detail
    console.log("View product:", product);
  };
  const editProduct = (product: Product) => {
    // TODO: Open edit modal
    console.log("Edit product:", product);
  };

  const deleteProduct = (product: Product) => {
    // TODO: Implement delete confirmation
    console.log("Delete product:", product);
  };

  return {
    viewProduct,
    editProduct,
    deleteProduct,
  };
}
