<template>
  <div class="chat-app">
    <div class="chat-layout">
      <!-- Sidebar -->
      <n-card class="chat-sidebar" :bordered="false">
        <div class="sidebar-header">
          <div class="user-profile">
            <n-avatar round :size="40" :style="{ backgroundColor: user.color }">
              {{ user.initials }}
            </n-avatar>
            <div class="user-info">
              <div class="user-name">{{ user.name }}</div>
              <div class="user-status">Online</div>
            </div>
          </div>
          <n-space :size="8">
            <n-button quaternary circle size="small" @click="showEditProfile = true">
              <template #icon>
                <n-icon :component="CreateOutline" />
              </template>
            </n-button>
            <n-button quaternary circle size="small" @click="showSettings = true">
              <template #icon>
                <n-icon :component="SettingsOutline" />
              </template>
            </n-button>
          </n-space>
        </div>

        <div class="search-section">
          <n-input
            v-model:value="searchQuery"
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
              :class="{ 'active-chat': activeChatId === chat.id }"
              @click="handleChatSelect(chat.id)"
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
              @click="startNewChat(contact)"
            >
              <n-avatar round :size="32" :style="{ backgroundColor: contact.color }">
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

      <!-- Main Chat Area -->
      <div class="chat-main">
        <div v-if="!activeChatId" class="chat-welcome">
          <div class="welcome-content">
            <n-icon :component="ChatbubbleEllipsesOutline" :size="80" class="welcome-icon" />
            <h2>Welcome to Chat</h2>
            <p>Select a conversation to start messaging</p>
          </div>
        </div>

        <div v-else class="chat-conversation">
          <!-- Chat Header -->
          <div class="chat-header">
            <div class="chat-info">
              <n-avatar round :size="40" :style="{ backgroundColor: activeChat.color }">
                {{ activeChat.initials }}
              </n-avatar>
              <div class="chat-details">
                <div class="chat-name">{{ activeChat.name }}</div>
                <div class="chat-status">{{ activeChat.status }}</div>
              </div>
            </div>
            <n-space :size="8">
              <n-button quaternary circle size="small" @click="toggleChatInfo">
                <template #icon>
                  <n-icon :component="InformationCircleOutline" />
                </template>
              </n-button>
              <n-button quaternary circle size="small" @click="toggleSearch">
                <template #icon>
                  <n-icon :component="SearchOutline" />
                </template>
              </n-button>
              <n-dropdown :options="chatMenuDropdown" placement="bottom-end">
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
            <div v-if="showSearchInChat" class="chat-search">
              <n-input
                v-model:value="searchInChatQuery"
                placeholder="Search in this conversation..."
                clearable
                @keyup.enter="searchInChat"
              >
                <template #prefix>
                  <n-icon :component="SearchOutline" />
                </template>
                <template #suffix>
                  <n-button text size="small" @click="searchInChat">Search</n-button>
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
                  <n-avatar round :size="32" :style="{ backgroundColor: activeChat.color }">
                    {{ activeChat.initials }}
                  </n-avatar>
                </div>
                <div class="message-content">
                  <div class="message-bubble">
                    <div class="message-text">{{ message.text }}</div>
                    <div class="message-time">{{ formatTime(message.timestamp) }}</div>
                  </div>
                  <div class="message-status" v-if="message.isOwn">
                    <n-icon
                      :component="message.read ? CheckmarkDoneOutline : CheckmarkOutline"
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
                <n-button quaternary circle size="small" @click="showEmojiPicker = !showEmojiPicker">
                  <template #icon>
                    <n-icon :component="HappyOutline" />
                  </template>
                </n-button>
                <n-button quaternary circle size="small" @click="attachFile">
                  <template #icon>
                    <n-icon :component="AttachOutline" />
                  </template>
                </n-button>
                <n-button quaternary circle size="small" @click="showVoiceRecord = !showVoiceRecord">
                  <template #icon>
                    <n-icon :component="MicOutline" />
                  </template>
                </n-button>
              </n-space>
            </div>
            <div class="input-area">
              <n-input
                v-model:value="messageInput"
                placeholder="Type a message..."
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 4 }"
                @keydown.enter.prevent="sendMessage"
                @keydown.shift.enter="handleShiftEnter"
                class="message-input"
              />
              <n-button
                type="primary"
                circle
                :disabled="!messageInput.trim()"
                @click="sendMessage"
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

      <!-- Chat Info Sidebar -->
      <n-drawer v-model:show="showChatInfo" :width="320" placement="right">
        <n-drawer-content title="Chat Information" closable>
          <div class="chat-info-sidebar">
            <div class="info-header">
              <n-avatar round :size="60" :style="{ backgroundColor: activeChat.color }">
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
    </div>

    <!-- Modals -->
    <n-modal v-model:show="showEditProfile" preset="card" title="Edit Profile" class="profile-modal" style="max-width: 400px;">
      <div class="profile-form">
        <n-form ref="profileForm" :model="profileData">
          <n-form-item label="Name">
            <n-input v-model:value="profileData.name" placeholder="Your name" />
          </n-form-item>
          <n-form-item label="Status">
            <n-input v-model:value="profileData.status" placeholder="Your status" />
          </n-form-item>
          <n-form-item label="Bio">
            <n-input
              v-model:value="profileData.bio"
              type="textarea"
              placeholder="Tell us about yourself"
              :autosize="{ minRows: 3, maxRows: 5 }"
            />
          </n-form-item>
        </n-form>
      </div>
      <template #action>
        <n-space justify="end">
          <n-button @click="showEditProfile = false">Cancel</n-button>
          <n-button type="primary" @click="saveProfile">Save</n-button>
        </n-space>
      </template>
    </n-modal>

    <n-modal v-model:show="showSettings" preset="card" title="Settings" class="settings-modal" style="max-width: 400px;">
      <div class="settings-form">
        <n-form ref="settingsForm" :model="settingsData">
          <n-form-item label="Notifications">
            <n-switch v-model:value="settingsData.notifications" />
          </n-form-item>
          <n-form-item label="Sound">
            <n-switch v-model:value="settingsData.sound" />
          </n-form-item>
          <n-form-item label="Dark Mode">
            <n-switch v-model:value="settingsData.darkMode" />
          </n-form-item>
          <n-form-item label="Message Preview">
            <n-switch v-model:value="settingsData.messagePreview" />
          </n-form-item>
        </n-form>
      </div>
      <template #action>
        <n-space justify="end">
          <n-button @click="showSettings = false">Cancel</n-button>
          <n-button type="primary" @click="saveSettings">Save</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useMessage, NAvatar, NBadge } from 'naive-ui'
