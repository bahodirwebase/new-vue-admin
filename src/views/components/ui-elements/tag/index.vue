<script setup lang="ts">
import PageHeader from "@/components/custom/PageHeader.vue";

import BasicTags from './widgets/BasicTags.vue'
import TagStyles from './widgets/TagStyles.vue'
import TagFeatures from './widgets/TagFeatures.vue'
import InteractiveTags from './widgets/InteractiveTags.vue'

</script>
<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <PageHeader title="Tag" subtitle="Tags are used for categorizing and labeling content" />

      <n-grid x-gap="12" cols="1 sm:2" responsive="screen">
        <n-gi>
          <BasicTags />
          <TagStyles />
        </n-gi>
        <n-gi>
          <TagFeatures />
          <InteractiveTags />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>
