<script setup lang="ts">
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
  <div class="tree-select-demo">
    <n-space vertical :size="24">
      <n-grid :cols="2" :x-gap="12">
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
.tree-select-demo {
  padding: 0;
}
</style>
