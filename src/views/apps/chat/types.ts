export interface Message {
  id: string;
  text: string;
  timestamp: number;
  isOwn: boolean;
  read: boolean;
}

export interface Chat {
  id: string;
  name: string;
  initials: string;
  color: string;
  status: string;
  lastMessage: string;
  lastMessageTime: number;
  unread: number;
  messages: Message[];
}

export interface Contact {
  id: string;
  name: string;
  initials: string;
  color: string;
  status: string;
  unread?: number;
}