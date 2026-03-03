<script setup lang="ts">
import PageHeader from "@/components/custom/PageHeader.vue"
import BasicMention from './widgets/BasicMention.vue'
import PrefixMention from './widgets/PrefixMention.vue'
import AsyncMention from './widgets/AsyncMention.vue'
import CustomMention from './widgets/CustomMention.vue'
import TextareaMention from './widgets/TextareaMention.vue'
import ValidationMention from './widgets/ValidationMention.vue'
import CommentMention from './widgets/CommentMention.vue'
</script>

<template>
  <div class="mention-demo p-0">
    <n-space vertical :size="18">
      <PageHeader title="Mention" subtitle="Advanced mention components with async loading, validation, and custom styling options" />
      
      <n-grid cols="1 sm:2" responsive="screen" :x-gap="12">
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
</style>
