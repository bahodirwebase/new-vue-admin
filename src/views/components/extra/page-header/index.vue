<script setup lang="ts">
import { NSpace, NGrid, NGi, NCard } from 'naive-ui'

import BasicHeaders from './widgets/BasicHeaders.vue'
import BreadcrumbHeaders from './widgets/BreadcrumbHeaders.vue'
import AvatarHeaders from './widgets/AvatarHeaders.vue'
import TagHeaders from './widgets/TagHeaders.vue'
import CustomContent from './widgets/CustomContent.vue'
import FooterContent from './widgets/FooterContent.vue'
import RealWorldExamples from './widgets/RealWorldExamples.vue'
</script>

<template>
  <div class="page-header-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Page Header</h1>
        <p class="page-subtitle">Comprehensive page headers with navigation, breadcrumbs, and actions</p>
      </div>
      
      <n-grid x-gap="12" :cols="2">
        <n-gi>
          <n-card title="Basic Headers">
            <BasicHeaders />
          </n-card>

          <n-card title="Headers with Breadcrumbs">
            <BreadcrumbHeaders />
          </n-card>

          <n-card title="Headers with Avatar">
            <AvatarHeaders />
          </n-card>

          <n-card title="Headers with Tags">
            <TagHeaders />
          </n-card>
        </n-gi>
        
        <n-gi>
          <n-card title="Custom Content">
            <CustomContent />
          </n-card>

          <n-card title="Footer Content">
            <FooterContent />
          </n-card>

          <n-card title="Real-world Examples">
            <RealWorldExamples />
          </n-card>
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<style lang="scss">
@use './styles/page-header.scss';
</style>
