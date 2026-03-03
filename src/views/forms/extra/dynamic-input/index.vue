<script setup lang="ts">
import PageHeader from "@/components/custom/PageHeader.vue"
import BasicDynamicInput from './widgets/BasicDynamicInput.vue'
import PresetsDynamicInput from './widgets/PresetsDynamicInput.vue'
import CustomDynamicInput from './widgets/CustomDynamicInput.vue'
import ValidationDynamicInput from './widgets/ValidationDynamicInput.vue'
import MaxDynamicInput from './widgets/MaxDynamicInput.vue'
import KeyValueDynamicInput from './widgets/KeyValueDynamicInput.vue'
import TeamDynamicInput from './widgets/TeamDynamicInput.vue'
</script>

<template>
  <div class="dynamic-input-demo p-0">
    <n-space vertical :size="18">
      <PageHeader title="Dynamic Input" subtitle="Flexible dynamic input components with validation, presets, and custom configurations" />
      
      <n-grid :x-gap="12" cols="1 sm:2" responsive="screen">
        <n-gi>
          <BasicDynamicInput />
          <PresetsDynamicInput />
          <CustomDynamicInput />
          <ValidationDynamicInput />
        </n-gi>
        <n-gi>
          <MaxDynamicInput />
          <KeyValueDynamicInput />
          <TeamDynamicInput />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<style scoped>

</style>
