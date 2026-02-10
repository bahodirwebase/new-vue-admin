<script setup lang="ts">
import BasicDynamicTags from './widgets/BasicDynamicTags.vue'
import ValidationDynamicTags from './widgets/ValidationDynamicTags.vue'
import ClosableDynamicTags from './widgets/ClosableDynamicTags.vue'
import MaxDynamicTags from './widgets/MaxDynamicTags.vue'
import PresetsDynamicTags from './widgets/PresetsDynamicTags.vue'
import ProjectDynamicTags from './widgets/ProjectDynamicTags.vue'
</script>

<template>
  <div class="dynamic-tags-demo p-0">
    <n-space vertical :size="18">
      <div class="page-header">
        <h1 class="page-title">Dynamic Tags</h1>
        <p class="page-subtitle">Flexible tag management components with validation, presets, and custom styling options
        </p>
      </div>

      <n-grid :x-gap="16" :y-gap="16" cols="1 lg:2" responsive="screen">
        <n-gi>
          <n-space vertical :size="16">
            <BasicDynamicTags />
            <ClosableDynamicTags />
            <MaxDynamicTags />
            <ValidationDynamicTags />
          </n-space>
        </n-gi>
        <n-gi>
          <n-space vertical :size="16">
            <PresetsDynamicTags />
            <ProjectDynamicTags />
          </n-space>
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<style scoped></style>
