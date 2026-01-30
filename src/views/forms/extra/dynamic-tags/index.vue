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
  <div class="dynamic-tags-demo">
    <n-space vertical :size="24">
      <n-grid :x-gap="12" :cols="2">
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
.dynamic-tags-demo {
  padding: 0;
}
</style>
