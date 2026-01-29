import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Email {
  id: number
  from: {
    name: string
    email: string
    avatar?: string
  }
  to: {
    name: string
    email: string
  }[]
  subject: string
  content: string
  preview: string
  timestamp: string
  isRead: boolean
  isStarred: boolean
  isArchived: boolean
  folder: 'inbox' | 'sent' | 'drafts' | 'trash' | 'spam'
  attachments?: {
    name: string
    size: number
    type: string
  }[]
  labels?: string[]
  priority: 'low' | 'normal' | 'high'
}

export const useEmailStore = defineStore('email', () => {
  // State
  const emails = ref<Email[]>([])
  const currentFolder = ref<string>('inbox')
  const selectedEmail = ref<Email | null>(null)
  const loading = ref(false)
  const searchQuery = ref('')
  const isStarredView = ref(false)

  // Mock data
  const mockEmails: Email[] = [
    {
      id: 1,
      from: {
        name: 'Sarah Johnson',
        email: 'sarah.j@company.com',
        avatar: 'https://picsum.photos/seed/sarah/40/40.jpg'
      },
      to: [{
        name: 'You',
        email: 'you@company.com'
      }],
      subject: 'Q4 Marketing Campaign Results',
      content: `Hi Team,

I'm excited to share the results from our Q4 marketing campaign. We've seen exceptional engagement across all channels:

• Social media engagement up 45%
• Email open rates increased to 32%
• Website traffic grew by 28%
• Conversion rate improved to 3.2%

The team has done outstanding work, and I believe we're well-positioned for a strong Q1 2024.

Let's schedule a meeting next week to discuss our strategy for the upcoming quarter.

Best regards,
Sarah`,
      preview: 'I\'m excited to share the results from our Q4 marketing campaign...',
      timestamp: '2024-01-15T09:30:00Z',
      isRead: false,
      isStarred: true,
      isArchived: false,
      folder: 'inbox',
      labels: ['marketing', 'important'],
      priority: 'high'
    },
    {
      id: 2,
      from: {
        name: 'Michael Chen',
        email: 'mchen@techcorp.io',
        avatar: 'https://picsum.photos/seed/michael/40/40.jpg'
      },
      to: [{
        name: 'You',
        email: 'you@company.com'
      }],
      subject: 'Technical Review Meeting - Tomorrow 2PM',
      content: `Hi,

Just a reminder about our technical review meeting scheduled for tomorrow at 2PM in Conference Room B.

Agenda:
1. Review current architecture challenges
2. Discuss scalability options
3. Plan for Q1 technical initiatives
4. Resource allocation discussion

Please bring your laptops and any relevant documentation. The meeting should last about 2 hours.

Thanks,
Michael`,
      preview: 'Just a reminder about our technical review meeting...',
      timestamp: '2024-01-14T16:45:00Z',
      isRead: true,
      isStarred: false,
      isArchived: false,
      folder: 'inbox',
      labels: ['meeting', 'technical'],
      priority: 'normal'
    },
    {
      id: 3,
      from: {
        name: 'Emily Rodriguez',
        email: 'emily.r@design.co',
        avatar: 'https://picsum.photos/seed/emily/40/40.jpg'
      },
      to: [{
        name: 'You',
        email: 'you@company.com'
      }],
      subject: 'New Design Mockups Ready for Review',
      content: `Hello!

The new design mockups for the mobile app are ready for your review. I've incorporated all the feedback from our last meeting:

Key changes:
• Updated color scheme to match brand guidelines
• Improved navigation flow
• Added micro-interactions
• Optimized for accessibility standards

You can view the designs here: [Figma Link]

Please let me know your thoughts by end of day Thursday.

Best,
Emily`,
      preview: 'The new design mockups for the mobile app are ready...',
      timestamp: '2024-01-14T11:20:00Z',
      isRead: false,
      isStarred: false,
      isArchived: false,
      folder: 'inbox',
      attachments: [
        { name: 'mobile-app-mockups.fig', size: 15420000, type: 'application/figma' }
      ],
      labels: ['design', 'review'],
      priority: 'normal'
    },
    {
      id: 4,
      from: {
        name: 'David Park',
        email: 'dpark@finance.com',
        avatar: 'https://picsum.photos/seed/david/40/40.jpg'
      },
      to: [{
        name: 'You',
        email: 'you@company.com'
      }],
      subject: 'Budget Approval Required - Q1 2024',
      content: `Dear Team,

I need your approval for the Q1 2024 budget allocation. The key areas requiring funding are:

1. Infrastructure upgrades: $50,000
2. Marketing initiatives: $35,000
3. New hires: $75,000
4. Training & development: $15,000

Total requested: $175,000

Please review the attached spreadsheet and provide your feedback by Friday.

Regards,
David`,
      preview: 'I need your approval for the Q1 2024 budget allocation...',
      timestamp: '2024-01-13T14:15:00Z',
      isRead: true,
      isStarred: true,
      isArchived: false,
      folder: 'inbox',
      attachments: [
        { name: 'Q1-2024-Budget.xlsx', size: 2450000, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
      ],
      labels: ['finance', 'urgent'],
      priority: 'high'
    },
    {
      id: 5,
      from: {
        name: 'Lisa Thompson',
        email: 'lisa.t@hr.company.com',
        avatar: 'https://picsum.photos/seed/lisa/40/40.jpg'
      },
      to: [{
        name: 'You',
        email: 'you@company.com'
      }],
      subject: 'Team Building Event - Save the Date!',
      content: `Hi everyone!

Mark your calendars for our annual team building event on Saturday, January 27th!

This year we're going to:
• Escape room challenge (morning)
• Team lunch at The Garden Restaurant
• Afternoon activities at Adventure Park
• Evening social gathering

Please RSVP by January 20th so we can finalize arrangements.

Looking forward to seeing everyone there!

Best,
Lisa
HR Team`,
      preview: 'Mark your calendars for our annual team building event...',
      timestamp: '2024-01-12T10:30:00Z',
      isRead: false,
      isStarred: false,
      isArchived: false,
      folder: 'inbox',
      labels: ['event', 'team'],
      priority: 'low'
    }
  ]

  // Computed
  const filteredEmails = computed(() => {
    if (isStarredView.value) {
      return emails.value.filter(email => email.isStarred && !email.isArchived)
    }
    return emails.value.filter(email => 
      email.folder === currentFolder.value && !email.isArchived
    )
  })

  const unreadCount = computed(() => {
    return emails.value.filter(email => 
      email.folder === currentFolder.value && !email.isRead && !email.isArchived
    ).length
  })

  const starredEmails = computed(() => {
    return emails.value.filter(email => email.isStarred && !email.isArchived)
  })

  // Actions
  const loadEmails = () => {
    loading.value = true
    setTimeout(() => {
      emails.value = mockEmails
      loading.value = false
    }, 500)
  }

  const selectEmail = (emailId: number) => {
    const email = emails.value.find(e => e.id === emailId)
    if (email) {
      selectedEmail.value = email
      if (!email.isRead) {
        email.isRead = true
      }
    }
  }

  const markAsRead = (emailIds: number[]) => {
    emailIds.forEach(id => {
      const email = emails.value.find(e => e.id === id)
      if (email) {
        email.isRead = true
      }
    })
  }

  const markAsUnread = (emailIds: number[]) => {
    emailIds.forEach(id => {
      const email = emails.value.find(e => e.id === id)
      if (email) {
        email.isRead = false
      }
    })
  }

  const starEmails = (emailIds: number[]) => {
    emailIds.forEach(id => {
      const email = emails.value.find(e => e.id === id)
      if (email) {
        email.isStarred = true
      }
    })
  }

  const unstarEmails = (emailIds: number[]) => {
    emailIds.forEach(id => {
      const email = emails.value.find(e => e.id === id)
      if (email) {
        email.isStarred = false
      }
    })
  }

  const archiveEmails = (emailIds: number[]) => {
    emailIds.forEach(id => {
      const email = emails.value.find(e => e.id === id)
      if (email) {
        email.isArchived = true
      }
    })
  }

  const deleteEmails = (emailIds: number[]) => {
    emailIds.forEach(id => {
      const email = emails.value.find(e => e.id === id)
      if (email) {
        email.folder = 'trash'
      }
    })
  }

  const moveEmails = (emailIds: number[], folder: string) => {
    emailIds.forEach(id => {
      const email = emails.value.find(e => e.id === id)
      if (email) {
        email.folder = folder as any
      }
    })
  }

  const refreshEmails = () => {
    loadEmails()
  }

  const setCurrentFolder = (folder: string) => {
    currentFolder.value = folder
    selectedEmail.value = null
    isStarredView.value = false
  }

  const showStarred = () => {
    isStarredView.value = true
    selectedEmail.value = null
  }

  const goBack = () => {
    selectedEmail.value = null
  }

  const searchEmails = (query: string) => {
    searchQuery.value = query
    return emails.value.filter(email =>
      email.subject.toLowerCase().includes(query.toLowerCase()) ||
      email.content.toLowerCase().includes(query.toLowerCase()) ||
      email.from.name.toLowerCase().includes(query.toLowerCase())
    )
  }

  return {
    // State
    emails,
    currentFolder,
    selectedEmail,
    loading,
    searchQuery,
    isStarredView,
    
    // Computed
    filteredEmails,
    unreadCount,
    starredEmails,
    
    // Actions
    loadEmails,
    selectEmail,
    markAsRead,
    markAsUnread,
    starEmails,
    unstarEmails,
    archiveEmails,
    deleteEmails,
    moveEmails,
    refreshEmails,
    setCurrentFolder,
    showStarred,
    goBack,
    searchEmails
  }
})
