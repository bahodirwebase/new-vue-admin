<script setup lang="ts">
import { ref } from 'vue'

const verticalValue = ref(50)
const verticalRangeValue = ref([20, 80])
</script>

<template>
  <n-card title="Vertical Slider">
    <n-space vertical :size="16">
      <div style="display: flex; align-items: center; gap: 24px;">
        <div>
          <span style="margin-right: 12px;">Vertical:</span>
          <n-slider v-model:value="verticalValue" vertical style="height: 200px;" />
        </div>
        <div>
          <span style="margin-right: 12px;">Vertical Range:</span>
          <n-slider v-model:value="verticalRangeValue" vertical range style="height: 200px;" />
        </div>
      </div>
    </n-space>
  </n-card>
</template>