<script setup lang="ts">
import { NSpace } from 'naive-ui'
import { TEXT_DECORATIONS } from '../constants'
</script>

<template>
  <n-space vertical :size="12">
    <div v-for="decoration in TEXT_DECORATIONS" :key="decoration.class" :class="decoration.class">
      {{ decoration.label }} Text
    </div>
  </n-space>
</template>
