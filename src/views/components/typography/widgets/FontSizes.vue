<script setup lang="ts">
import { NSpace } from 'naive-ui'
import { FONT_SIZES } from '../constants'
</script>

<template>
  <n-space vertical :size="12">
    <div v-for="size in FONT_SIZES" :key="size.class" :class="size.class">
      {{ size.label }} - {{ size.size }}
    </div>
  </n-space>
</template>
