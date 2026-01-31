<script setup lang="ts">
import BasicInputNumber from './widgets/BasicInputNumber.vue'
import MinMaxInputNumber from './widgets/MinMaxInputNumber.vue'
import StepInputNumber from './widgets/StepInputNumber.vue'
import PrecisionInputNumber from './widgets/PrecisionInputNumber.vue'
import SizesInputNumber from './widgets/SizesInputNumber.vue'
import StatesInputNumber from './widgets/StatesInputNumber.vue'
import ButtonsInputNumber from './widgets/ButtonsInputNumber.vue'
import ProductInputNumber from './widgets/ProductInputNumber.vue'
</script>

<template>
  <div class="input-number-demo">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Input Number</h1>
        <p class="page-subtitle">Advanced number input components with validation, precision control, and interactive features</p>
      </div>
      
      <n-grid :cols="2" :x-gap="12">
        <n-gi>
          <BasicInputNumber />
          <MinMaxInputNumber />
          <StepInputNumber />
          <PrecisionInputNumber />
        </n-gi>
        <n-gi>
          <SizesInputNumber />
          <StatesInputNumber />
          <ButtonsInputNumber />
        </n-gi>
      </n-grid>
      
      <ProductInputNumber />
    </n-space>
  </div>
</template>

<style scoped>
.input-number-demo {
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
