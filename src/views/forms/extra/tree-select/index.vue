<script setup lang="ts">
import PageHeader from "@/components/custom/PageHeader.vue"
import BasicTreeSelect from './widgets/BasicTreeSelect.vue'
import MultipleTreeSelect from './widgets/MultipleTreeSelect.vue'
import CheckableTreeSelect from './widgets/CheckableTreeSelect.vue'
import SearchTreeSelect from './widgets/SearchTreeSelect.vue'
import CustomTreeSelect from './widgets/CustomTreeSelect.vue'
import ExpandTreeSelect from './widgets/ExpandTreeSelect.vue'
import SizesTreeSelect from './widgets/SizesTreeSelect.vue'
import FileExplorerTreeSelect from './widgets/FileExplorerTreeSelect.vue'
</script>

<template>
  <div class="tree-select-demo p-0">
    <n-space vertical :size="18">
      <PageHeader title="Tree Select" subtitle="Hierarchical tree selection components with search, checkable items, and custom rendering" />
      
      <n-grid cols="1 sm:2" responsive="screen" :x-gap="12">
        <n-gi>
          <BasicTreeSelect />
          <MultipleTreeSelect />
          <CheckableTreeSelect />
          <SearchTreeSelect />
        </n-gi>
        <n-gi>
          <CustomTreeSelect />
          <ExpandTreeSelect />
          <SizesTreeSelect />
        </n-gi>
      </n-grid>
      
      <FileExplorerTreeSelect />
    </n-space>
  </div>
</template>

<style scoped>
</style>
