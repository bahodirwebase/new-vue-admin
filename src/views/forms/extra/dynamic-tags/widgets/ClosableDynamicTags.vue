<script setup lang="ts">
import { ref } from 'vue'
import CustomDynamicTags from '@/components/custom/CustomDynamicTags.vue'

const tags = ref(['Frontend', 'Backend', 'DevOps'])
</script>

<template>
  <n-card title="Closable Tags">
    <n-space vertical :size="16">
      <CustomDynamicTags v-model:value="tags" :closable="true" variant="filled" placeholder="Add tag" />
      <n-p>Tags: {{ JSON.stringify(tags) }}</n-p>
    </n-space>
  </n-card>
</template>


