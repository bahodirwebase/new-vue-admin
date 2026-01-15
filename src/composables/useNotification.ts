import { ref, computed } from 'vue'

export interface Notification {
  id: number
  message: string
  time: string
  read: boolean
  icon: any
  color: string
}

export function useNotification() {
  const notifications = ref<Notification[]>([
    {
      id: 1,
      message: 'New order received from John Doe',
      time: '2 minutes ago',
      read: false,
      icon: null,
      color: '#3b82f6'
    },
    {
      id: 2,
      message: 'You have a new message from support',
      time: '15 minutes ago',
      read: false,
      icon: null,
      color: '#10b981'
    },
    {
      id: 3,
      message: 'Your order #12345 has been shipped',
      time: '1 hour ago',
      read: true,
      icon: null,
      color: '#f59e0b'
    },
    {
      id: 4,
      message: 'System maintenance scheduled for tonight',
      time: '3 hours ago',
      read: true,
      icon: null,
      color: '#ef4444'
    }
  ])

  const unreadCount = computed(() => {
    return notifications.value.filter(n => !n.read).length
  })

  const markAsRead = (id: number) => {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      notification.read = true
    }
  }

  const markAllAsRead = () => {
    notifications.value.forEach(n => n.read = true)
  }

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now()
    }
    notifications.value.unshift(newNotification)
  }

  const removeNotification = (id: number) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification,
    removeNotification
  }
}
