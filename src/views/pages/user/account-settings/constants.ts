// Account Settings Constants

export const ACCOUNT_STATICS = {
  DEFAULT_PERSONAL_INFO: {
    firstName: 'Alexandra',
    lastName: 'Chen',
    email: 'alexandra.chen@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Senior Full Stack Developer passionate about building scalable web applications.'
  },
  
  DEFAULT_PREFERENCES: {
    emailNotifications: true,
    twoFactorAuth: false,
    darkMode: false,
    publicProfile: true,
    marketingEmails: false
  },
  
  DEFAULT_ACCOUNT_STATS: {
    memberSince: 'Jan 2022',
    totalProjects: 127,
    lastLogin: '2 hours ago',
    securityLevel: 'High'
  }
}

export const PASSWORD_STRENGTH_RULES = {
  WEAK_MIN_LENGTH: 0,
  MEDIUM_MIN_LENGTH: 6,
  STRONG_MIN_LENGTH: 10,
  
  getClass(password: string): string {
    if (!password) return ''
    if (password.length < this.MEDIUM_MIN_LENGTH) return 'weak'
    if (password.length < this.STRONG_MIN_LENGTH) return 'medium'
    return 'strong'
  },
  
  getText(password: string): string {
    if (!password) return 'Enter a password'
    if (password.length < this.MEDIUM_MIN_LENGTH) return 'Weak'
    if (password.length < this.STRONG_MIN_LENGTH) return 'Medium'
    return 'Strong'
  }
}

export const CONNECTED_ACCOUNTS_DEFAULT = [
  { platform: 'GitHub', connected: true },
  { platform: 'Google', connected: true },
  { platform: 'Twitter', connected: false },
  { platform: 'Facebook', connected: false }
]

export const PREFERENCE_ITEMS = [
  {
    key: 'emailNotifications',
    title: 'Email Notifications',
    description: 'Receive email updates about your account activity'
  },
  {
    key: 'twoFactorAuth',
    title: 'Two-Factor Authentication',
    description: 'Add an extra layer of security to your account'
  },
  {
    key: 'darkMode',
    title: 'Dark Mode',
    description: 'Use dark theme across the application'
  },
  {
    key: 'publicProfile',
    title: 'Public Profile',
    description: 'Make your profile visible to other users'
  },
  {
    key: 'marketingEmails',
    title: 'Marketing Emails',
    description: 'Receive promotional offers and updates'
  }
]

export const FORM_LABELS = {
  PERSONAL_INFO: {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email Address',
    phone: 'Phone Number',
    bio: 'Bio'
  },
  SECURITY: {
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm New Password'
  }
}

export const PLACEHOLDERS = {
  PERSONAL_INFO: {
    firstName: 'Enter your first name',
    lastName: 'Enter your last name',
    email: 'Enter your email',
    phone: 'Enter your phone number',
    bio: 'Tell us about yourself'
  },
  SECURITY: {
    currentPassword: 'Enter current password',
    newPassword: 'Enter new password',
    confirmPassword: 'Confirm new password'
  }
}

export const DELETE_CONFIRMATION = {
  REQUIRED_TEXT: 'DELETE',
  WARNING_MESSAGE: 'Are you sure you want to delete your account? This action cannot be undone.',
  CONFIRM_LABEL: 'Type "DELETE" to confirm:'
}

export const MESSAGES = {
  SAVE_SUCCESS: 'All settings saved successfully!',
  PERSONAL_INFO_SAVED: 'Personal information updated successfully!',
  SECURITY_UPDATED: 'Security settings updated successfully!',
  PREFERENCES_UPDATED: 'Preferences updated successfully!',
  ACCOUNT_CONNECTED: 'Account connected successfully!',
  ACCOUNT_DISCONNECTED: 'Account disconnected successfully!',
  ACCOUNT_DELETED: 'Account deleted successfully!'
}
