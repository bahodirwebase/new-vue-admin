<script setup lang="ts">
import { NSpace, NGrid, NGi } from 'naive-ui'

import PageHeader from "@/components/custom/PageHeader.vue";
import BasicDivider from './widgets/BasicDivider.vue'
import CustomStyleDivider from './widgets/CustomStyleDivider.vue'
import RichContentDivider from './widgets/RichContentDivider.vue'

</script>
<template>
  <div class="divider-page">
    <n-space vertical :size="24">
      <PageHeader title="Divider" subtitle="Visual separators to divide content and create visual hierarchy" />

      <!-- Basic and Custom Style Dividers -->
      <n-grid :x-gap="18" :y-gap="18" cols="xxs:1 md:2" responsive="screen">
        <n-gi>
          <BasicDivider />
        </n-gi>

        <n-gi>
          <CustomStyleDivider />
        </n-gi>
      </n-grid>

      <!-- Rich Content Divider -->
      <RichContentDivider />
    </n-space>
  </div>
</template>

<style lang="scss">
@use './styles/divider.scss';
</style>
