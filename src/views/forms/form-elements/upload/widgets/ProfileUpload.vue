<template>
  <n-card title="Real World Example - Profile Picture">
    <n-space vertical :size="16">
      <div class="profile-upload">
        <n-avatar v-if="profilePicture" :size="120" :src="profilePicture.url" />
        <n-avatar v-else :size="120">
          <n-icon size="48">
            <PersonOutline />
          </n-icon>
        </n-avatar>
        <n-upload v-model:file-list="profileFileList" :max="1" accept="image/*"
          :before-upload="beforeProfileUpload" @change="handleProfileChange" style="margin-top: 12px;">
          <n-button type="primary">Change Profile Picture</n-button>
        </n-upload>
        <n-input v-model:value="profileName" placeholder="Profile name" style="margin-top: 12px;" />
        <n-input v-model:value="profileBio" type="textarea" placeholder="Bio" :rows="3"
          style="margin-top: 12px;" />
      </div>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PersonOutline } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'

const message = useMessage()
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
.profile-upload {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  background: var(--bg-secondary);
  text-align: center;
}
</style>
