<script setup lang="ts">
import BasicSelect from './widgets/BasicSelect.vue'
import MultipleSelect from './widgets/MultipleSelect.vue'
import SearchableSelect from './widgets/SearchableSelect.vue'
import DisabledSelect from './widgets/DisabledSelect.vue'
import TagsSelect from './widgets/TagsSelect.vue'
import GroupedSelect from './widgets/GroupedSelect.vue'
</script>

<template>
  <div class="select-demo p-0">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Select</h1>
        <p class="page-subtitle">Advanced select components with multiple selection, search, and grouped options</p>
      </div>
      
      <n-grid :cols="2" :x-gap="12">
        <n-gi>
          <BasicSelect />
          <MultipleSelect />
          <SearchableSelect />
        </n-gi>
        <n-gi>
          <DisabledSelect />
          <TagsSelect />
          <GroupedSelect />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<style scoped>
</style>
