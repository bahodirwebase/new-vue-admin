<script setup lang="ts">
import PageHeader from "@/components/custom/PageHeader.vue"
import BasicValidation from './widgets/BasicValidation.vue'
import AdvancedValidation from './widgets/AdvancedValidation.vue'
import DynamicValidation from './widgets/DynamicValidation.vue'
import FormDataPreview from './widgets/FormDataPreview.vue'
</script>

<template>
  <div class="form-validation-demo p-0">
    <n-space vertical :size="18">
      <PageHeader title="Form Validation" subtitle="Comprehensive form validation examples with real-time feedback and error handling" />
      
      <BasicValidation />
      <AdvancedValidation />
      <DynamicValidation />
      <FormDataPreview />
    </n-space>
  </div>
</template>

<style scoped>
</style>
