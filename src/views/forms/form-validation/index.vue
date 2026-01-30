<script setup lang="ts">
import BasicValidation from './widgets/BasicValidation.vue'
import AdvancedValidation from './widgets/AdvancedValidation.vue'
import DynamicValidation from './widgets/DynamicValidation.vue'
import FormDataPreview from './widgets/FormDataPreview.vue'
</script>

<template>
  <div class="form-validation-demo">
    <n-space vertical :size="24">
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
</style>
