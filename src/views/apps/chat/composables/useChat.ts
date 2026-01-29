import { computed } from "vue";
import { useChatStore } from "../store";

export function useChat() {
  const store = useChatStore();
  
  // Computed properties
  const activeChat = computed(() => {
    return (
      store.chats.find((chat) => chat.id === store.activeChatId) ||
      store.chats[0]
    );
  });
  const filteredChats = computed(() => {
    if (!store.searchQuery) return store.chats;
    return store.chats.filter(
      (chat) =>
        chat.name.toLowerCase().includes(store.searchQuery.toLowerCase()) ||
        chat.initials.toLowerCase().includes(store.searchQuery.toLowerCase()) ||
        chat.lastMessage
          .toLowerCase()
          .includes(store.searchQuery.toLowerCase()),
    );
  });
  const filteredContacts = computed(() => {
    if (!store.searchQuery) return store.contacts;
    return store.contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(store.searchQuery.toLowerCase()) ||
        contact.initials
          .toLowerCase()
          .includes(store.searchQuery.toLowerCase()),
    );
  });
  const filteredMessages = computed(() => {
    if (!store.searchInChatQuery) return activeChat.value?.messages || [];
    return (
      activeChat.value?.messages.filter((message) =>
        message.text
          .toLowerCase()
          .includes(store.searchInChatQuery.toLowerCase()),
      ) || []
    );
  });

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  return {
    activeChat,
    filteredChats,
    filteredContacts,
    filteredMessages,
    formatTime,
  };
}
