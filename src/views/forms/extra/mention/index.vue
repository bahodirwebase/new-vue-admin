<script setup lang="ts">
import BasicMention from './widgets/BasicMention.vue'
import PrefixMention from './widgets/PrefixMention.vue'
import AsyncMention from './widgets/AsyncMention.vue'
import CustomMention from './widgets/CustomMention.vue'
import TextareaMention from './widgets/TextareaMention.vue'
import ValidationMention from './widgets/ValidationMention.vue'
import CommentMention from './widgets/CommentMention.vue'
</script>

<template>
  <div class="mention-demo">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Mention</h1>
        <p class="page-subtitle">Advanced mention components with async loading, validation, and custom styling options</p>
      </div>
      
      <n-grid :cols="2" :x-gap="12">
        <n-gi>
          <BasicMention />
          <PrefixMention />
          <AsyncMention />
          <CustomMention />
        </n-gi>
        <n-gi>
          <TextareaMention />
          <ValidationMention />
          <CommentMention />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<style scoped>
.mention-demo {
  padding: 0;
}

.page-title {
  font-family: var(--font-secondary);
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
}
</style>
