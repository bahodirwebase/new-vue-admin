import type { FaqItem, PopularQuestion } from './types'

// FAQ Categories
export const FAQ_CATEGORIES: string[] = ['All', 'General', 'Billing', 'Account', 'Technical', 'Security']

// Category Colors Mapping
export const CATEGORY_COLORS: Record<string, "default" | "primary" | "info" | "success" | "warning" | "error"> = {
  'General': 'default',
  'Billing': 'warning',
  'Account': 'info',
  'Technical': 'success',
  'Security': 'error'
}

// FAQ Data
export const FAQ_DATA: FaqItem[] = [
  {
    id: 1,
    category: 'General',
    question: 'What is this service about?',
    answer: 'Our service provides a comprehensive platform for managing projects, collaborating with teams, and tracking progress. We offer various tools and features to help streamline your workflow and improve productivity. From task management to real-time collaboration, we\'ve got everything you need to succeed.',
    helpfulCount: 45,
    notHelpfulCount: 3,
    userFeedback: null,
    links: [
      { text: 'Getting Started Guide', url: '#' },
      { text: 'Feature Overview', url: '#' }
    ]
  },
  {
    id: 2,
    category: 'Billing',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers. All payments are processed securely through our payment partners with industry-standard encryption.',
    helpfulCount: 38,
    notHelpfulCount: 2,
    userFeedback: null,
    links: [
      { text: 'Billing Settings', url: '#' },
      { text: 'Invoice History', url: '#' }
    ]
  },
  {
    id: 3,
    category: 'Account',
    question: 'How do I reset my password?',
    answer: 'To reset your password, click on the "Forgot Password" link on the login page. Enter your email address, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password. The link expires after 24 hours for security reasons.',
    helpfulCount: 67,
    notHelpfulCount: 1,
    userFeedback: null,
    links: []
  },
  {
    id: 4,
    category: 'Technical',
    question: 'What browsers are supported?',
    answer: 'Our platform works best on the latest versions of Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated to ensure the best experience and security. Mobile browsers are also supported for on-the-go access.',
    helpfulCount: 29,
    notHelpfulCount: 4,
    userFeedback: null,
    links: [
      { text: 'Browser Requirements', url: '#' },
      { text: 'Mobile App', url: '#' }
    ]
  },
  {
    id: 5,
    category: 'Security',
    question: 'How is my data protected?',
    answer: 'We use industry-standard AES-256 encryption to protect your data both in transit and at rest. Our servers are hosted in secure data centers with 24/7 monitoring, and we regularly perform security audits to ensure your information remains safe.',
    helpfulCount: 52,
    notHelpfulCount: 0,
    userFeedback: null,
    links: [
      { text: 'Security Policy', url: '#' },
      { text: 'Privacy Policy', url: '#' }
    ]
  },
  {
    id: 6,
    category: 'Billing',
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period. No refunds are provided for partial months, but you can continue using the service until your subscription expires.',
    helpfulCount: 41,
    notHelpfulCount: 5,
    userFeedback: null,
    links: []
  },
  {
    id: 7,
    category: 'General',
    question: 'Is there a free trial available?',
    answer: 'Yes! We offer a 14-day free trial for all new users. You\'ll have access to all features during the trial period. No credit card is required to start your trial, and you can upgrade anytime.',
    helpfulCount: 73,
    notHelpfulCount: 2,
    userFeedback: null,
    links: [
      { text: 'Start Free Trial', url: '#' },
      { text: 'Pricing Plans', url: '#' }
    ]
  },
  {
    id: 8,
    category: 'Technical',
    question: 'Can I integrate with other tools?',
    answer: 'Yes, we offer integrations with popular tools like Slack, Google Drive, GitHub, and many more. You can also use our REST API to build custom integrations for your specific needs. Webhooks are also available for real-time updates.',
    helpfulCount: 35,
    notHelpfulCount: 3,
    userFeedback: null,
    links: [
      { text: 'API Documentation', url: '#' },
      { text: 'Available Integrations', url: '#' }
    ]
  }
]

// Popular Questions
export const POPULAR_QUESTIONS: PopularQuestion[] = [
  { id: 7, question: 'Is there a free trial available?', views: 1234 },
  { id: 3, question: 'How do I reset my password?', views: 987 },
  { id: 5, question: 'How is my data protected?', views: 856 },
  { id: 2, question: 'What payment methods do you accept?', views: 743 }
]

// Messages
export const FAQ_MESSAGES = {
  FEEDBACK_HELPFUL: 'Thank you for your feedback!',
  FEEDBACK_NOT_HELPFUL: 'Thank you! We\'ll use this to improve our help content.',
  CONTACT_SUPPORT: 'Redirecting to support contact form...',
  START_LIVE_CHAT: 'Starting live chat session...'
}

// Stats
export const FAQ_STATS = {
  SUPPORT_AVAILABLE: '24/7'
}

// UI Constants
export const FAQ_UI = {
  SCROLL_DELAY: 100,
  CONFIRMATION_TEXT: 'DELETE'
}
