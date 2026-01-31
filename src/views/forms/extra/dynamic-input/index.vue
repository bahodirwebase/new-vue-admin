<script setup lang="ts">
import BasicDynamicInput from './widgets/BasicDynamicInput.vue'
import PresetsDynamicInput from './widgets/PresetsDynamicInput.vue'
import CustomDynamicInput from './widgets/CustomDynamicInput.vue'
import ValidationDynamicInput from './widgets/ValidationDynamicInput.vue'
import MaxDynamicInput from './widgets/MaxDynamicInput.vue'
import KeyValueDynamicInput from './widgets/KeyValueDynamicInput.vue'
import TeamDynamicInput from './widgets/TeamDynamicInput.vue'
</script>

<template>
  <div class="dynamic-input-demo">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Dynamic Input</h1>
        <p class="page-subtitle">Flexible dynamic input components with validation, presets, and custom configurations</p>
      </div>
      
      <n-grid :x-gap="12" :cols="2">
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
.dynamic-input-demo {
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
