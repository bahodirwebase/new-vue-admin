<template>
  <n-card title="Before Upload">
    <n-space vertical :size="16">
      <n-upload v-model:file-list="beforeFileList" :before-upload="beforeUpload" @change="handleBeforeChange">
        <n-button>Upload with Validation</n-button>
      </n-upload>
      <n-p>Files: {{ beforeFileList.length }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMessage } from 'naive-ui'

const message = useMessage()
const beforeFileList = ref([])

const beforeUpload = (data: any) => {
  if (data.file.file?.size > 1024 * 1024) {
    message.error('File size must be less than 1MB')
    return false
  }
  return true
}

const handleBeforeChange = (options: any) => {
  console.log('Before upload:', options)
}
</script>
