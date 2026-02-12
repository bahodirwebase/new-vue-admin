<script setup lang="ts">
import { ref } from 'vue'
import CustomDynamicTags from '@/components/CustomDynamicTags.vue'

const tags = ref(['Feature'])
const suggestions = ['Feature', 'Bug', 'Enhancement', 'Documentation', 'Testing', 'Refactor']
</script>

<template>
  <n-card title="Tags with Presets">
    <n-space vertical :size="16">
      <CustomDynamicTags v-model:value="tags" :suggestions="suggestions" variant="subtle"
        placeholder="Type to see suggestions..." />
      <n-p>Selected: {{ JSON.stringify(tags) }}</n-p>
    </n-space>
  </n-card>
</template>