import {
  ChatbubbleEllipsesOutline,
  CreateOutline,
  SettingsOutline,
  SearchOutline,
  InformationCircleOutline,
  EllipsisVerticalOutline,
  HappyOutline,
  AttachOutline,
  MicOutline,
  SendOutline,
  CheckmarkOutline,
  CheckmarkDoneOutline,
  ImageOutline,
  DocumentTextOutline,
  LinkOutline,
  NotificationsOffOutline,
  TrashOutline,
  ExitOutline
} from '@vicons/ionicons5'

interface Message {
  id: string
  text: string
  timestamp: number
  isOwn: boolean
  read: boolean
}

interface Chat {
  id: string
  name: string
  initials: string
  color: string
  status: string
  lastMessage: string
  lastMessageTime: number
  unread: number
  messages: Message[]
}

interface Contact {
  id: string
  name: string
  initials: string
  color: string
  status: string
  unread?: number
}

const message = useMessage()

// Reactive data
const searchQuery = ref('')
const searchInChatQuery = ref('')
const activeChatId = ref('')
const messageInput = ref('')
const showChatInfo = ref(false)
const showSearchInChat = ref(false)
const showEmojiPicker = ref(false)
const showVoiceRecord = ref(false)
const showEditProfile = ref(false)
const showSettings = ref(false)
const messagesContainer = ref<HTMLElement>()

