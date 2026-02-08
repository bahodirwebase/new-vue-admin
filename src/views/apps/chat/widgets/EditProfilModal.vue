<script lang="ts" setup>
import { useChatStore } from "../store";

const chatStore = useChatStore();
</script>
<template>
  <n-modal
    v-model:show="chatStore.showEditProfile"
    preset="dialog"
    title="Edit Profile"
    class="profile-modal"
    style="max-width: 400px"
  >
    <div class="profile-form">
      <n-form ref="profileForm" :model="chatStore.profileData">
        <n-form-item label="Name">
          <n-input v-model:value="chatStore.profileData.name" placeholder="Your name" />
        </n-form-item>
        <n-form-item label="Status">
          <n-input
            v-model:value="chatStore.profileData.status"
            placeholder="Your status"
          />
        </n-form-item>
        <n-form-item label="Bio">
          <n-input
            v-model:value="chatStore.profileData.bio"
            type="textarea"
            placeholder="Tell us about yourself"
            :autosize="{ minRows: 3, maxRows: 5 }"
          />
        </n-form-item>
      </n-form>
    </div>
    <template #action>
      <n-space justify="end">
        <n-button @click="chatStore.showEditProfile = false">Cancel</n-button>
        <n-button type="primary" @click="chatStore.saveProfile">Save</n-button>
      </n-space>
    </template>
  </n-modal>
</template>
