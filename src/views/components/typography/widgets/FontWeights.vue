<script setup lang="ts">
import { NSpace } from 'naive-ui'
import { FONT_WEIGHTS } from '../constants'
</script>

<template>
  <n-space vertical :size="12">
    <div v-for="weight in FONT_WEIGHTS" :key="weight.class" :class="weight.class">
      {{ weight.label }} Font Weight ({{ weight.weight }})
    </div>
  </n-space>
</template>
