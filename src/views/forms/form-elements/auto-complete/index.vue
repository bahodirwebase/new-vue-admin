<script setup lang="ts">
import BasicAutoComplete from './widgets/BasicAutoComplete.vue'
import FilterAutoComplete from './widgets/FilterAutoComplete.vue'
import MultipleAutoComplete from './widgets/MultipleAutoComplete.vue'
import GroupedAutoComplete from './widgets/GroupedAutoComplete.vue'
import AsyncAutoComplete from './widgets/AsyncAutoComplete.vue'
import CustomAutoComplete from './widgets/CustomAutoComplete.vue'
import EmailAutoComplete from './widgets/EmailAutoComplete.vue'
</script>

<template>
  <div class="autocomplete-demo p-0">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Auto Complete</h1>
        <p class="page-subtitle">Smart autocomplete components with filtering, async loading, and custom suggestions</p>
      </div>
      
      <n-grid x-gap="12" cols="1 sm:2" responsive="screen">
        <n-gi>
          <BasicAutoComplete />
          <FilterAutoComplete />
          <MultipleAutoComplete />
          <GroupedAutoComplete />
        </n-gi>
        <n-gi>
          <AsyncAutoComplete />
          <CustomAutoComplete />
          <EmailAutoComplete />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<style scoped>
</style>
