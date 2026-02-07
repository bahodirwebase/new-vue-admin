// composables/useEmailUtils.ts
import type { Attachment } from '../types';

export function useEmailUtils() {
  /**
   * Email body-ni plain text dan HTML ga o'zgartirish
   */
  const parseEmailBody = (body: string): string => {
    let html = body
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>');

    // URL-larni linkga o'zgartirish
    html = html.replace(
      /(https?:\/\/[^\s<]+)/g,
      '<a href="$1" target="_blank" class="text-blue-500 hover:underline">$1</a>'
    );

    return html;
  };

  /**
   * File size-ni human-readable formatga o'zgartirish
   */
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  /**
   * Vaqtni relative format-ga o'zgartirish (e.g., "5 minutes ago")
   */
  const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

    // Agar bir nedeladan ko'p o'tgan bo'lsa, shuning o'zi date
    return formatDate(date);
  };

  /**
   * Sanani formatga o'zgartirish
   */
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  /**
   * Sanani va vaqtni formatga o'zgartirish
   */
  const formatDateTime = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  /**
   * Emailni preview text-ga olish
   */
  const getEmailPreview = (body: string, length: number = 150): string => {
    const text = body.replace(/<[^>]*>/g, '');
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  /**
   * Email attachment-larni group qilish
   */
  const groupAttachmentsByType = (attachments: Attachment[]) => {
    return attachments.reduce(
      (acc, attachment) => {
        const type = attachment.type.split('/')[0];
        if (!acc[type]) acc[type] = [];
        acc[type].push(attachment);
        return acc;
      },
      {} as Record<string, Attachment[]>
    );
  };

  /**
   * Email address-ni validate qilish
   */
  const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  /**
   * Multiple email address-larni parse qilish
   */
  const parseEmailAddresses = (text: string): string[] => {
    return text
      .split(/[,;]/)
      .map((email) => email.trim())
      .filter((email) => isValidEmail(email));
  };

  /**
   * Priority iconini olish
   */
  const getPriorityIcon = (priority: string): string => {
    const icons: Record<string, string> = {
      high: '⬆️',
      normal: '↔️',
      low: '⬇️',
    };
    return icons[priority] || '↔️';
  };

  /**
   * Priority colorini olish
   */
  const getPriorityColor = (priority: string): string => {
    const colors: Record<string, string> = {
      high: '#ff4d4f',
      normal: '#1890ff',
      low: '#52c41a',
    };
    return colors[priority] || '#1890ff';
  };

  return {
    parseEmailBody,
    formatFileSize,
    formatRelativeTime,
    formatDate,
    formatDateTime,
    getEmailPreview,
    groupAttachmentsByType,
    isValidEmail,
    parseEmailAddresses,
    getPriorityIcon,
    getPriorityColor,
  };
}
