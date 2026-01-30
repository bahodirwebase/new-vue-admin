<script setup lang="ts">
import BasicSlider from './widgets/BasicSlider.vue'
import RangeSlider from './widgets/RangeSlider.vue'
import StepsSlider from './widgets/StepsSlider.vue'
import MarksSlider from './widgets/MarksSlider.vue'
import SizesSlider from './widgets/SizesSlider.vue'
import StatesSlider from './widgets/StatesSlider.vue'
import VerticalSlider from './widgets/VerticalSlider.vue'
import TooltipSlider from './widgets/TooltipSlider.vue'
import StylesSlider from './widgets/StylesSlider.vue'
import InteractiveSlider from './widgets/InteractiveSlider.vue'
</script>

<template>
  <div class="slider-demo">
    <n-space vertical :size="24">
      <n-grid :cols="2" :x-gap="12">
        <n-gi>
          <BasicSlider />
          <RangeSlider />
          <StepsSlider />
          <MarksSlider />
          <SizesSlider />
        </n-gi>
        <n-gi>
          <StatesSlider />
          <VerticalSlider />
          <TooltipSlider />
          <StylesSlider />
        </n-gi>
      </n-grid>
      
      <InteractiveSlider />
    </n-space>
  </div>
</template>

<style scoped>
.slider-demo {
  max-width: 100%;
}
</style>
