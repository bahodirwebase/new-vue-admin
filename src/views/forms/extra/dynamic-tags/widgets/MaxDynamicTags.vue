<template>
  <n-card title="Max Tags Limit (3)">
    <n-space vertical :size="16">
      <CustomDynamicTags v-model:value="tags" :max="3" variant="ghost" placeholder="Max 3 tags" />
      <n-p>Tags: {{ JSON.stringify(tags) }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CustomDynamicTags from '@/components/CustomDynamicTags.vue'

const tags = ref(['Tag 1', 'Tag 2', 'Tag 3'])
</script>
