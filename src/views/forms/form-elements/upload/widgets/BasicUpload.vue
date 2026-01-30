<template>
  <n-card title="Basic Upload">
    <n-space vertical :size="16">
      <n-upload v-model:file-list="basicFileList" action="/api/upload" :default-upload="false">
        <n-button>Click to Upload</n-button>
      </n-upload>
      <n-p>Files: {{ basicFileList.length }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const basicFileList = ref([])
</script>
