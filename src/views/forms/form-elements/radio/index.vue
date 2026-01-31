<script setup lang="ts">
import BasicRadio from './widgets/BasicRadio.vue'
import ButtonRadio from './widgets/ButtonRadio.vue'
import VerticalRadio from './widgets/VerticalRadio.vue'
import CustomRadio from './widgets/CustomRadio.vue'
import StatesRadio from './widgets/StatesRadio.vue'
import IconRadio from './widgets/IconRadio.vue'
import SizesRadio from './widgets/SizesRadio.vue'
</script>

<template>
  <div class="radio-demo">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Radio</h1>
        <p class="page-subtitle">Interactive radio button components with custom styling, icons, and various layout options</p>
      </div>
      
      <n-grid :cols="2" :x-gap="12">
        <n-gi>
          <BasicRadio />
          <ButtonRadio />
          <VerticalRadio />
          <CustomRadio />
        </n-gi>
        <n-gi>
          <StatesRadio />
          <IconRadio />
          <SizesRadio />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<style scoped>
.radio-demo {
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
