<script setup lang="ts">
import PageHeader from "@/components/custom/PageHeader.vue";

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
      <PageHeader title="Pagination" subtitle="Page navigation controls for large datasets and content lists" />

      <n-grid x-gap="12" cols="1 sm:2" responsive="screen">
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
