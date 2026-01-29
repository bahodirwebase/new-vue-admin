export const CHAT_MENU_DROPDOWN = [
  {
    label: "View Profile",
    key: "profile",
  },
  {
    label: "Search in Conversation",
    key: "search",
  },
  {
    label: "Mute Notifications",
    key: "mute",
  },
  {
    type: "divider",
  },
  {
    label: "Clear Chat",
    key: "clear",
  },
  {
    label: "Delete Chat",
    key: "delete",
  },
];

export const CHATS = [
  {
    id: "1",
    name: "Alice Johnson",
    initials: "AJ",
    color: "#10b981",
    status: "Online",
    lastMessage: "Hey! How are you doing?",
    lastMessageTime: Date.now() - 1000 * 60 * 5,
    unread: 2,
    messages: [
      {
        id: "1",
        text: "Hi there! 👋",
        timestamp: Date.now() - 1000 * 60 * 10,
        isOwn: false,
        read: true,
      },
      {
        id: "2",
        text: "Hello Alice! I'm good, thanks for asking!",
        timestamp: Date.now() - 1000 * 60 * 8,
        isOwn: true,
        read: true,
      },
      {
        id: "3",
        text: "Hey! How are you doing?",
        timestamp: Date.now() - 1000 * 60 * 5,
        isOwn: false,
        read: false,
      },
    ],
  },
  {
    id: "2",
    name: "Bob Smith",
    initials: "BS",
    color: "#f59e0b",
    status: "Away",
    lastMessage: "Sure, let's discuss tomorrow",
    lastMessageTime: Date.now() - 1000 * 60 * 30,
    unread: 0,
    messages: [
      {
        id: "1",
        text: "Can we schedule a meeting?",
        timestamp: Date.now() - 1000 * 60 * 35,
        isOwn: true,
        read: true,
      },
      {
        id: "2",
        text: "Sure, let's discuss tomorrow",
        timestamp: Date.now() - 1000 * 60 * 30,
        isOwn: false,
        read: true,
      },
    ],
  },
  {
    id: "3",
    name: "Team Chat",
    initials: "TC",
    color: "#8b5cf6",
    status: "5 members",
    lastMessage: "Great work everyone!",
    lastMessageTime: Date.now() - 1000 * 60 * 60,
    unread: 5,
    messages: [
      {
        id: "1",
        text: "Project update: We're on track!",
        timestamp: Date.now() - 1000 * 60 * 65,
        isOwn: false,
        read: true,
      },
      {
        id: "2",
        text: "Great work everyone!",
        timestamp: Date.now() - 1000 * 60 * 60,
        isOwn: false,
        read: false,
      },
    ],
  },
];

export const CONTACTS = [
  {
    id: "4",
    name: "Carol White",
    initials: "CW",
    color: "#ef4444",
    status: "Online",
    unread: 1,
  },
  {
    id: "5",
    name: "David Brown",
    initials: "DB",
    color: "#06b6d4",
    status: "Offline",
  },
  {
    id: "6",
    name: "Emma Davis",
    initials: "ED",
    color: "#ec4899",
    status: "Online",
  },
];
