<script setup lang="ts">
import { NSpace } from 'naive-ui'
import { TEXT_TRANSFORMS } from '../constants'
</script>

<template>
  <n-space vertical :size="12">
    <div v-for="transform in TEXT_TRANSFORMS" :key="transform.class" :class="transform.class">
      {{ transform.label }} Text
    </div>
  </n-space>
</template>
