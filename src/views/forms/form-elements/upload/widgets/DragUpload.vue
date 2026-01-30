<template>
  <n-card title="Drag and Drop">
    <n-space vertical :size="16">
      <n-upload v-model:file-list="dragFileList" action="/api/upload" directory-dnd :default-upload="false">
        <n-upload-dragger>
          <div style="margin-bottom: 12px">
            <n-icon size="48" :depth="3">
              <CloudUploadOutline />
            </n-icon>
          </div>
          <n-text style="font-size: 16px">
            Click or drag files to this area to upload
          </n-text>
          <n-p depth="3" style="margin: 8px 0 0 0">
            Support for single or bulk upload. Strictly prohibit from uploading company data or other
            band files
          </n-p>
        </n-upload-dragger>
      </n-upload>
      <n-p>Files: {{ dragFileList.length }}</n-p>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CloudUploadOutline } from '@vicons/ionicons5'

const dragFileList = ref([])
</script>
