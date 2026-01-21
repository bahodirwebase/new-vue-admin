<template>
  <div class="telegram-messenger">
    <div class="main-content">
      <!-- Sidebar - Chat List -->
      <div class="sidebar">
        <div class="sidebar-header">
          <h3>Chats</h3>
          <n-button quaternary circle size="small">
            <n-icon size="20"><EllipsisVerticalOutline /></n-icon>
          </n-button>
        </div>
        <div class="chat-list">
          <div 
            v-for="chat in chatList" 
            :key="chat.id"
            class="chat-item"
            :class="{ active: selectedChat?.id === chat.id }"
            @click="selectChat(chat)"
          >
            <div class="chat-avatar">
              <div class="avatar-circle" :style="{ background: chat.avatarColor }">
                {{ chat.name.charAt(0).toUpperCase() }}
              </div>
            </div>
            <div class="chat-info">
              <div class="chat-header-info">
                <span class="chat-name">{{ chat.name }}</span>
                <span class="chat-time">{{ formatTime(chat.lastMessageTime) }}</span>
              </div>
              <div class="chat-preview">
                <span class="last-message">{{ chat.lastMessage }}</span>
                <span v-if="chat.unreadCount > 0" class="unread-badge">{{ chat.unreadCount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Content -->
      <div class="chat-content">
        <div v-if="!selectedChat" class="empty-chat">
          <div class="empty-icon">
            <n-icon size="64"><ChatbubbleEllipsesOutline /></n-icon>
          </div>
          <h3>Select a chat to start messaging</h3>
          <p>Choose a conversation from the left sidebar</p>
        </div>

        <div v-else class="chat-window">
          <!-- Chat Header -->
          <div class="chat-header">
            <div class="chat-header-left">
              <div class="avatar-circle" :style="{ background: selectedChat.avatarColor }">
                {{ selectedChat.name.charAt(0).toUpperCase() }}
              </div>
              <div class="chat-contact-info">
                <h3>{{ selectedChat.name }}</h3>
                <p class="status">{{ selectedChat.status }}</p>
              </div>
            </div>
            <div class="chat-header-right">
              <n-button quaternary circle size="small">
                <n-icon size="20"><SearchOutline /></n-icon>
              </n-button>
              <n-button quaternary circle size="small">
                <n-icon size="20"><EllipsisVerticalOutline /></n-icon>
              </n-button>
            </div>
          </div>

          <!-- Messages Area -->
          <div class="messages-container" ref="messagesContainer">
            <div class="date-separator">
              <span>Today</span>
            </div>

            <div 
              v-for="message in messages" 
              :key="message.id"
              class="message-wrapper"
              :class="message.sender === 'user' ? 'user-message' : 'bot-message'"
            >
              <div class="message-bubble">
                <div class="message-text">{{ message.content }}</div>
                <div class="message-time">
                  {{ formatTime(message.timestamp) }}
                  <span v-if="message.sender === 'user'" class="checkmark">✓</span>
                </div>
              </div>
            </div>

            <div v-if="isTyping" class="message-wrapper bot-message">
              <div class="message-bubble typing-bubble">
                <div class="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>

          <!-- Input Area -->
          <div class="input-area">
            <div class="input-wrapper">
              <n-button quaternary circle size="medium" class="attach-btn">
                <n-icon size="20"><AttachOutline /></n-icon>
              </n-button>
              <div class="input-container">
                <input
                  v-model="inputMessage"
                  @keyup.enter="sendMessage"
                  placeholder="Type a message..."
                  class="message-input"
                  :disabled="isTyping"
                />
              </div>
              <n-button 
                quaternary 
                circle 
                size="medium" 
                class="emoji-btn"
                @click="showEmojiPicker = !showEmojiPicker"
              >
                <n-icon size="20"><HappyOutline /></n-icon>
              </n-button>
              <n-button 
                type="primary" 
                circle 
                size="medium" 
                class="send-btn"
                @click="sendMessage"
                :disabled="!inputMessage.trim() || isTyping"
              >
                <n-icon size="16"><SendOutline /></n-icon>
              </n-button>
            </div>
          </div>

          <!-- Emoji Picker -->
          <div v-if="showEmojiPicker" class="emoji-picker">
            <div class="emoji-grid">
              <span 
                v-for="emoji in emojis" 
                :key="emoji"
                @click="insertEmoji(emoji)"
                class="emoji-item"
              >
                {{ emoji }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import {
  ChatbubbleEllipsesOutline,
  SearchOutline,
  EllipsisVerticalOutline,
  AttachOutline,
  HappyOutline,
  SendOutline
} from '@vicons/ionicons5'

interface Message {
  id: number
  sender: 'user' | 'bot'
  content: string
  timestamp: number
}

interface Chat {
  id: number
  name: string
  avatarColor: string
  lastMessage: string
  lastMessageTime: number
  unreadCount: number
  status: string
}

const messagesContainer = ref<HTMLElement | null>(null)
const inputMessage = ref('')
const messages = ref<Message[]>([])
const isTyping = ref(false)
const showEmojiPicker = ref(false)
const selectedChat = ref<Chat | null>(null)

const emojis = ['😀', '😂', '❤️', '👍', '🎉', '🔥', '💯', '🚀', '💪', '🙏', '😊', '👌']

const chatList = ref<Chat[]>([
  {
    id: 1,
    name: 'Calendar Assistant',
    avatarColor: 'linear-gradient(135deg, #0084ff 0%, #764ba2 100%)',
    lastMessage: '👋 Hello! I\'m your Calendar Assistant...',
    lastMessageTime: Date.now() - 1000 * 60 * 5,
    unreadCount: 2,
    status: 'online'
  },
  {
    id: 2,
    name: 'Team Chat',
    avatarColor: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
    lastMessage: 'Meeting at 3 PM today',
    lastMessageTime: Date.now() - 1000 * 60 * 30,
    unreadCount: 0,
    status: 'online'
  },
  {
    id: 3,
    name: 'Project Updates',
    avatarColor: 'linear-gradient(135deg, #dc3545 0%, #fd7e14 100%)',
    lastMessage: 'New milestone completed!',
    lastMessageTime: Date.now() - 1000 * 60 * 60,
    unreadCount: 1,
    status: 'offline'
  }
])

onMounted(() => {
  // Select first chat by default
  selectChat(chatList.value[0])
})

const selectChat = (chat: Chat) => {
  selectedChat.value = chat
  chat.unreadCount = 0
  
  // Load messages for selected chat
  if (chat.id === 1) {
    messages.value = [
      {
        id: 1,
        sender: 'bot',
        content: '👋 Hello! I\'m your Calendar Assistant. I can help you with:\n\n📅 Check your daily schedule\n📋 View weekly events\n🤝 Plan meetings\n⏰ Find available time slots\n\nHow can I help you today?',
        timestamp: Date.now() - 1000 * 60 * 10
      }
    ]
  } else {
    messages.value = []
  }
  scrollToBottom()
}

const formatTime = (timestamp: number) => {
  const now = Date.now()
  const diff = now - timestamp
  
  if (diff < 1000 * 60) {
    return 'now'
  } else if (diff < 1000 * 60 * 60) {
    return `${Math.floor(diff / (1000 * 60))}m ago`
  } else if (diff < 1000 * 60 * 60 * 24) {
    return `${Math.floor(diff / (1000 * 60 * 60))}h ago`
  } else {
    return new Date(timestamp).toLocaleDateString()
  }
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const generateBotResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase()
  
  if (lowerMessage.includes('today') || lowerMessage.includes("today's")) {
    return '📅 Today you have:\n\n• 10:00 AM - Team Meeting 🤝\n• 12:30 PM - Lunch with Client 🍽️\n• 3:00 PM - Project Review 📋\n\nWould you like details about any event?'
  } else if (lowerMessage.includes('week') || lowerMessage.includes('schedule')) {
    return '📊 This week\'s overview:\n\n**Monday:** 4 events (busiest day)\n**Tuesday:** 2 events\n**Wednesday:** 2 events\n**Thursday:** 3 events\n**Friday:** 1 event (project deadline!)\n\nTotal: 12 events this week 📈'
  } else if (lowerMessage.includes('meeting') || lowerMessage.includes('plan')) {
    return '🤝 I can help you plan a meeting!\n\nAvailable slots this week:\n• Tuesday 2:00 PM - 4:00 PM\n• Thursday 10:00 AM - 12:00 PM\n\nWhat type of meeting and who should attend?'
  } else if (lowerMessage.includes('tomorrow')) {
    return '📅 Tomorrow\'s schedule:\n\n• 9:00 AM - Coffee with Design Team ☕\n• 2:00 PM - Code Review Session 💻\n\nFree slot: 11:00 AM - 1:00 PM (perfect for lunch or a meeting!)'
  } else if (lowerMessage.includes('help')) {
    return '🤖 I\'m your Calendar Assistant! Here\'s what I can do:\n\n📅 Check daily/weekly schedule\n⏰ Find available time slots\n🤝 Help plan meetings\n📝 Remind you of events\n📊 Provide calendar statistics\n\nJust ask me anything about your calendar! 🎯'
  } else {
    return `🤔 I understand you\'re asking about "${userMessage}". I can help you with calendar-related questions. Try asking about:\n\n• Today\'s schedule\n• This week\'s events\n• Planning meetings\n• Available time slots\n\nHow can I assist you? 🎯`
  }
}

const sendMessage = () => {
  const content = inputMessage.value.trim()
  if (!content || isTyping.value || !selectedChat.value) return

  messages.value.push({
    id: Date.now(),
    sender: 'user',
    content,
    timestamp: Date.now()
  })

  inputMessage.value = ''
  scrollToBottom()

  // Update chat list
  const chat = chatList.value.find(c => c.id === selectedChat.value?.id)
  if (chat) {
    chat.lastMessage = content
    chat.lastMessageTime = Date.now()
  }

  // Simulate bot response for Calendar Assistant
  if (selectedChat.value.id === 1) {
    isTyping.value = true
    setTimeout(() => {
      const botResponse = generateBotResponse(content)
      messages.value.push({
        id: Date.now() + 1,
        sender: 'bot',
        content: botResponse,
        timestamp: Date.now()
      })
      isTyping.value = false
      scrollToBottom()
      
      if (chat) {
        chat.lastMessage = botResponse.substring(0, 30) + '...'
        chat.lastMessageTime = Date.now()
      }
    }, 1200)
  }
}

const insertEmoji = (emoji: string) => {
  inputMessage.value += emoji
  showEmojiPicker.value = false
}

const handleClickOutside = (e: Event) => {
  const target = e.target as HTMLElement
  if (!target.closest('.emoji-picker') && !target.closest('.emoji-btn')) {
    showEmojiPicker.value = false
  }
}

document.addEventListener('click', handleClickOutside)
</script>

<style scoped>


.telegram-messenger {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
  font-family: var(--font-primary);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-light);
}

/* Main Content */
.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* Sidebar */
.sidebar {
  width: 350px;
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
  height: 60px;
}

.sidebar-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.chat-list {
  flex: 1;
  overflow-y: auto;
}

.chat-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.2s;
  border-bottom: 1px solid var(--border-color);
}

.chat-item:hover {
  background: var(--hover-bg);
}

.chat-item.active {
  background: var(--bg-secondary);
}

.chat-avatar {
  margin-right: 12px;
}

.avatar-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 18px;
}