// User data
const user = ref({
  name: 'John Doe',
  initials: 'JD',
  color: '#3b82f6'
})

const profileData = ref({
  name: 'John Doe',
  status: 'Available',
  bio: 'Passionate developer and tech enthusiast'
})

const settingsData = ref({
  notifications: true,
  sound: true,
  darkMode: false,
  messagePreview: true
})

// Mock data
const chats = ref<Chat[]>([
  {
    id: '1',
    name: 'Alice Johnson',
    initials: 'AJ',
    color: '#10b981',
    status: 'Online',
    lastMessage: 'Hey! How are you doing?',
    lastMessageTime: Date.now() - 1000 * 60 * 5,  
    unread: 2,
    messages: [
      {
        id: '1',
        text: 'Hi there! 👋',
        timestamp: Date.now() - 1000 * 60 * 10,
        isOwn: false,
        read: true
      },
      {
        id: '2',
        text: 'Hello Alice! I\'m good, thanks for asking!',
        timestamp: Date.now() - 1000 * 60 * 8,
        isOwn: true,
        read: true
      },
      {
        id: '3',
        text: 'Hey! How are you doing?',
        timestamp: Date.now() - 1000 * 60 * 5,
        isOwn: false,
        read: false
      }
    ]
  },
  {
    id: '2',
    name: 'Bob Smith',
    initials: 'BS',
    color: '#f59e0b',
    status: 'Away',
    lastMessage: 'Sure, let\'s discuss tomorrow',
    lastMessageTime: Date.now() - 1000 * 60 * 30,
    unread: 0,
    messages: [
      {
        id: '1',
        text: 'Can we schedule a meeting?',
        timestamp: Date.now() - 1000 * 60 * 35,
        isOwn: true,
        read: true
      },
      {
        id: '2',
        text: 'Sure, let\'s discuss tomorrow',
        timestamp: Date.now() - 1000 * 60 * 30,
        isOwn: false,
        read: true
      }
    ]
  },
  {
    id: '3',
    name: 'Team Chat',
    initials: 'TC',
    color: '#8b5cf6',
    status: '5 members',
    lastMessage: 'Great work everyone!',
    lastMessageTime: Date.now() - 1000 * 60 * 60,
    unread: 5,
    messages: [
      {
        id: '1',
        text: 'Project update: We\'re on track!',
        timestamp: Date.now() - 1000 * 60 * 65,
        isOwn: false,
        read: true
      },
      {
        id: '2',
        text: 'Great work everyone!',
        timestamp: Date.now() - 1000 * 60 * 60,
        isOwn: false,
        read: false
      }
    ]
  }
])

const contacts = ref<Contact[]>([
  {
    id: '4',
    name: 'Carol White',
    initials: 'CW',
    color: '#ef4444',
    status: 'Online',
    unread: 1
  },
  {
    id: '5',
    name: 'David Brown',
    initials: 'DB',
    color: '#06b6d4',
    status: 'Offline'
  },
  {
    id: '6',
    name: 'Emma Davis',
    initials: 'ED',
    color: '#ec4899',
    status: 'Online'
  }
])

// Computed properties
const activeChat = computed(() => {
  return chats.value.find(chat => chat.id === activeChatId.value) || chats.value[0]
})

