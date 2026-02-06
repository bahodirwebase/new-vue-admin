// Email ma'lumotlari uchun turlar
export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface Email {
  id: string;
  from: {
    name: string;
    email: string;
    avatar?: string;
  };
  to: Array<{
    name: string;
    email: string;
  }>;
  cc?: Array<{
    name: string;
    email: string;
  }>;
  bcc?: Array<{
    name: string;
    email: string;
  }>;
  subject: string;
  body: string;
  htmlBody?: string;
  timestamp: Date;
  read: boolean;
  starred: boolean;
  labels: string[];
  attachments: Attachment[];
  priority: 'low' | 'normal' | 'high';
  draft?: boolean;
}

export interface Folder {
  id: string;
  name: string;
  icon: string;
  unreadCount: number;
  totalCount: number;
  color?: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  lastContacted?: Date;
}

export interface SearchFilter {
  query: string;
  from?: string;
  to?: string;
  subject?: string;
  hasAttachments?: boolean;
  isUnread?: boolean;
  isStarred?: boolean;
  startDate?: Date;
  endDate?: Date;
}

export interface EmailComposerState {
  to: Contact[];
  cc: Contact[];
  bcc: Contact[];
  subject: string;
  body: string;
  attachments: Attachment[];
  isSending: boolean;
}

export interface EmailListItem {
  id: string;
  from: string;
  subject: string;
  preview: string;
  timestamp: Date;
  read: boolean;
  starred: boolean;
  hasAttachments: boolean;
  avatar?: string;
}
