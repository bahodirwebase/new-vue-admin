<script setup lang="ts">
import { NSpace, NIcon } from 'naive-ui'
import { ICON_SIZES } from '../constants'
import { HomeOutline } from '@vicons/ionicons5'
</script>

<template>
  <div>
    <h4>Different Icon Sizes</h4>
    <n-space :size="24">
      <div v-for="size in ICON_SIZES" :key="size.value" class="size-example">
        <n-icon :component="HomeOutline" :size="size.value" />
        <span class="size-label">{{ size.label }}</span>
      </div>
    </n-space>
  </div>
</template>
