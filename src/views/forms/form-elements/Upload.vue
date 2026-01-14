<template>
  <div class="upload-demo">
    <n-space vertical :size="24">
      <n-card title="Basic Upload">
        <n-space vertical :size="16">
          <n-upload
            v-model:file-list="basicFileList"
            action="/api/upload"
            :default-upload="false"
          >
            <n-button>Click to Upload</n-button>
          </n-upload>
          <n-p>Files: {{ basicFileList.length }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Multiple Files">
        <n-space vertical :size="16">
          <n-upload
            v-model:file-list="multipleFileList"
            action="/api/upload"
            multiple
            :default-upload="false"
          >
            <n-button>Upload Multiple Files</n-button>
          </n-upload>
          <n-p>Files: {{ multipleFileList.length }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Drag and Drop">
        <n-space vertical :size="16">
          <n-upload
            v-model:file-list="dragFileList"
            action="/api/upload"
            directory-dnd
            :default-upload="false"
          >
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

      <n-card title="File Types">
        <n-space vertical :size="16">
          <n-upload
            v-model:file-list="imageFileList"
            action="/api/upload"
            accept="image/*"
            :default-upload="false"
          >
            <n-button>Upload Images Only</n-button>
          </n-upload>
          <n-upload
            v-model:file-list="documentFileList"
            action="/api/upload"
            accept=".pdf,.doc,.docx"
            :default-upload="false"
          >
            <n-button>Upload Documents</n-button>
          </n-upload>
        </n-space>
      </n-card>

      <n-card title="Size Limit">
        <n-space vertical :size="16">
          <n-upload
            v-model:file-list="sizeFileList"
            action="/api/upload"
            :max-size="1024 * 1024"
            @exceed="handleSizeError"
            :default-upload="false"
          >
            <n-button>Upload (Max 1MB)</n-button>
          </n-upload>
          <n-p>Files: {{ sizeFileList.length }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Custom Action">
        <n-space vertical :size="16">
          <n-upload
            v-model:file-list="customFileList"
            :custom-request="customUpload"
            @change="handleCustomChange"
          >
            <n-button>Custom Upload</n-button>
          </n-upload>
          <n-p>Files: {{ customFileList.length }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Before Upload">
        <n-space vertical :size="16">
          <n-upload
            v-model:file-list="beforeFileList"
            :before-upload="beforeUpload"
            @change="handleBeforeChange"
          >
            <n-button>Upload with Validation</n-button>
          </n-upload>
          <n-p>Files: {{ beforeFileList.length }}</n-p>
        </n-space>
      </n-card>

      <n-card title="Upload Progress">
        <n-space vertical :size="16">
          <n-upload
            v-model:file-list="progressFileList"
            :custom-request="uploadWithProgress"
            @change="handleProgressChange"
          >
            <n-button>Upload with Progress</n-button>
          </n-upload>
          <div v-if="uploadProgress > 0" style="margin-top: 12px;">
            <n-progress :percentage="uploadProgress" />
          </div>
        </n-space>
      </n-card>

      <n-card title="Real World Example - Profile Picture">
        <n-space vertical :size="16">
          <div class="profile-upload">
            <n-avatar 
              v-if="profilePicture" 
              :size="120" 
              :src="profilePicture.url" 
            />
            <n-avatar v-else :size="120">
              <n-icon size="48">
                <PersonOutline />
              </n-icon>
            </n-avatar>
            <n-upload
              v-model:file-list="profileFileList"
              :max="1"
              accept="image/*"
              :before-upload="beforeProfileUpload"
              @change="handleProfileChange"
              style="margin-top: 12px;"
            >
              <n-button type="primary">Change Profile Picture</n-button>
            </n-upload>
            <n-input
              v-model:value="profileName"
              placeholder="Profile name"
              style="margin-top: 12px;"
            />
            <n-input
              v-model:value="profileBio"
              type="textarea"
              placeholder="Bio"
              :rows="3"
              style="margin-top: 12px;"
            />
          </div>
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CloudUploadOutline, PersonOutline } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'

const message = useMessage()

// Basic Upload
const basicFileList = ref([])

// Multiple Files
const multipleFileList = ref([])

// Drag and Drop
const dragFileList = ref([])

// File Types
const imageFileList = ref([])
const documentFileList = ref([])

// Size Limit
const sizeFileList = ref([])

const handleSizeError = ({ file }: any) => {
  message.error(`${file.name} is too large!`)
}

// Custom Action
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

// Before Upload
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

// Upload Progress
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

// Real World Example - Profile Picture
const profileFileList = ref([])
const profilePicture = ref<{ url: string } | null>(null)
const profileName = ref('')
const profileBio = ref('')

const beforeProfileUpload = (data: any) => {
  if (!data.file.file?.type.startsWith('image/')) {
    message.error('Please upload an image file')
    return false
  }
  return true
}

const handleProfileChange = (options: any) => {
  if (options.file && options.file.status === 'finished') {
    profilePicture.value = {
      url: options.file.url || URL.createObjectURL(options.file.file)
    }
  }
}
</script>

<style scoped>
.upload-demo {
  padding: 0;
}

.n-card {
  margin-bottom: 16px;
}

.n-p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
}

.profile-upload {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  background: var(--bg-secondary);
  text-align: center;
}
</style>
