<script setup lang="ts">
import { ref } from 'vue'
import { HeartOutline } from '@vicons/ionicons5'

const customValue = ref(4)
</script>

<template>
  <n-card title="Rate with Custom Icons">
    <n-space vertical :size="16">
      <n-rate v-model:value="customValue">
        <template #icon>
          <n-icon :component="HeartOutline" />
        </template>
      </n-rate>
      <n-p>Rating: {{ customValue }}</n-p>
    </n-space>
  </n-card>
</template>