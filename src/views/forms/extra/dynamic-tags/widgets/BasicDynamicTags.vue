<template>
  <n-card title="Basic Dynamic Tags">
    <n-space vertical :size="16">
      <CustomDynamicTags v-model:value="tags" placeholder="Add tag" :colorful="false" variant="outlined" />
      <n-p>Tags: {{ JSON.stringify(tags) }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CustomDynamicTags from '@/components/CustomDynamicTags.vue'

const tags = ref(['Vue.js', 'TypeScript'])
</script>
