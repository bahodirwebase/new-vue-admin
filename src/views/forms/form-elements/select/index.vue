<script setup lang="ts">
import PageHeader from "@/components/custom/PageHeader.vue"
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
      <PageHeader title="Select" subtitle="Advanced select components with multiple selection, search, and grouped options" />
      
      <n-grid cols="1 sm:2" responsive="screen" :x-gap="12">
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
