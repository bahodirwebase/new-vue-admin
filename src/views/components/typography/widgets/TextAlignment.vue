<script setup lang="ts">
import { NSpace } from 'naive-ui'
import { TEXT_ALIGNMENTS } from '../constants'
</script>

<template>
  <n-space vertical :size="12">
    <div v-for="alignment in TEXT_ALIGNMENTS" :key="alignment.class" :class="alignment.class">
      {{ alignment.label }} aligned text
    </div>
    <div class="text-justify">
      Justified text that spans multiple lines and demonstrates how text justification works when there is enough content to wrap across multiple lines. The text is distributed evenly across the line.
    </div>
  </n-space>
</template>
