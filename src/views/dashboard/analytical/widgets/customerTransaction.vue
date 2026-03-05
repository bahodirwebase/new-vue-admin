<script setup lang="ts">
import { ref, h } from "vue";
import { NDataTable, NInput, NIcon, NButton, NAvatar, NCard } from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import type { Transaction } from "../types";
import CustomTag from '@/components/custom/CustomTag.vue';
import { useAnalytical } from '../composables/useAnalytical';

const { searchQuery, filteredTransactions } = useAnalytical();

const checkedRowKeys = ref<(string | number)[]>([]);

// Inline SVG icon helpers
const SearchIcon = {
  render: () => h("svg", { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": 2 }, [
    h("circle", { cx: 11, cy: 11, r: 8 }),
    h("path", { d: "M21 21l-4.35-4.35" }),
  ]),
};

const EyeIcon = {
  render: () => h("svg", { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": 2 }, [
    h("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }),
    h("circle", { cx: 12, cy: 12, r: 3 }),
  ]),
};

const TrashIcon = {
  render: () => h("svg", { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": 2 }, [
    h("polyline", { points: "3 6 5 6 21 6" }),
    h("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }),
  ]),
};

const MoreIcon = {
  render: () => h("svg", { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": 2 }, [
    h("circle", { cx: 12, cy: 12, r: 1 }),
    h("circle", { cx: 19, cy: 12, r: 1 }),
    h("circle", { cx: 5,  cy: 12, r: 1 }),
  ]),
};

const STATUS_CONFIG = {
  pending:   { color: "#fef3c7", textColor: "#d97706", text: "Pending"   },
  completed: { color: "#d1fae5", textColor: "#059669", text: "Completed" },
}

const columns: DataTableColumns<Transaction> = [
  { type: "selection" as const, width: 50 },
  {
    title: "Customer",
    key: "customer",
    render: (row) => h("div", { class: "customer-cell" }, [
      h(NAvatar, { round: true, size: 40, src: row.avatar, style: "flex-shrink: 0", alt: row.customer }),
      h("span", { class: "customer-name" }, row.customer),
    ]),
  },
  {
    title: "Item",
    key: "item",
    render: (row) => h("span", { class: "item-text" }, row.item),
  },
  {
    title: "Date",
    key: "date",
    render: (row) => h("span", { class: "date-text" }, row.date),
  },
  {
    title: "Status",
    key: "status",
    render: (row) => {
      const cfg = STATUS_CONFIG[row.status]
      return h(CustomTag, { round: true, style: { backgroundColor: cfg.color, color: cfg.textColor, fontWeight: "500", padding: "0 12px" } }, () => cfg.text)
    },
  },
  {
    title: "Action",
    key: "action",
    width: 120,
    render: () => h("div", { class: "action-buttons" }, [
      h(NButton, { quaternary: true, circle: true, size: "small" }, { icon: () => h(EyeIcon)   }),
      h(NButton, { quaternary: true, circle: true, size: "small" }, { icon: () => h(TrashIcon) }),
      h(NButton, { quaternary: true, circle: true, size: "small" }, { icon: () => h(MoreIcon)  }),
    ]),
  },
];

const pagination = { pageSize: 5, showSizePicker: true, pageSizes: [5, 10, 20] };

const handleCheck = (keys: (string | number)[]) => { checkedRowKeys.value = keys; };
</script>

<template>
  <n-card :bordered="false" class="transactions-card" content-style="padding: 0;">
    <template #header>
      <div class="card-header">
        <span class="card-title">Customer Transaction</span>
        <n-input v-model:value="searchQuery" placeholder="Search customer..." clearable size="small" style="width: 200px">
          <template #prefix>
            <n-icon :component="SearchIcon" />
          </template>
        </n-input>
      </div>
    </template>

    <div class="table-wrapper">
      <n-data-table
        :columns="columns"
        :data="filteredTransactions"
        :pagination="pagination"
        :bordered="false"
        :single-line="false"
        :row-key="(row) => row.id"
        @update:checked-row-keys="handleCheck"
        scroll-x="600"
      />
    </div>
  </n-card>
</template>

<style scoped>
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
  margin-bottom: 0;
}

.card-title {
  font-size: 18px;
}

.table-wrapper {
  padding: 0 4px 4px 4px;
}

:deep(.customer-cell) {
  display: flex;
  align-items: center;
  gap: 12px;
}

:deep(.customer-name) {
  font-weight: 500;
  color: var(--text-primary);
}

:deep(.item-text),
:deep(.date-text) {
  color: var(--text-secondary);
}

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

:deep(.n-checkbox .n-checkbox-box) {
  border-radius: 4px;
}

:deep(.n-checkbox .n-checkbox-box:hover) {
  border-color: var(--color-primary);
}

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
</style>
