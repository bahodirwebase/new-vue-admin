<script setup lang="ts">
import {
  ImageOutline,
  DocumentTextOutline,
  LinkOutline,
  NotificationsOffOutline,
  TrashOutline,
  ExitOutline,
} from "@vicons/ionicons5";
import { useChatStore } from "../store";
import { useChat } from "../composables/useChat";

const chatStore = useChatStore();
const { activeChat } = useChat();
</script>

<template>
  <n-drawer
    v-model:show="chatStore.showChatInfo"
    :width="320"
    placement="right"
  >
    <n-drawer-content title="Chat Information" closable>
      <div class="chat-info-sidebar">
        <div class="info-header">
          <n-avatar
            round
            :size="60"
            :style="{ backgroundColor: activeChat.color }"
          >
            {{ activeChat.initials }}
          </n-avatar>
          <div class="info-details">
            <h3>{{ activeChat.name }}</h3>
            <div class="info-status">{{ activeChat.status }}</div>
          </div>
        </div>

        <div class="info-section">
          <h4>Shared Media</h4>
          <n-space vertical size="small">
            <div class="media-item">
              <n-icon :component="ImageOutline" :size="20" />
              <span>Photos & Videos</span>
            </div>
            <div class="media-item">
              <n-icon :component="DocumentTextOutline" :size="20" />
              <span>Documents</span>
            </div>
            <div class="media-item">
              <n-icon :component="LinkOutline" :size="20" />
              <span>Links</span>
            </div>
          </n-space>
        </div>

        <div class="info-section">
          <h4>Actions</h4>
          <n-space vertical size="small">
            <n-button block quaternary justify="start">
              <template #icon>
                <n-icon :component="NotificationsOffOutline" />
              </template>
              Mute Notifications
            </n-button>
            <n-button block quaternary justify="start">
              <template #icon>
                <n-icon :component="TrashOutline" />
              </template>
              Clear Chat
            </n-button>
            <n-button block quaternary justify="start" type="error">
              <template #icon>
                <n-icon :component="ExitOutline" />
              </template>
              Leave Chat
            </n-button>
          </n-space>
        </div>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>
