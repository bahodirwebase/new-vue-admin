<template>
  <n-card title="Radio Size Variants">
    <n-space vertical :size="16">
      <n-space align="center" :size="12">
        <span>Small:</span>
        <n-radio-group v-model:value="sizeRadio" size="small">
          <n-radio value="a">A</n-radio>
          <n-radio value="b">B</n-radio>
        </n-radio-group>
      </n-space>
      <n-space align="center" :size="12">
        <span>Medium:</span>
        <n-radio-group v-model:value="sizeRadio" size="medium">
          <n-radio value="a">A</n-radio>
          <n-radio value="b">B</n-radio>
        </n-radio-group>
      </n-space>
      <n-space align="center" :size="12">
        <span>Large:</span>
        <n-radio-group v-model:value="sizeRadio" size="large">
          <n-radio value="a">A</n-radio>
          <n-radio value="b">B</n-radio>
        </n-radio-group>
      </n-space>
      <n-p>Selected value: {{ sizeRadio || 'None' }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const sizeRadio = ref('')
</script>
