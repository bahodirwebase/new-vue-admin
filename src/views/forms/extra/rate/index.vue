<script setup lang="ts">
import BasicRate from './widgets/BasicRate.vue'
import CountRate from './widgets/CountRate.vue'
import HalfRate from './widgets/HalfRate.vue'
import ColorsRate from './widgets/ColorsRate.vue'
import SizesRate from './widgets/SizesRate.vue'
import CustomRate from './widgets/CustomRate.vue'
import TooltipsRate from './widgets/TooltipsRate.vue'
import EventsRate from './widgets/EventsRate.vue'
import ReviewRate from './widgets/ReviewRate.vue'
</script>

<template>
  <div class="rate-demo p-0">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Rate</h1>
        <p class="page-subtitle">Interactive rating components with customization options, tooltips, and review features</p>
      </div>
      
      <n-grid :cols="2" :x-gap="12">
        <n-gi>
          <BasicRate />
          <CountRate />
          <HalfRate />
          <ColorsRate />
        </n-gi>
        <n-gi>
          <SizesRate />
          <CustomRate />
          <TooltipsRate />
          <EventsRate />
        </n-gi>
      </n-grid>
      
      <ReviewRate />
    </n-space>
  </div>
</template>

<style scoped>
</style>
