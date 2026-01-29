<script lang="ts" setup>
import {
  CreateOutline,
  SettingsOutline,
  SearchOutline,
} from "@vicons/ionicons5";
import { useChatStore } from "../store";
import { useChat } from "../composables/useChat";

const chatStore = useChatStore();
const { filteredChats, filteredContacts, formatTime } = useChat();
</script>
<template>
  <n-card class="chat-sidebar" :bordered="false">
    <div class="sidebar-header">
      <div class="user-profile">
        <n-avatar
          round
          :size="40"
          :style="{ backgroundColor: chatStore.user.color }"
        >
          {{ chatStore.user.initials }}
        </n-avatar>
        <div class="user-info">
          <div class="user-name">{{ chatStore.user.name }}</div>
          <div class="user-status">Online</div>
        </div>
      </div>
      <n-space :size="8">
        <n-button
          quaternary
          circle
          size="small"
          @click="chatStore.showEditProfile = true"
        >
          <template #icon>
            <n-icon :component="CreateOutline" />
          </template>
        </n-button>
        <n-button
          quaternary
          circle
          size="small"
          @click="chatStore.showSettings = true"
        >
          <template #icon>
            <n-icon :component="SettingsOutline" />
          </template>
        </n-button>
      </n-space>
    </div>

    <div class="search-section">
      <n-input
        v-model:value="chatStore.searchQuery"
        placeholder="Search conversations..."
        clearable
        class="search-input"
      >
        <template #prefix>
          <n-icon :component="SearchOutline" />
        </template>
      </n-input>
    </div>

    <div class="sidebar-section">
      <div class="section-title">Chats</div>
      <n-space vertical size="small">
        <div
          v-for="chat in filteredChats"
          :key="chat.id"
          class="contact-item"
          :class="{ 'active-chat': chatStore.activeChatId === chat.id }"
          @click="chatStore.activeChatId = chat.id"
        >
          <n-avatar round :size="32" :style="{ backgroundColor: chat.color }">
            {{ chat.initials }}
          </n-avatar>
          <div class="contact-info">
            <div class="contact-name">{{ chat.name }}</div>
            <div class="contact-message">{{ chat.lastMessage }}</div>
          </div>
          <div class="contact-time">{{ formatTime(chat.lastMessageTime) }}</div>
          <div class="contact-badge" v-if="chat.unread">
            <n-badge :value="chat.unread" :max="99" />
          </div>
        </div>
      </n-space>
    </div>

    <div class="sidebar-section">
      <div class="section-title">Contacts</div>
      <n-space vertical size="small">
        <div
          v-for="contact in filteredContacts"
          :key="contact.id"
          class="contact-item"
          @click="chatStore.startNewChat(contact)"
        >
          <n-avatar
            round
            :size="32"
            :style="{ backgroundColor: contact.color }"
          >
            {{ contact.initials }}
          </n-avatar>
          <div class="contact-info">
            <div class="contact-name">{{ contact.name }}</div>
            <div class="contact-status">{{ contact.status }}</div>
          </div>
          <div class="contact-badge" v-if="contact.unread">
            <n-badge :value="contact.unread" :max="99" />
          </div>
        </div>
      </n-space>
    </div>
  </n-card>
</template>
