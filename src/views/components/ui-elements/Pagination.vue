<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Pagination</h1>
        <p class="page-subtitle">
          Page navigation controls for large datasets and content lists
        </p>
      </div>

      <n-grid x-gap="12" :cols="2">
        <n-gi>
          <n-card title="Basic Pagination">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Default Pagination
                </h3>
                <n-space align="center">
                  <n-pagination v-model:page="page1" :page-count="12" />
                  <span class="page-indicator">Page {{ page1 }} of 12</span>
                </n-space>
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  With Page Size
                </h3>
                <n-space align="center">
                  <n-pagination
                    v-model:page="page2"
                    :page-count="20"
                    :page-size="10"
                  />
                  <span class="page-indicator">Page {{ page2 }} of 20</span>
                </n-space>
              </div>
            </n-space>
          </n-card>
          <n-card title="Pagination Styles">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Simple Style
                </h3>
                <n-pagination
                  v-model:page="pageSimple"
                  :page-count="15"
                  simple
                />
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  With Quick Jumper
                </h3>
                <n-pagination
                  v-model:page="pageJumper"
                  :page-count="50"
                  show-quick-jumper
                  show-size-picker
                  :page-sizes="[10, 20, 30, 50]"
                />
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  With Page Size Selector
                </h3>
                <n-pagination
                  v-model:page="pageSize"
                  :page-count="totalPages"
                  :page-size="pageSizeValue"
                  :page-sizes="[5, 10, 20, 50]"
                  show-size-picker
                  @update:page-size="handlePageSizeChange"
                />
                <span
                  class="page-indicator"
                  style="display: block; margin-top: 8px"
                >
                  Showing {{ (pageSize - 1) * pageSizeValue + 1 }}-{{
                    Math.min(pageSize * pageSizeValue, 100)
                  }}
                  of 100 items
                </span>
              </div>
            </n-space>
          </n-card>
          <n-card title="Pagination Examples">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Table Pagination
                </h3>
                <n-pagination
                  v-model:page="tablePage"
                  :item-count="tableTotal"
                  :page-size="tablePageSize"
                  show-size-picker
                  :page-sizes="[5, 10, 20]"
                />
                <p class="page-indicator" style="margin-top: 8px">
                  Displaying {{ (tablePage - 1) * tablePageSize + 1 }}-{{
                    Math.min(tablePage * tablePageSize, tableTotal)
                  }}
                  of {{ tableTotal }} records
                </p>
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Compact Pagination
                </h3>
                <n-pagination
                  v-model:page="compactPage"
                  :page-count="25"
                  simple
                />
              </div>
            </n-space>
          </n-card>
        </n-gi>
        <n-gi>
          <n-card title="Pagination Sizes">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Small
                </h3>
                <n-pagination
                  v-model:page="pageSmall"
                  :page-count="10"
                  size="small"
                />
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Medium (Default)
                </h3>
                <n-pagination
                  v-model:page="pageMedium"
                  :page-count="10"
                  size="medium"
                />
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Large
                </h3>
                <n-pagination
                  v-model:page="pageLarge"
                  :page-count="10"
                  size="large"
                />
              </div>
            </n-space>
          </n-card>
          <n-card title="Pagination with Item Count">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Show Total
                </h3>
                <n-pagination
                  v-model:page="pageTotal"
                  :item-count="totalItems"
                  :page-size="itemsPerPage"
                  show-size-picker
                  :page-sizes="[10, 20, 50, 100]"
                />
              </div>
            </n-space>
          </n-card>
          <n-card title="Pagination Display Options">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Show Previous/Next
                </h3>
                <n-pagination
                  v-model:page="pageNav"
                  :page-count="10"
                  show-prev
                />
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">
                  Custom Button Text
                </h3>
                <n-pagination :page-count="101">
                  <template #prev> Go Prev </template>
                  <template #next> Go Next </template>
                </n-pagination>
              </div>
            </n-space>
          </n-card>
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const page1 = ref(1);
const page2 = ref(1);
const pageSmall = ref(1);
const pageMedium = ref(1);
const pageLarge = ref(1);
const pageSimple = ref(1);
const pageJumper = ref(1);
const pageSize = ref(1);
const pageSizeValue = ref(10);
const pageTotal = ref(1);
const pageNav = ref(1);
const tablePage = ref(1);
const tablePageSize = ref(10);
const tableTotal = ref(100);
const compactPage = ref(1);

const totalPages = computed(() => Math.ceil(100 / pageSizeValue.value));
const totalItems = ref(250);
const itemsPerPage = ref(20);

const handlePageSizeChange = (size: number) => {
  pageSizeValue.value = size;
  pageSize.value = 1;
};
</script>

<style scoped>

.page-title {
  font-family: var(--font-secondary);
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
}

.page-indicator {
  color: var(--text-secondary);
  font-size: 14px;
}


</style>
