<script setup lang="ts">

import PageHeader from "@/components/custom/PageHeader.vue"
import SimpleWizard from './widgets/SimpleWizard.vue'
import SimpleWizardSelection from './widgets/SimpleWizardSelection.vue'
import MediumWizard from './widgets/MediumWizard.vue'
import ComprehensiveWizard from './widgets/ComprehensiveWizard.vue'

</script>

<template>
  <div class="form-wizard-demo p-0">
    <n-space vertical :size="18">
      <PageHeader title="Form Wizard" subtitle="Multi-step form wizards with validation and progress tracking" />
      
      <!-- Simple Wizard Selection -->
      <SimpleWizardSelection />

      <!-- Simple Wizard -->
      <SimpleWizard />

      <!-- Medium Wizard -->
      <MediumWizard />

      <!-- Comprehensive Wizard -->
      <ComprehensiveWizard />
    </n-space>
  </div>
</template>

<style lang="scss">
.wizard-content {
  margin: 24px 0;
  min-height: 400px;
}

.step-content h3 {
  margin-bottom: 20px;
  color: var(--text-primary);
}

.wizard-navigation {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.n-code {
  max-height: 400px;
  overflow-y: auto;
}

.n-p {
  margin: 0;
}
</style>
