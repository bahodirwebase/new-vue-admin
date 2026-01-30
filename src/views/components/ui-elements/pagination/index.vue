<script setup lang="ts">

import BasicPagination from './widgets/BasicPagination.vue'
import PaginationStyles from './widgets/PaginationStyles.vue'
import PaginationExamples from './widgets/PaginationExamples.vue'
import PaginationSizes from './widgets/PaginationSizes.vue'
import PaginationWithItemCount from './widgets/PaginationWithItemCount.vue'
import PaginationDisplayOptions from './widgets/PaginationDisplayOptions.vue'


</script>
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
          <BasicPagination />
          <PaginationStyles />
          <PaginationExamples />
        </n-gi>
        <n-gi>
          <PaginationSizes />
          <PaginationWithItemCount />
          <PaginationDisplayOptions />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>
