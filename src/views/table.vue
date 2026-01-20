<template>
  <n-card
    :bordered="false"
    class="transactions-card"
    content-style="padding: 0;"
  >
    <template #header>
      <div class="card-header">
        <span class="card-title">Customer Transaction</span>
      </div>
    </template>

    <template #header-extra>
      <n-input
        v-model:value="searchQuery"
        placeholder="Search customer..."
        clearable
        size="small"
        style="width: 200px"
      >
        <template #prefix>
          <n-icon :component="SearchIcon" />
        </template>
      </n-input>
    </template>

    <div class="table-wrapper">
      <n-data-table
        :columns="columns"
        :data="filteredData"
        :pagination="pagination"
        :bordered="false"
        :single-line="false"
        :row-key="(row) => row.id"
        @update:checked-row-keys="handleCheck"
      />
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { ref, computed, h } from "vue";
import {
  NDataTable,
  NInput,
  NIcon,
  NTag,
  NButton,
  NAvatar,
  NCard,
} from "naive-ui";
import type { DataTableColumns } from "naive-ui";

// Define interface for transaction data
interface Transaction {
  id: number;
  customer: string;
  avatar: string;
  item: string;
  date: string;
  status: "pending" | "completed";
}

// Icons
const SearchIcon = {
  render() {
    return h(
      "svg",
      {
        width: 16,
        height: 16,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": 2,
      },
      [
        h("circle", { cx: 11, cy: 11, r: 8 }),
        h("path", { d: "M21 21l-4.35-4.35" }),
      ],
    );
  },
};

