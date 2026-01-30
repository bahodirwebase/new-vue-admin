<template>
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
</template>

<script setup lang="ts">
import { ref } from 'vue'

const pageTotal = ref(1)
const totalItems = ref(250)
const itemsPerPage = ref(20)
</script>
