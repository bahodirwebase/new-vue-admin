<script setup lang="ts">
import BasicValidation from './widgets/BasicValidation.vue'
import AdvancedValidation from './widgets/AdvancedValidation.vue'
import DynamicValidation from './widgets/DynamicValidation.vue'
import FormDataPreview from './widgets/FormDataPreview.vue'
</script>

<template>
  <div class="form-validation-demo">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Form Validation</h1>
        <p class="page-subtitle">Comprehensive form validation examples with real-time feedback and error handling</p>
      </div>
      
      <BasicValidation />
      <AdvancedValidation />
      <DynamicValidation />
      <FormDataPreview />
    </n-space>
  </div>
</template>

<style scoped>
.form-validation-demo {
  padding: 0;
}

.page-title {
  font-family: var(--font-secondary);
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
}
</style>
