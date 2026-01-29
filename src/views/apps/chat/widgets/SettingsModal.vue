<script lang="ts" setup>
import { useChatStore } from "../store";
const chatStore = useChatStore();
</script>
<template>
  <n-modal
    v-model:show="chatStore.showSettings"
    preset="card"
    title="Settings"
    class="settings-modal"
    style="max-width: 400px"
  >
    <div class="settings-form">
      <n-form ref="settingsForm" :model="chatStore.settingsData">
        <n-form-item label="Notifications">
          <n-switch v-model:value="chatStore.settingsData.notifications" />
        </n-form-item>
        <n-form-item label="Sound">
          <n-switch v-model:value="chatStore.settingsData.sound" />
        </n-form-item>
        <n-form-item label="Dark Mode">
          <n-switch v-model:value="chatStore.settingsData.darkMode" />
        </n-form-item>
        <n-form-item label="Message Preview">
          <n-switch v-model:value="chatStore.settingsData.messagePreview" />
        </n-form-item>
      </n-form>
    </div>
    <template #action>
      <n-space justify="end">
        <n-button @click="chatStore.showSettings = false">Cancel</n-button>
        <n-button type="primary" @click="chatStore.saveSettings">Save</n-button>
      </n-space>
    </template>
  </n-modal>
</template>
