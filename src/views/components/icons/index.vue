<script setup lang="ts">
import { NSpace, NCard } from 'naive-ui'

import PopularIcons from './widgets/PopularIcons.vue'
import IconSizes from './widgets/IconSizes.vue'
import IconColors from './widgets/IconColors.vue'
import NavigationIcons from './widgets/NavigationIcons.vue'
import ActionIcons from './widgets/ActionIcons.vue'
import SocialIcons from './widgets/SocialIcons.vue'
import UsageExamples from './widgets/UsageExamples.vue'
import AnimatedIcons from './widgets/AnimatedIcons.vue'
</script>

<template>
  <div class="icons-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Icons</h1>
        <p class="page-subtitle">Icon library and usage examples</p>
      </div>

      <n-card title="Ionicons 5">
        <PopularIcons />
      </n-card>

      <n-card title="Icon Sizes">
        <IconSizes />
      </n-card>

      <n-card title="Icon Colors">
        <IconColors />
      </n-card>

      <n-card title="Navigation Icons">
        <NavigationIcons />
      </n-card>

      <n-card title="Action Icons">
        <ActionIcons />
      </n-card>

      <n-card title="Social Icons">
        <SocialIcons />
      </n-card>

      <n-card title="Icon Usage Examples">
        <UsageExamples />
      </n-card>

      <n-card title="Animated Icons">
        <AnimatedIcons />
      </n-card>
    </n-space>
  </div>
</template>

<style>
@import './styles/icons.scss';
</style>