.chat-info {
  flex: 1;
  min-width: 0;
}

.chat-header-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.chat-name {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 16px;
}

.chat-time {
  font-size: 12px;
  color: var(--text-muted);
}

.chat-preview {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.last-message {
  font-size: 14px;
  color: var(--text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.unread-badge {
  background: var(--message-user-bg);
  color: white;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 11px;
  font-weight: 600;
  min-width: 18px;
  text-align: center;
}

/* Chat Content */
.chat-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
}

.empty-chat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-muted);
}

.empty-icon {
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-chat h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
}

.empty-chat p {
  margin: 0;
  font-size: 14px;
}

/* Chat Window */
.chat-window {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
  height: 60px;
}

.chat-header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chat-contact-info h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.status {
  margin: 0;
  font-size: 13px;
  color: var(--status-color);
}

.chat-header-right {
  display: flex;
  gap: 8px;
}

/* Messages Container */
.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: var(--bg-primary);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.date-separator {
  text-align: center;
  margin: 16px 0;
}

.date-separator span {
  background: var(--bg-secondary);
  color: var(--text-muted);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.message-wrapper {
  display: flex;
  max-width: 70%;
}

.user-message {
  align-self: flex-end;
  margin-left: auto;
}

.bot-message {
  align-self: flex-start;
}

.message-bubble {
  background: var(--message-bot-bg);
  border-radius: 18px;
  padding: 10px 14px;
  position: relative;
  word-wrap: break-word;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.user-message .message-bubble {
  background: var(--primary-color);
  border-bottom-right-radius: 4px;
}

.bot-message .message-bubble {
  border-bottom-left-radius: 4px;
}

.message-text {
  color: var(--text-primary);
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-wrap;
}

.user-message .message-text {
  color: #ffffff;
}

.message-time {
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.user-message .message-time {
  color: rgba(255, 255, 255, 0.85);
  justify-content: flex-end;
}

.checkmark {
  font-size: 12px;
}

/* Typing Indicator */
.typing-bubble {
  padding: 10px 14px;
}

.typing-dots {
  display: flex;
  gap: 3px;
}

.typing-dots span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--typing-color);
  animation: typing 1.4s infinite ease-in-out;
}

.typing-dots span:nth-child(1) { animation-delay: -0.32s; }
.typing-dots span:nth-child(2) { animation-delay: -0.16s; }

@keyframes typing {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Input Area */
.input-area {
  padding: 16px 20px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  margin: 0 16px 16px 16px;
  box-shadow: var(--shadow-light);
  flex-shrink: 0;
  height: 60px;
  display: flex;
  align-items: center;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  /* background: var(--bg-input); */
  border-radius: 24px;
  padding: 6px;
  width: 100%;
  /* border: 1px solid var(--border-color); */
}

.input-container {
  flex: 1;
  position: relative;
}

.message-input {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-size: 15px;
  padding: 8px 12px;
}

.message-input::placeholder {
  color: var(--text-muted);
}

.message-input:disabled {
  opacity: 0.6;
}

.attach-btn,
.emoji-btn,
.send-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
}

.send-btn {
  color: var(--primary-color);
  background: var(--message-user-bg);
}

.send-btn:disabled {
  background: var(--bg-input);
  color: var(--text-muted);
}

/* Emoji Picker */
.emoji-picker {
  position: absolute;
  bottom: 60px;
  right: 20px;
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 12px;
  box-shadow: var(--shadow-light);
  z-index: 1000;
}

.emoji-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 4px;
  max-width: 280px;
}

.emoji-item {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
  font-size: 20px;
  transition: background 0.2s;
}

.emoji-item:hover {
  background: var(--hover-bg);
}

/* Scrollbar Styling */
.chat-list::-webkit-scrollbar,
.messages-container::-webkit-scrollbar {
  width: 6px;
}

.chat-list::-webkit-scrollbar-track,
.messages-container::-webkit-scrollbar-track {
  background: transparent;
}

.chat-list::-webkit-scrollbar-thumb,
.messages-container::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 3px;
}

.chat-list::-webkit-scrollbar-thumb:hover,
.messages-container::-webkit-scrollbar-thumb:hover {
  background: var(--text-muted);
}

/* Responsive Design */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    position: absolute;
    z-index: 10;
  }
  
  .chat-content {
    width: 100%;
  }
  
  .message-wrapper {
    max-width: 85%;
  }
}
</style>