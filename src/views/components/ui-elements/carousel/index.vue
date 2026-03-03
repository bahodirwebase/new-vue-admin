<script setup lang="ts">
import PageHeader from "@/components/custom/PageHeader.vue";

import BasicCarousel from './widgets/BasicCarousel.vue'
import CarouselControls from './widgets/CarouselControls.vue'
import CarouselStyles from './widgets/CarouselStyles.vue'
import CarouselDirections from './widgets/CarouselDirections.vue'


</script>
<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <PageHeader title="Carousel" subtitle="A slideshow component for cycling through elements—images or slides of text" />

      <n-grid x-gap="12" cols="1 sm:2" responsive="screen">
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
