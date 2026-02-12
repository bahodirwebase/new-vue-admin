<script setup lang="ts">
import { ref } from 'vue'

const imageFileList = ref([])
const documentFileList = ref([])
</script>

<template>
  <n-card title="File Types">
    <n-space vertical :size="16">
      <n-upload v-model:file-list="imageFileList" action="/api/upload" accept="image/*" :default-upload="false">
        <n-button>Upload Images Only</n-button>
      </n-upload>
      <n-upload v-model:file-list="documentFileList" action="/api/upload" accept=".pdf,.doc,.docx"
        :default-upload="false">
        <n-button>Upload Documents</n-button>
      </n-upload>
    </n-space>
  </n-card>
</template>