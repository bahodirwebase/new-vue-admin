<script setup lang="ts">

import BasicCarousel from './widgets/BasicCarousel.vue'
import CarouselControls from './widgets/CarouselControls.vue'
import CarouselStyles from './widgets/CarouselStyles.vue'
import CarouselDirections from './widgets/CarouselDirections.vue'


</script>
<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Carousel</h1>
        <p class="page-subtitle">A slideshow component for cycling through elements—images or slides of text</p>
      </div>

      <n-grid x-gap="12" :cols="2">
        <n-gi>
          <BasicCarousel />
          <CarouselControls />
        </n-gi>
        <n-gi>
          <CarouselStyles />
          <CarouselDirections />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>