const EyeIcon = {
  render() {
    return h(
      "svg",
      {
        width: 18,
        height: 18,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": 2,
      },
      [
        h("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }),
        h("circle", { cx: 12, cy: 12, r: 3 }),
      ],
    );
  },
};

const TrashIcon = {
  render() {
    return h(
      "svg",
      {
        width: 18,
        height: 18,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": 2,
      },
      [
        h("polyline", { points: "3 6 5 6 21 6" }),
        h("path", {
          d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
        }),
      ],
    );
  },
};

const MoreIcon = {
  render() {
    return h(
      "svg",
      {
        width: 18,
        height: 18,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": 2,
      },
      [
        h("circle", { cx: 12, cy: 12, r: 1 }),
        h("circle", { cx: 19, cy: 12, r: 1 }),
        h("circle", { cx: 5, cy: 12, r: 1 }),
      ],
    );
  },
};



// State
const searchQuery = ref("");
const checkedRowKeys = ref<(string | number)[]>([]);

// Customer data
const transactionsData = ref([
  {
    id: 1,
    customer: "Alesa Noor",
    avatar: "https://i.pravatar.cc/150?img=1",
    item: "Nike T-Shirt",
    date: "24 June 2024",
    status: "pending",
  },
  {
    id: 2,
    customer: "Debid Rabd",
    avatar: "https://i.pravatar.cc/150?img=8",
    item: "Nike Hoodie",
    date: "24 June 2024",
    status: "completed",
  },
  {
    id: 3,
    customer: "Jonselor",
    avatar: "https://i.pravatar.cc/150?img=3",
    item: "Mac Mini",
    date: "24 June 2024",
    status: "pending",
  },
  {
    id: 4,
    customer: "Sarah Miller",
    avatar: "https://i.pravatar.cc/150?img=5",
    item: "Apple Watch",
    date: "23 June 2024",
    status: "completed",
  },
  {
    id: 5,
    customer: "John Cooper",
    avatar: "https://i.pravatar.cc/150?img=12",
    item: "AirPods Pro",
    date: "23 June 2024",
    status: "pending",
  },
  {
    id: 6,
    customer: "Emma Wilson",
    avatar: "https://i.pravatar.cc/150?img=9",
    item: "iPad Air",
    date: "22 June 2024",
    status: "completed",
  },
]);

// Table columns
const columns: DataTableColumns<Transaction> = [
  {
    type: "selection" as const,
    width: 50,
  },
  {
    title: "Customer",
    key: "customer",
    render(row: Transaction) {
      return h("div", { class: "customer-cell" }, [
        h(NAvatar, {
          round: true,
          size: 40,
          src: row.avatar,
          style: "flex-shrink: 0",
        }),
        h("span", { class: "customer-name" }, row.customer),
      ]);
    },
  },
  {
    title: "Item",
    key: "item",
    render(row: Transaction) {
      return h("span", { class: "item-text" }, row.item);
    },
  },
  {
    title: "Date",
    key: "date",
    render(row: Transaction) {
      return h("span", { class: "date-text" }, row.date);
    },
  },
  {
    title: "Status",
    key: "status",
    render(row: Transaction) {
      const statusConfig = {
        pending: {
          color: "#fef3c7",
          textColor: "#d97706",
          text: "Pending",
        },
        completed: {
          color: "#d1fae5",
          textColor: "#059669",
          text: "Completed",
        },
      };
      const config = statusConfig[row.status];
      return h(
        NTag,
        {
          round: true,
          bordered: false,
          style: {
            backgroundColor: config.color,
            color: config.textColor,
            fontWeight: "500",
            padding: "0 12px",
          },
        },
        () => config.text,
      );
    },
  },
  {
    title: "Action",
    key: "action",
    width: 120,
    render(row: Transaction) {
      return h("div", { class: "action-buttons" }, [
        h(
          NButton,
          {
            quaternary: true,
            circle: true,
            size: "small",
            onClick: () => handleView(row),
          },
          { icon: () => h(EyeIcon) },
        ),
        h(
          NButton,
          {
            quaternary: true,
            circle: true,
            size: "small",
            onClick: () => handleDelete(row),
          },
          { icon: () => h(TrashIcon) },
        ),
        h(
          NButton,
          {
            quaternary: true,
            circle: true,
            size: "small",
            onClick: () => handleMore(row),
          },
          { icon: () => h(MoreIcon) },
        ),
      ]);
    },
  },
];

const pagination = {
  pageSize: 5,
  showSizePicker: true,
  pageSizes: [5, 10, 20],
};

// Computed
const filteredData = computed(() => {
  if (!searchQuery.value) return transactionsData.value;
  const query = searchQuery.value.toLowerCase();
  return transactionsData.value.filter(
    (item) =>
      item.customer.toLowerCase().includes(query) ||
      item.item.toLowerCase().includes(query),
  );
});

// Methods
const handleCheck = (keys: (string | number)[]) => {
  checkedRowKeys.value = keys;
};

const handleView = (row: Transaction) => {
  console.log("View:", row);
};

const handleDelete = (row: Transaction) => {
  console.log("Delete:", row);
};

const handleMore = (row: Transaction) => {
  console.log("More:", row);
};
</script>

<style scoped>
/* CSS Variables for theming */

.transactions-card {
  width: 100%;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.transactions-card:hover {
  box-shadow: var(--shadow-md);
}

.card-header {
  display: flex;
  align-items: center;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.table-wrapper {
  padding: 0 4px 4px 4px;
}

/* Customer cell styles */
:deep(.customer-cell) {
  display: flex;
  align-items: center;
  gap: 12px;
}

:deep(.customer-name) {
  font-weight: 500;
  color: var(--text-primary);
}

:deep(.item-text) {
  color: var(--text-secondary);
}

:deep(.date-text) {
  color: var(--text-secondary);
}

/* Action buttons */
:deep(.action-buttons) {
  display: flex;
  gap: 4px;
}

:deep(.action-buttons .n-button) {
  color: var(--text-tertiary);
  transition: all 0.2s ease;
}

:deep(.action-buttons .n-button:hover) {
  color: var(--text-primary);
  background: var(--bg-secondary);
}

/* Card overrides */
:deep(.n-card-header) {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-primary);
}

:deep(.n-card__content) {
  padding: 0 !important;
  background: var(--bg-primary);
}

/* Table overrides */
:deep(.n-data-table-th) {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 14px 16px !important;
  background: var(--bg-secondary);
  color: var(--text-secondary);
  border-color: var(--border-color);
}

:deep(.n-data-table-td) {
  padding: 12px 16px !important;
  border-color: var(--border-color);
  color: var(--text-primary);
}

:deep(.n-data-table-tr:hover) {
  background: var(--bg-secondary) !important;
}

:deep(.n-data-table .n-data-table-table) {
  border-spacing: 0;
}

:deep(.n-data-table-th__title) {
  font-weight: 600;
  color: var(--text-secondary);
}

/* Checkbox styling */
:deep(.n-checkbox .n-checkbox-box) {
  border-radius: 4px;
  border-color: var(--border-color);
}

:deep(.n-checkbox .n-checkbox-box:hover) {
  border-color: var(--color-primary);
}

/* Pagination */
:deep(.n-data-table .n-data-table-base-table) {
  border-bottom: none;
}

:deep(.n-data-table .n-pagination) {
  padding: 16px 20px;
  border-top: 1px solid var(--border-color);
  background: var(--bg-primary);
}

:deep(.n-pagination .n-pagination-item) {
  background: var(--bg-primary);
  border-color: var(--border-color);
  color: var(--text-primary);
}

:deep(.n-pagination .n-pagination-item:hover) {
  background: var(--bg-secondary);
  border-color: var(--color-primary);
}

:deep(.n-pagination .n-pagination-item--active) {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

/* Input styling */
:deep(.n-input) {
  --n-border: 1px solid var(--border-color);
  --n-border-hover: 1px solid var(--color-primary);
  --n-border-focus: 1px solid var(--color-primary);
  --n-color: var(--bg-primary);
  --n-text-color: var(--text-primary);
  --n-placeholder-color: var(--text-tertiary);
}

/* Dark mode specific styles */
[data-theme="dark"] :deep(.n-data-table-tr:hover) {
  background: var(--bg-tertiary) !important;
}

[data-theme="dark"] :deep(.n-data-table-th) {
  background: var(--bg-tertiary);
}

[data-theme="dark"] :deep(.n-card) {
  background: var(--bg-primary);
  border-color: var(--border-color);
}

[data-theme="dark"] :deep(.n-input) {
  --n-color: var(--bg-secondary);
}
</style>
