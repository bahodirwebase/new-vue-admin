<script setup lang="ts">
import BasicDynamicTags from './widgets/BasicDynamicTags.vue'
import ClosableDynamicTags from './widgets/ClosableDynamicTags.vue'
import MaxDynamicTags from './widgets/MaxDynamicTags.vue'
import ValidationDynamicTags from './widgets/ValidationDynamicTags.vue'
import CustomDynamicTags from './widgets/CustomDynamicTags.vue'
import PresetsDynamicTags from './widgets/PresetsDynamicTags.vue'
import ProjectDynamicTags from './widgets/ProjectDynamicTags.vue'
</script>

<template>
  <div class="dynamic-tags-demo p-0">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Dynamic Tags</h1>
        <p class="page-subtitle">Flexible tag management components with validation, presets, and custom styling options</p>
      </div>
      
      <n-grid :x-gap="12" cols="1 sm:2" responsive="screen">
        <n-gi>
          <BasicDynamicTags />
          <ClosableDynamicTags />
          <MaxDynamicTags />
          <ValidationDynamicTags />
        </n-gi>
        <n-gi>
          <CustomDynamicTags />
          <PresetsDynamicTags />
          <ProjectDynamicTags />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<style scoped>
</style>
