<template>
  <n-card title="Custom Action">
    <n-space vertical :size="16">
      <n-upload v-model:file-list="customFileList" :custom-request="customUpload" @change="handleCustomChange">
        <n-button>Custom Upload</n-button>
      </n-upload>
      <n-p>Files: {{ customFileList.length }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const customFileList = ref([])

const customUpload = ({ file, onFinish }: any) => {
  setTimeout(() => {
    onFinish({
      url: `https://example.com/${file.file.name}`
    })
  }, 1000)
}

const handleCustomChange = (options: any) => {
  console.log('Custom upload:', options)
}
</script>
