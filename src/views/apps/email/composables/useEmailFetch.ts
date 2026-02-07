// composables/useEmailFetch.ts
import { ref, computed } from 'vue';
import type { Email, SearchFilter } from '../types';
import { ITEMS_PER_PAGE } from '../constants';

export function useEmailFetch() {
  const emails = ref<Email[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const currentPage = ref(1);
  const searchFilter = ref<SearchFilter>({
    query: '',
  });

  // Mock email data - backend API bilan o'zgartiriladi
  const mockEmails: Email[] = [
    {
      id: '1',
      from: {
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      },
      to: [{ name: 'You', email: 'you@example.com' }],
      subject: 'Project Update',
      body: 'Hi, here is the latest update on the project...',
      timestamp: new Date(Date.now() - 3600000),
      read: false,
      starred: true,
      labels: ['work'],
      attachments: [],
      priority: 'high',
    },
    {
      id: '2',
      from: {
        name: 'Sarah Smith',
        email: 'sarah@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      },
      to: [{ name: 'You', email: 'you@example.com' }],
      subject: 'Meeting Tomorrow',
      body: 'Don\'t forget about our meeting tomorrow at 2 PM...',
      timestamp: new Date(Date.now() - 7200000),
      read: false,
      starred: false,
      labels: ['work'],
      attachments: [],
      priority: 'normal',
    },
    {
      id: '3',
      from: {
        name: 'Marketing Team',
        email: 'marketing@company.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marketing',
      },
      to: [{ name: 'You', email: 'you@example.com' }],
      subject: 'New Campaign Results',
      body: 'The new campaign has exceeded expectations...',
      timestamp: new Date(Date.now() - 86400000),
      read: true,
      starred: false,
      labels: ['work'],
      attachments: [
        {
          id: '1',
          name: 'campaign_report.pdf',
          size: 2048000,
          type: 'application/pdf',
          url: '#',
        },
      ],
      priority: 'normal',
    },
  ];

  const fetchEmails = async () => {
    loading.value = true;
    error.value = null;
    try {
      // API call simulation
      await new Promise((resolve) => setTimeout(resolve, 500));
      emails.value = mockEmails;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch emails';
    } finally {
      loading.value = false;
    }
  };

  const filteredEmails = computed(() => {
    return emails.value.filter((email) => {
      if (!searchFilter.value.query) return true;
      const query = searchFilter.value.query.toLowerCase();
      return (
        email.subject.toLowerCase().includes(query) ||
        email.from.name.toLowerCase().includes(query) ||
        email.body.toLowerCase().includes(query)
      );
    });
  });

  const paginatedEmails = computed(() => {
    const start = (currentPage.value - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredEmails.value.slice(start, end);
  });

  const totalPages = computed(() => {
    return Math.ceil(filteredEmails.value.length / ITEMS_PER_PAGE);
  });

  const search = (query: string) => {
    searchFilter.value.query = query;
    currentPage.value = 1;
  };

  const markAsRead = (emailId: string) => {
    const email = emails.value.find((e) => e.id === emailId);
    if (email) email.read = true;
  };

  const markAsUnread = (emailId: string) => {
    const email = emails.value.find((e) => e.id === emailId);
    if (email) email.read = false;
  };

  const toggleStar = (emailId: string) => {
    const email = emails.value.find((e) => e.id === emailId);
    if (email) email.starred = !email.starred;
  };

  const deleteEmail = (emailId: string) => {
    emails.value = emails.value.filter((e) => e.id !== emailId);
  };

  return {
    emails,
    paginatedEmails,
    filteredEmails,
    loading,
    error,
    currentPage,
    totalPages,
    fetchEmails,
    search,
    markAsRead,
    markAsUnread,
    toggleStar,
    deleteEmail,
  };
}
