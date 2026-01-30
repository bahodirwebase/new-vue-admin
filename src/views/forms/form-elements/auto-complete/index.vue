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
  <div class="autocomplete-demo">
    <n-space vertical :size="24">
      <n-grid x-gap="12" :cols="2">
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
.autocomplete-demo {
  padding: 0;
}
</style>
