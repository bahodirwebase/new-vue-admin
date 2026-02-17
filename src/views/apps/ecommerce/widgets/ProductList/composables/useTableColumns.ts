import { h } from "vue";
import { NButton, NIcon } from "naive-ui";
import CustomTag from '@/components/custom/CustomTag.vue';
import { CreateOutline, TrashOutline, EyeOutline } from "@vicons/ionicons5";
import { Product } from "../../../types";
import { useActions } from "../composables/useActions";
import { useProductFilter } from "./useProductFilter";

const { getStockClass } = useProductFilter();
const { viewProduct, editProduct, deleteProduct } = useActions();
export function useTableColumns() {
  const tableColumns = [
    {
      title: "Product",
      key: "name",
      render: (row: Product) => {
        return h("div", { class: "product-cell" }, [
          h("img", {
            src: row.image,
            alt: row.name,
            class: "product-thumbnail",
          }),
          h("div", { class: "product-details" }, [
            h("div", { class: "product-name" }, row.name),
            h("div", { class: "product-category" }, row.category),
          ]),
        ]);
      },
    },
    {
      title: "Price",
      key: "price",
      render: (row: Product) => {
        return h("div", { class: "price-cell" }, [
          row.isOnSale
            ? h("span", { class: "original-price" }, `$${row.price}`)
            : null,
          h(
            "span",
            { class: "current-price" },
            `$${row.salePrice || row.price}`,
          ),
        ]);
      },
    },
    {
      title: "Stock",
      key: "stock",
      render: (row: Product) => {
        const stockClass = getStockClass(row.stock);
        return h("span", { class: stockClass }, `${row.stock} units`);
      },
    },
    {
      title: "Status",
      key: "status",
      render: (row: Product) => {
        const type =
          row.status === "active"
            ? "success"
            : row.status === "inactive"
              ? "warning"
              : "error";
        return h(CustomTag, { type, size: "small" }, () =>
          row.status.replace("_", " ").toUpperCase(),
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (row: Product) => {
        return h("div", { class: "action-buttons" }, [
          h(NButton, { size: "small", onClick: () => viewProduct(row) }, () =>
            h(NIcon, { component: EyeOutline }),
          ),
          h(NButton, { size: "small", onClick: () => editProduct(row) }, () =>
            h(NIcon, { component: CreateOutline }),
          ),
          h(
            NButton,
            { size: "small", type: "error", onClick: () => deleteProduct(row) },
            () => h(NIcon, { component: TrashOutline }),
          ),
        ]);
      },
    },
  ];

  return {
    tableColumns,
  };
}
