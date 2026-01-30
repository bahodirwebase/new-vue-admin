<template>
  <n-card title="Upload Progress">
    <n-space vertical :size="16">
      <n-upload v-model:file-list="progressFileList" :custom-request="uploadWithProgress"
        @change="handleProgressChange">
        <n-button>Upload with Progress</n-button>
      </n-upload>
      <div v-if="uploadProgress > 0" style="margin-top: 12px;">
        <n-progress :percentage="uploadProgress" />
      </div>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const progressFileList = ref([])
const uploadProgress = ref(0)

const uploadWithProgress = ({ file, onProgress, onFinish }: any) => {
  let progress = 0
  const interval = setInterval(() => {
    progress += 10
    onProgress({ percent: progress })
    if (progress >= 100) {
      clearInterval(interval)
      if (onFinish) {
        onFinish({ url: `https://example.com/${file.file.name}` })
      }
    }
  }, 200)
}

const handleProgressChange = (options: any) => {
  console.log('Progress upload:', options)
}
</script>