const filteredContacts = computed(() => {
  if (!searchQuery.value) return contacts.value
  return contacts.value.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    contact.initials.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const filteredChats = computed(() => {
  if (!searchQuery.value) return chats.value
  return chats.value.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    chat.initials.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const filteredMessages = computed(() => {
  if (!searchInChatQuery.value) return activeChat.value?.messages || []
  return activeChat.value?.messages.filter(message =>
    message.text.toLowerCase().includes(searchInChatQuery.value.toLowerCase())
  ) || []
})

const chatMenuDropdown = [
  {
    label: 'View Profile',
    key: 'profile'
  },
  {
    label: 'Search in Conversation',
    key: 'search'
  },
  {
    label: 'Mute Notifications',
    key: 'mute'
  },
  {
    type: 'divider'
  },
  {
    label: 'Clear Chat',
    key: 'clear'
  },
  {
    label: 'Delete Chat',
    key: 'delete'
  }
]

// Methods
const handleChatSelect = (chatId: string) => {
  activeChatId.value = chatId
  // Mark messages as read
  const chat = chats.value.find(c => c.id === chatId)
  if (chat) {
    chat.messages.forEach(msg => {
      if (!msg.isOwn) msg.read = true
    })
    chat.unread = 0
  }
  scrollToBottom()
}

const startNewChat = (contact: Contact) => {
  // Check if chat already exists
  const existingChat = chats.value.find(chat => chat.name === contact.name)
  if (existingChat) {
    handleChatSelect(existingChat.id)
  } else {
    // Create new chat
    const newChat: Chat = {
      id: Date.now().toString(),
      name: contact.name,
      initials: contact.initials,
      color: contact.color,
      status: contact.status,
      lastMessage: '',
      lastMessageTime: Date.now(),
      unread: 0,
      messages: []
    }
    chats.value.unshift(newChat)
    handleChatSelect(newChat.id)
  }
}

const sendMessage = () => {
  if (!messageInput.value.trim() || !activeChatId.value) return

  const newMessage: Message = {
    id: Date.now().toString(),
    text: messageInput.value.trim(),
    timestamp: Date.now(),
    isOwn: true,
    read: false
  }

  const chat = chats.value.find(c => c.id === activeChatId.value)
  if (chat) {
    chat.messages.push(newMessage)
    chat.lastMessage = newMessage.text
    chat.lastMessageTime = newMessage.timestamp
  }

  messageInput.value = ''
  scrollToBottom()

  // Simulate reply after 2 seconds
  setTimeout(() => {
    const replyMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: 'Thanks for your message! I\'ll get back to you soon.',
      timestamp: Date.now(),
      isOwn: false,
      read: false
    }
    if (chat) {
      chat.messages.push(replyMessage)
      chat.lastMessage = replyMessage.text
      chat.lastMessageTime = replyMessage.timestamp
      if (activeChatId.value !== chat.id) {
        chat.unread++
      }
    }
    if (activeChatId.value === chat?.id) {
      scrollToBottom()
    }
  }, 2000)
}

const handleShiftEnter = () => {
  messageInput.value += '\n'
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const toggleChatInfo = () => {
  showChatInfo.value = !showChatInfo.value
}

const toggleSearch = () => {
  showSearchInChat.value = !showSearchInChat.value
  searchInChatQuery.value = ''
}

const searchInChat = () => {
  // Search functionality is handled by computed property
  message.info(`Searching for "${searchInChatQuery.value}"`)
}

const attachFile = () => {
  message.info('File attachment feature coming soon!')
}

const saveProfile = () => {
  user.value.name = profileData.value.name
  user.value.initials = profileData.value.name.split(' ').map(n => n[0]).join('').toUpperCase()
  showEditProfile.value = false
  message.success('Profile updated successfully!')
}

const saveSettings = () => {
  showSettings.value = false
  message.success('Settings saved successfully!')
}

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor(diff / (1000 * 60))

  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return 'Just now'
}

// Watch for active chat changes
watch(activeChatId, () => {
  scrollToBottom()
})

onMounted(() => {
  // Auto-select first chat
  if (chats.value.length > 0) {
    activeChatId.value = chats.value[0].id
  }
})
</script>

<style scoped>
.chat-app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-secondary);
}

.chat-layout {
  display: flex;
  height: 100%;
  overflow: hidden;
}

/* Sidebar Styles */
.chat-sidebar {
  width: 320px;
  height: 100%;
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-info {
  flex: 1;
}

.user-name {
  font-weight: 600;
  color: var(--text-primary);
}

.user-status {
  font-size: 12px;
  color: var(--color-success);
}

.search-section {
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
}

.sidebar-section {
  padding: 16px;
  flex: 1;
  overflow-y: auto;
}

.section-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  margin-bottom: 12px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  min-width: 0;
  width: 100%;
}

.contact-item:hover {
  background-color: var(--bg-tertiary);
}

.contact-info {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.contact-name {
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.contact-time {
  font-size: 11px;
  color: var(--text-tertiary);
  margin-left: auto;
  flex-shrink: 0;
}

.active-chat {
  background-color: var(--bg-tertiary);
}

/* Main Chat Area */
.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-welcome {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.welcome-content {
  text-align: center;
}

.welcome-icon {
  color: var(--text-tertiary);
  margin-bottom: 16px;
}

.welcome-content h2 {
  color: var(--text-primary);
  margin-bottom: 8px;
}

.welcome-content p {
  color: var(--text-secondary);
}

.chat-conversation {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-header {
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-primary);
}

.chat-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chat-details {
  flex: 1;
}

.chat-name {
  font-weight: 600;
  color: var(--text-primary);
}

.chat-status {
  font-size: 12px;
  color: var(--text-secondary);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background: var(--bg-secondary);
}

.chat-search {
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-primary);
}

.messages-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-item {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.message-item.message-own {
  flex-direction: row-reverse;
}

.message-content {
  max-width: 70%;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.message-item.message-own .message-content {
  align-items: flex-end;
}

.message-bubble {
  padding: 12px 16px;
  border-radius: 18px;
  background: var(--bg-primary);
  color: var(--text-primary);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.message-item.message-own .message-bubble {
  background: var(--primary-color);
  color: white;
}

.message-text {
  line-height: 1.4;
  word-wrap: break-word;
}

.message-time {
  font-size: 11px;
  color: var(--text-tertiary);
  margin-top: 4px;
}

.message-item.message-own .message-time {
  color: rgba(255, 255, 255, 0.7);
}

.message-status {
  display: flex;
  align-items: center;
  margin-top: 4px;
}

.chat-input {
  border-top: 1px solid var(--border-color);
  background: var(--bg-primary);
  padding: 16px;
}

.input-toolbar {
  margin-bottom: 12px;
}

.input-area {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.message-input {
  flex: 1;
}

.send-button {
  flex-shrink: 0;
}

/* Chat Info Sidebar */
.chat-info-sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.info-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
}

.info-details h3 {
  margin: 0 0 4px 0;
  color: var(--text-primary);
}

.info-status {
  font-size: 14px;
  color: var(--text-secondary);
}

.info-section h4 {
  margin: 0 0 12px 0;
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 600;
}

.media-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.media-item:hover {
  background-color: var(--bg-tertiary);
}

/* Menu Item Styles */
:deep(.chat-menu-item) {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 8px;
  width: 100%;
}

.chat-menu-avatar {
  flex-shrink: 0;
}

.chat-menu-info {
  flex: 1;
  min-width: 0;
}

.chat-menu-name {
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-menu-message {
  font-size: 12px;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-menu-badge {
  flex-shrink: 0;
}

/* Modal Styles */
.profile-modal,
.settings-modal {
  max-width: 500px;
}

.profile-form,
.settings-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .chat-sidebar {
    width: 280px;
  }
  
  .message-content {
    max-width: 85%;
  }
  
  .chat-input {
    padding: 12px;
  }
}

@media (max-width: 480px) {
  .chat-layout {
    flex-direction: column;
  }
  
  .chat-sidebar {
    width: 100%;
    height: 200px;
    border-right: none;
    border-bottom: 1px solid var(--border-color);
  }
  
  .message-content {
    max-width: 90%;
  }
}
</style>