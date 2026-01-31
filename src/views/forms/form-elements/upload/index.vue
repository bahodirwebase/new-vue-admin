<script setup lang="ts">
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
      <div class="page-header">
        <h1 class="page-title">Upload</h1>
        <p class="page-subtitle">File upload components with drag-drop, progress tracking, and validation features</p>
      </div>
      
      <n-grid :cols="2" :x-gap="12">
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
