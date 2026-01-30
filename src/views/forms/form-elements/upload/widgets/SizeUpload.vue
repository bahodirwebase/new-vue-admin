<template>
  <n-card title="Size Limit">
    <n-space vertical :size="16">
      <n-upload v-model:file-list="sizeFileList" action="/api/upload" :max-size="1024 * 1024"
        @exceed="handleSizeError" :default-upload="false">
        <n-button>Upload (Max 1MB)</n-button>
      </n-upload>
      <n-p>Files: {{ sizeFileList.length }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMessage } from 'naive-ui'

const message = useMessage()
const sizeFileList = ref([])

const handleSizeError = ({ file }: any) => {
  message.error(`${file.name} is too large!`)
}
</script>
