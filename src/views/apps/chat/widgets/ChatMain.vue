<script lang="ts" setup>
import {
  ChatbubbleEllipsesOutline,
  SearchOutline,
  InformationCircleOutline,
  EllipsisVerticalOutline,
  HappyOutline,
  AttachOutline,
  MicOutline,
  SendOutline,
  CheckmarkOutline,
  CheckmarkDoneOutline,
} from "@vicons/ionicons5";
import { useChatStore } from "../store";
import { useChat } from "../composables/useChat";
import { CHAT_MENU_DROPDOWN } from "../constants";

const { activeChat, filteredMessages, formatTime } = useChat();
const chatStore = useChatStore();
</script>
<template>
  <div class="chat-main">
    <div v-if="!chatStore.activeChatId" class="chat-welcome">
      <div class="welcome-content">
        <n-icon
          :component="ChatbubbleEllipsesOutline"
          :size="80"
          class="welcome-icon"
        />
        <h2>Welcome to Chat</h2>
        <p>Select a conversation to start messaging</p>
      </div>
    </div>

    <div v-else class="chat-conversation">
      <!-- Chat Header -->
      <div class="chat-header">
        <div class="chat-info">
          <n-avatar
            round
            :size="40"
            :style="{ backgroundColor: activeChat.color }"
          >
            {{ activeChat.initials }}
          </n-avatar>
          <div class="chat-details">
            <div class="chat-name">{{ activeChat.name }}</div>
            <div class="chat-status">{{ activeChat.status }}</div>
          </div>
        </div>
        <n-space :size="8">
          <n-button quaternary circle size="small" @click="chatStore.toggleChatInfo">
            <template #icon>
              <n-icon :component="InformationCircleOutline" />
            </template>
          </n-button>
          <n-button quaternary circle size="small" @click="chatStore.toggleSearch">
            <template #icon>
              <n-icon :component="SearchOutline" />
            </template>
          </n-button>
          <n-dropdown :options="CHAT_MENU_DROPDOWN" placement="bottom-end">
            <n-button quaternary circle size="small">
              <template #icon>
                <n-icon :component="EllipsisVerticalOutline" />
              </template>
            </n-button>
          </n-dropdown>
        </n-space>
      </div>

      <!-- Messages Area -->
      <div class="chat-messages" ref="messagesContainer">
        <div v-if="chatStore.showSearchInChat" class="chat-search">
          <n-input
            v-model:value="chatStore.searchInChatQuery"
            placeholder="Search in this conversation..."
            clearable
            @keyup.enter="chatStore.searchInChat"
          >
            <template #prefix>
              <n-icon :component="SearchOutline" />
            </template>
            <template #suffix>
              <n-button text size="small" @click="chatStore.searchInChat"
                >Search</n-button
              >
            </template>
          </n-input>
        </div>

        <div class="messages-container">
          <div
            v-for="message in filteredMessages"
            :key="message.id"
            class="message-item"
            :class="{ 'message-own': message.isOwn }"
          >
            <div class="message-avatar" v-if="!message.isOwn">
              <n-avatar
                round
                :size="32"
                :style="{ backgroundColor: activeChat.color }"
              >
                {{ activeChat.initials }}
              </n-avatar>
            </div>
            <div class="message-content">
              <div class="message-bubble">
                <div class="message-text">{{ message.text }}</div>
                <div class="message-time">
                  {{ formatTime(message.timestamp) }}
                </div>
              </div>
              <div class="message-status" v-if="message.isOwn">
                <n-icon
                  :component="
                    message.read ? CheckmarkDoneOutline : CheckmarkOutline
                  "
                  :size="16"
                  :color="message.read ? '#3b82f6' : '#6b7280'"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Message Input -->
      <div class="chat-input">
        <div class="input-toolbar">
          <n-space :size="8">
            <n-button
              quaternary
              circle
              size="small"
              @click="chatStore.showEmojiPicker = !chatStore.showEmojiPicker"
            >
              <template #icon>
                <n-icon :component="HappyOutline" />
              </template>
            </n-button>
            <n-button quaternary circle size="small" @click="chatStore.attachFile">
              <template #icon>
                <n-icon :component="AttachOutline" />
              </template>
            </n-button>
            <n-button
              quaternary
              circle
              size="small"
              @click="chatStore.showVoiceRecord = !chatStore.showVoiceRecord"
            >
              <template #icon>
                <n-icon :component="MicOutline" />
              </template>
            </n-button>
          </n-space>
        </div>
        <div class="input-area">
          <n-input
            v-model:value="chatStore.messageInput"
            placeholder="Type a message..."
            type="textarea"
            :autosize="{ minRows: 1, maxRows: 4 }"
            @keydown.enter.prevent="chatStore.sendMessage"
            @keydown.shift.enter="chatStore.handleShiftEnter"
            class="message-input"
          />
          <n-button
            type="primary"
            circle
            :disabled="!chatStore.messageInput.trim()"
            @click="chatStore.sendMessage"
            class="send-button"
          >
            <template #icon>
              <n-icon :component="SendOutline" />
            </template>
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>
