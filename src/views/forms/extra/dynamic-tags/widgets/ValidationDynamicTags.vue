<script setup lang="ts">
import { ref } from 'vue'
import { NText } from 'naive-ui'
import CustomDynamicTags from '@/components/CustomDynamicTags.vue'

const tags = ref(['Design', 'Development', 'Product'])
</script>

<template>
  <n-card title="Validation Tags (Max 5)">
    <n-space vertical :size="16">
      <CustomDynamicTags v-model:value="tags" :max="5" variant="subtle" placeholder="Add up to 5 tags" />
      <n-text depth="3">Try adding more than 5 tags to see validation.</n-text>
    </n-space>
  </n-card>
</template>


