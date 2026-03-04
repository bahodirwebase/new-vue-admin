export interface EmailAddress {
  name: string
  email: string
  avatar?: string
}

export interface Attachment {
  id: string
  name: string
  size: number
  mimeType: string
}

export interface Email {
  id: string
  from: EmailAddress
  to: EmailAddress[]
  cc?: EmailAddress[]
  bcc?: EmailAddress[]
  subject: string
  body: string
  timestamp: Date
  read: boolean
  starred: boolean
  archived: boolean
  deleted: boolean
  draft: boolean
  labels: string[]
  folder: string
  attachments: Attachment[]
  priority: 'low' | 'normal' | 'high'
  replyCount?: number
}

export interface Folder {
  id: string
  name: string
  icon: string
  unread: number
  total: number
}

export interface Label {
  id: string
  name: string
  color: string
}

export type ComposeMode = 'new' | 'reply' | 'reply-all' | 'forward'

export interface ComposeState {
  to: string
  cc: string
  bcc: string
  subject: string
  body: string
  priority: 'low' | 'normal' | 'high'
  showCc: boolean
  showBcc: boolean
}
