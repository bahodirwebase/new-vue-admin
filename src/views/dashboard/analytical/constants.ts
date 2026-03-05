import {
  ChatbubbleOutline,
  EyeOutline,
  HeartOutline,
  ShareSocialOutline,
  VideocamOutline
} from '@vicons/ionicons5'
import type { Transaction, Lead, StatInfo, Meeting, BrowserStat } from './types'

export const STATISTICS_INFO: StatInfo[] = [
  { value: '1m',   label: 'Views',        icon: EyeOutline           },
  { value: '670k', label: 'Likes',        icon: HeartOutline         },
  { value: '100k', label: 'Shares',       icon: ShareSocialOutline   },
  { value: '54k',  label: 'Comments',     icon: ChatbubbleOutline    },
  { value: '98',   label: 'Videos',       icon: VideocamOutline      },
  { value: '7.6k', label: 'Profil Views', icon: EyeOutline           },
]

export const TRANSACTIONS: Transaction[] = [
  { id: 1,  customer: 'Alesa Noor',   avatar: 'https://i.pravatar.cc/150?img=1',  item: 'Nike T-Shirt', date: '24 June 2024', status: 'pending'   },
  { id: 2,  customer: 'Debid Rabd',   avatar: 'https://i.pravatar.cc/150?img=8',  item: 'Nike Hoodie',  date: '24 June 2024', status: 'completed' },
  { id: 3,  customer: 'Jonselor',     avatar: 'https://i.pravatar.cc/150?img=3',  item: 'Mac Mini',     date: '24 June 2024', status: 'pending'   },
  { id: 4,  customer: 'Sarah Miller', avatar: 'https://i.pravatar.cc/150?img=5',  item: 'Apple Watch',  date: '23 June 2024', status: 'completed' },
  { id: 5,  customer: 'John Cooper',  avatar: 'https://i.pravatar.cc/150?img=12', item: 'AirPods Pro',  date: '23 June 2024', status: 'pending'   },
  { id: 6,  customer: 'Emma Wilson',  avatar: 'https://i.pravatar.cc/150?img=9',  item: 'iPad Air',     date: '22 June 2024', status: 'completed' },
  { id: 7,  customer: 'John Cooper',  avatar: 'https://i.pravatar.cc/150?img=12', item: 'AirPods Pro',  date: '23 June 2024', status: 'pending'   },
  { id: 8,  customer: 'John Cooper',  avatar: 'https://i.pravatar.cc/150?img=12', item: 'AirPods Pro',  date: '23 June 2024', status: 'pending'   },
  { id: 9,  customer: 'Emma Wilson',  avatar: 'https://i.pravatar.cc/150?img=9',  item: 'iPad Air',     date: '22 June 2024', status: 'completed' },
  { id: 10, customer: 'John Cooper',  avatar: 'https://i.pravatar.cc/150?img=12', item: 'AirPods Pro',  date: '23 June 2024', status: 'pending'   },
]

export const LEADS: Lead[] = [
  { id: 1, name: 'Silvia Zieme',  time: 'Just Now',       avatar: 'https://i.pravatar.cc/40?img=5'  },
  { id: 2, name: 'Luke King',     time: '1 Minute Ago',   avatar: 'https://i.pravatar.cc/40?img=12' },
  { id: 3, name: 'Kim Ortiz',     time: '2 Minute Ago',   avatar: 'https://i.pravatar.cc/40?img=8'  },
  { id: 4, name: 'Ethan Carter',  time: '4 Minute Ago',   avatar: 'https://i.pravatar.cc/40?img=15' },
  { id: 5, name: 'Liam Johnson',  time: '8 Minute Ago',   avatar: 'https://i.pravatar.cc/40?img=3'  },
  { id: 6, name: 'Noah Smith',    time: '12 Minute Ago',  avatar: 'https://i.pravatar.cc/40?img=7'  },
  { id: 7, name: 'Mason Brown',   time: '17 Minute Ago',  avatar: 'https://i.pravatar.cc/40?img=11' },
]

export const BROWSER_STATS: BrowserStat[] = [
  { name: 'Chrome',  value: 14, colorVar: 'var(--color-warning)', indicatorClass: 'chrome'  },
  { name: 'Firefox', value: 32, colorVar: 'var(--color-primary)', indicatorClass: 'firefox' },
  { name: 'Edge',    value: 54, colorVar: 'var(--color-info)',    indicatorClass: 'edge'    },
  { name: 'Other',   value: 10, colorVar: 'var(--text-tertiary)', indicatorClass: 'other'   },
]

export const BROWSER_COLORS = [
  'var(--color-warning)',
  'var(--color-primary)',
  'var(--color-info)',
  'var(--text-tertiary)'
]

export const UPCOMING_MEETINGS: Meeting[] = [
  { id: 1, title: "Sam Saltman's Meeting - Sales Team",              iconColor: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)' },
]

export const LATER_MEETINGS: Meeting[] = [
  { id: 2, title: "Tom Harris's Meeting - Product Development",       iconColor: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' },
  { id: 3, title: "Rachel Nguyen's Meeting - Client Success Review",  iconColor: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' },
  { id: 4, title: "Emma Foster's Meeting - Team Performance Update",  iconColor: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' },
]

export const LINE_CHART_SERIES = [
  { name: 'Calls', data: [70, 25, 65, 100, 70, 30, 60, 65] }
]

export const LINE_CHART_CATEGORIES = [
  'Jan 2', 'Jan 9', 'Jan 16', 'Jan 23', 'Jan 30', 'Jan 35', 'Jan 35', 'Jan 35'
]

export const LINE_CHART_DROPDOWN = [
  { label: 'Export',   key: 'export'   },
  { label: 'Share',    key: 'share'    },
  { label: 'Settings', key: 'settings' },
]

export const STATS_BY_CHART_SERIES = [
  { name: 'Revenue', data: [31, 0, 32, 90, 120, 51, 42, 109, 100, 40, 35] }
]

export const STATS_BY_CHART_ITEMS = [
  { type: 'success' as const, label: 'Users',              value: '28.05k'  },
  { type: 'success' as const, label: 'Sessions',           value: '97.66k'  },
  { type: 'error'   as const, label: 'Avg. Visit Duration', value: '3m 40ses' },
  { type: 'success' as const, label: 'Bounce rate',        value: '33.48%'  },
]
