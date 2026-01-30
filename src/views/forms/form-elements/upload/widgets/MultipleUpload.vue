<template>
  <n-card title="Multiple Files">
    <n-space vertical :size="16">
      <n-upload v-model:file-list="multipleFileList" action="/api/upload" multiple :default-upload="false">
        <n-button>Upload Multiple Files</n-button>
      </n-upload>
      <n-p>Files: {{ multipleFileList.length }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const multipleFileList = ref([])
</script>
