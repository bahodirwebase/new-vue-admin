<script setup lang="ts">
import { NSpace, NIcon } from 'naive-ui'
import { ICON_COLORS } from '../constants'
import { HeartOutline } from '@vicons/ionicons5'
</script>

<template>
  <div>
    <h4>Icon Color Variations</h4>
    <n-space :size="24">
      <div v-for="color in ICON_COLORS" :key="color.label" class="color-example">
        <n-icon :component="HeartOutline" :size="24" :style="{ color: color.value }" />
        <span class="color-label">{{ color.label }}</span>
      </div>
    </n-space>
  </div>
</template>
