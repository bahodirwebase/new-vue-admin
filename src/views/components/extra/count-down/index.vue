<script setup lang="ts">
import { NSpace, NGrid, NGi } from 'naive-ui'

import BasicCountdown from './widgets/BasicCountdown.vue'
import PrecisionCountdown from './widgets/PrecisionCountdown.vue'
import CustomFormatCountdown from './widgets/CustomFormatCountdown.vue'
import EventsCountdown from './widgets/EventsCountdown.vue'
import RealWorldCountdown from './widgets/RealWorldCountdown.vue'

</script>
<template>
  <div class="count-down-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Countdown</h1>
        <p class="page-subtitle">Versatile countdown timers with custom formatting and precision control</p>
      </div>

      <!-- Basic and Precision Countdowns -->
      <n-grid :x-gap="18" :y-gap="18" cols="xxs:1 md:2" responsive="screen">
        <n-gi>
          <BasicCountdown />
        </n-gi>

        <n-gi>
          <PrecisionCountdown />
        </n-gi>
      </n-grid>

      <!-- Custom Format and Events -->
      <n-grid :x-gap="18" :y-gap="18" cols="xxs:1 md:2" responsive="screen">
        <n-gi>
          <CustomFormatCountdown />
        </n-gi>

        <n-gi>
          <EventsCountdown />
        </n-gi>
      </n-grid>

      <!-- Real-world Examples -->
      <RealWorldCountdown />
    </n-space>
  </div>
</template>

<style lang="scss">
@use './styles/count-down.scss';
</style>
