import { ref, nextTick, watch, onMounted } from "vue";
import { defineStore } from "pinia";
import { CHATS, CONTACTS } from "./constants";
import type { Chat, Contact, Message } from "./types";
import { message } from "@/utils/naive-discrete-api";

export const useChatStore = defineStore("chat", () => {
  // Reactive data

  const showEditProfile = ref(false);
  const showSettings = ref(false);
  const showSearchInChat = ref(false);
  const showEmojiPicker = ref(false);
  const showVoiceRecord = ref(false);
  const showChatInfo = ref(false);
  const searchInChatQuery = ref("");
  const searchQuery = ref("");
  const activeChatId = ref("");
  const messageInput = ref("");
  const messagesContainer = ref<HTMLElement>();

  // User data
  const user = ref({
    name: "John Doe",
    initials: "JD",
    color: "#3b82f6",
  });
  const profileData = ref({
    name: "John Doe",
    status: "Available",
    bio: "Passionate developer and tech enthusiast",
  });
  const settingsData = ref({
    notifications: true,
    sound: true,
    darkMode: false,
    messagePreview: true,
  });
  const chats = ref<Chat[]>(CHATS);
  const contacts = ref<Contact[]>(CONTACTS);

  // Methods
  const handleChatSelect = (chatId: string) => {
    activeChatId.value = chatId;
    // Mark messages as read
    const chat = chats.value.find((c) => c.id === chatId);
    if (chat) {
      chat.messages.forEach((msg) => {
        if (!msg.isOwn) msg.read = true;
      });
      chat.unread = 0;
    }
    scrollToBottom();
  };
  const scrollToBottom = () => {
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop =
          messagesContainer.value.scrollHeight;
      }
    });
  };
  const startNewChat = (contact: Contact) => {
    // Check if chat already exists
    const existingChat = chats.value.find((chat) => chat.name === contact.name);
    if (existingChat) {
      handleChatSelect(existingChat.id);
    } else {
      // Create new chat
      const newChat: Chat = {
        id: Date.now().toString(),
        name: contact.name,
        initials: contact.initials,
        color: contact.color,
        status: contact.status,
        lastMessage: "",
        lastMessageTime: Date.now(),
        unread: 0,
        messages: [],
      };
      chats.value.unshift(newChat);
      handleChatSelect(newChat.id);
    }
  };
  const toggleChatInfo = () => {
    showChatInfo.value = !showChatInfo.value;
  };
  const toggleSearch = () => {
    showSearchInChat.value = !showSearchInChat.value;
    searchInChatQuery.value = "";
  };
  const searchInChat = () => {
    // Search functionality is handled by computed property
    message.info(`Searching for "${searchInChatQuery.value}"`);
  };
  const attachFile = () => {
    message.info("File attachment feature coming soon!");
  };
  const sendMessage = () => {
    if (!messageInput.value.trim() || !activeChatId.value) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageInput.value.trim(),
      timestamp: Date.now(),
      isOwn: true,
      read: false,
    };

    const chat = chats.value.find((c) => c.id === activeChatId.value);
    if (chat) {
      chat.messages.push(newMessage);
      chat.lastMessage = newMessage.text;
      chat.lastMessageTime = newMessage.timestamp;
    }

    messageInput.value = "";
    scrollToBottom();

    // Simulate reply after 2 seconds
    setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! I'll get back to you soon.",
        timestamp: Date.now(),
        isOwn: false,
        read: false,
      };
      if (chat) {
        chat.messages.push(replyMessage);
        chat.lastMessage = replyMessage.text;
        chat.lastMessageTime = replyMessage.timestamp;
        if (activeChatId.value !== chat.id) {
          chat.unread++;
        }
      }
      if (activeChatId.value === chat?.id) {
        scrollToBottom();
      }
    }, 2000);
  };
  const handleShiftEnter = () => {
    messageInput.value += "\n";
  };
  const saveProfile = () => {
    user.value.name = profileData.value.name;
    user.value.initials = profileData.value.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
    showEditProfile.value = false;
    message.success("Profile updated successfully!");
  };
  const saveSettings = () => {
    showSettings.value = false;
    message.success("Settings saved successfully!");
  };

  // Watch for active chat changes
  watch(activeChatId, () => {
    scrollToBottom();
  });

  onMounted(() => {
    // Auto-select first chat
    if (chats.value.length > 0) {
      activeChatId.value = chats.value[0].id;
    }
  });
  return {
    user,
    profileData,
    settingsData,
    chats,
    contacts,
    showEditProfile,
    showSettings,
    searchQuery,
    activeChatId,
    showSearchInChat,
    searchInChatQuery,
    showEmojiPicker,
    showVoiceRecord,
    messageInput,
    showChatInfo,
    startNewChat,
    toggleChatInfo,
    toggleSearch,
    searchInChat,
    attachFile,
    sendMessage,
    handleShiftEnter,
    saveProfile,
    saveSettings,
  };
});
