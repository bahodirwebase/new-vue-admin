<script setup lang="ts">

import BasicTags from './widgets/BasicTags.vue'
import TagStyles from './widgets/TagStyles.vue'
import TagFeatures from './widgets/TagFeatures.vue'
import InteractiveTags from './widgets/InteractiveTags.vue'


</script>
<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Tag</h1>
        <p class="page-subtitle">Tags are used for categorizing and labeling content</p>
      </div>

      <n-grid x-gap="12" :cols="2" >
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
