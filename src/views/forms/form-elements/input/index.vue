<script setup lang="ts">
import BasicInput from './widgets/BasicInput.vue'
import TypesInput from './widgets/TypesInput.vue'
import StatesInput from './widgets/StatesInput.vue'
import PrefixSuffixInput from './widgets/PrefixSuffixInput.vue'
import TextareaInput from './widgets/TextareaInput.vue'
import ValidationInput from './widgets/ValidationInput.vue'
</script>

<template>
  <div class="input-demo">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Input</h1>
        <p class="page-subtitle">Comprehensive input components with validation, states, and custom styling options</p>
      </div>
      
      <n-grid :cols="2" :x-gap="12">
        <n-gi>
          <BasicInput />
          <TypesInput />
          <StatesInput />
        </n-gi>
        <n-gi>
          <PrefixSuffixInput />
          <TextareaInput />
          <ValidationInput />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<style scoped>
.input-demo {
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
