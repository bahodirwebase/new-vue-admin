// Account Settings Types

export interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  bio: string
}

export interface SecurityData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface Preferences {
  emailNotifications: boolean
  twoFactorAuth: boolean
  darkMode: boolean
  publicProfile: boolean
  marketingEmails: boolean
}

export interface AccountStats {
  memberSince: string
  totalProjects: number
  lastLogin: string
  securityLevel: string
}

export interface ConnectedAccount {
  platform: string
  icon: any
  connected: boolean
}

export interface PasswordStrength {
  class: string
  text: string
}

export type PasswordStrengthLevel = 'weak' | 'medium' | 'strong' | ''
