<script setup lang="ts">
import PageHeader from "@/components/custom/PageHeader.vue"
import BasicUpload from './widgets/BasicUpload.vue'
import MultipleUpload from './widgets/MultipleUpload.vue'
import DragUpload from './widgets/DragUpload.vue'
import TypesUpload from './widgets/TypesUpload.vue'
import SizeUpload from './widgets/SizeUpload.vue'
import CustomUpload from './widgets/CustomUpload.vue'
import BeforeUpload from './widgets/BeforeUpload.vue'
import ProgressUpload from './widgets/ProgressUpload.vue'
import ProfileUpload from './widgets/ProfileUpload.vue'
</script>

<template>
  <div class="upload-demo p-0">
    <n-space vertical :size="18">
      <PageHeader title="Upload" subtitle="File upload components with drag-drop, progress tracking, and validation features" />
      
      <n-grid cols="1 sm:2" responsive="screen" :x-gap="12">
        <n-gi>
          <BasicUpload />
          <MultipleUpload />
          <DragUpload />
          <TypesUpload />
          <SizeUpload />
        </n-gi>
        <n-gi>
          <CustomUpload />
          <BeforeUpload />
          <ProgressUpload />
          <ProfileUpload />
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<style scoped>
</style>
