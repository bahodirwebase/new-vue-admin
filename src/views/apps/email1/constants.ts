// Email papkalarining default ro'yxati
export const DEFAULT_FOLDERS = [
  {
    id: 'inbox',
    name: 'Inbox',
    icon: 'inbox',
    unreadCount: 5,
    totalCount: 24,
  },
  {
    id: 'starred',
    name: 'Starred',
    icon: 'star',
    unreadCount: 0,
    totalCount: 8,
  },
  {
    id: 'sent',
    name: 'Sent',
    icon: 'send',
    unreadCount: 0,
    totalCount: 42,
  },
  {
    id: 'drafts',
    name: 'Drafts',
    icon: 'draft',
    unreadCount: 2,
    totalCount: 2,
  },
  {
    id: 'spam',
    name: 'Spam',
    icon: 'warning',
    unreadCount: 12,
    totalCount: 156,
  },
  {
    id: 'trash',
    name: 'Trash',
    icon: 'trash',
    unreadCount: 0,
    totalCount: 3,
  },
];

// Email labellar
export const EMAIL_LABELS = [
  { id: 'work', name: 'Work', color: '#1890ff' },
  { id: 'personal', name: 'Personal', color: '#52c41a' },
  { id: 'urgent', name: 'Urgent', color: '#ff4d4f' },
  { id: 'follow-up', name: 'Follow up', color: '#faad14' },
  { id: 'archive', name: 'Archive', color: '#8c8c8c' },
];

// Email priority darajalari
export const EMAIL_PRIORITIES = [
  { value: 'low', label: 'Low Priority', color: '#52c41a' },
  { value: 'normal', label: 'Normal Priority', color: '#1890ff' },
  { value: 'high', label: 'High Priority', color: '#ff4d4f' },
];

// Regex patternlar
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const URL_REGEX = /(https?:\/\/[^\s]+)/g;

// Toastlar uchun messages
export const TOAST_MESSAGES = {
  EMAIL_SENT: 'Email successfully sent!',
  EMAIL_DELETED: 'Email moved to trash',
  EMAIL_RESTORED: 'Email restored',
  EMAIL_STARRED: 'Email starred',
  EMAIL_UNSTARRED: 'Star removed',
  COPY_SUCCESS: 'Copied to clipboard',
  ERROR_SENDING: 'Failed to send email',
  ERROR_LOADING: 'Failed to load emails',
};

// Pagination settings
export const ITEMS_PER_PAGE = 20;
export const COMPACT_ITEMS_PER_PAGE = 15;

// Email compose modal widthlari
export const COMPOSER_WIDTH = {
  MOBILE: '95vw',
  TABLET: '85vw',
  DESKTOP: '70vw',
  MAX: 800,
};

// Debounce delayi (ms)
export const SEARCH_DEBOUNCE_DELAY = 300;
export const SAVE_DRAFT_DEBOUNCE_DELAY = 1000;

// Time formats
export const TIME_FORMAT = 'HH:mm';
export const DATE_FORMAT = 'DD.MM.YYYY';
export const DATETIME_FORMAT = 'DD.MM.YYYY HH:mm';
