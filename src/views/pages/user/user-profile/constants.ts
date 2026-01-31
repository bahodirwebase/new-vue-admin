import {
  LogoGithub, LogoTwitter, LogoLinkedin, LogoFacebook,
  DocumentTextOutline, TrophyOutline, PeopleOutline, TimeOutline
} from '@vicons/ionicons5'
import type { UserProfile, Skill, SocialLink, Project, Activity, ActivityOption } from './types'

// Default User Data
export const DEFAULT_USER_DATA: UserProfile = {
  fullName: 'Alexandra Chen',
  title: 'Senior Full Stack Developer',
  location: 'San Francisco, CA',
  company: 'Tech Innovations Inc.',
  joinDate: 'January 2022',
  about: 'Passionate full-stack developer with 8+ years of experience building scalable web applications. Specialized in Vue.js, Node.js, and cloud architecture. Love contributing to open source and mentoring junior developers.',
  projectsCompleted: 127,
  experience: '8+ years',
  rating: 4.9,
  avatar: 'https://i.pravatar.cc/150?img=3',
  coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
}

// Default Skills
export const DEFAULT_SKILLS: Skill[] = [
  { name: 'Vue.js', level: 'Expert' },
  { name: 'TypeScript', level: 'Expert' },
  { name: 'Node.js', level: 'Advanced' },
  { name: 'Python', level: 'Advanced' },
  { name: 'AWS', level: 'Intermediate' },
  { name: 'Docker', level: 'Intermediate' },
  { name: 'GraphQL', level: 'Advanced' },
  { name: 'MongoDB', level: 'Advanced' }
]

// Social Links
export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'GitHub', url: 'https://github.com', icon: LogoGithub },
  { platform: 'Twitter', url: 'https://twitter.com', icon: LogoTwitter },
  { platform: 'LinkedIn', url: 'https://linkedin.com', icon: LogoLinkedin },
  { platform: 'Facebook', url: 'https://facebook.com', icon: LogoFacebook }
]

// Recent Projects
export const RECENT_PROJECTS: Project[] = [
  {
    id: 1,
    name: 'E-Commerce Platform',
    description: 'Modern e-commerce solution with Vue 3',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    likes: 234,
    comments: 45
  },
  {
    id: 2,
    name: 'Task Management App',
    description: 'Collaborative project management tool',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    likes: 189,
    comments: 32
  },
  {
    id: 3,
    name: 'Analytics Dashboard',
    description: 'Real-time data visualization platform',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    likes: 156,
    comments: 28
  }
]

// Recent Activities
export const RECENT_ACTIVITIES: Activity[] = [
  {
    id: 1,
    type: 'project',
    icon: DocumentTextOutline,
    text: 'Completed E-Commerce Platform project',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'achievement',
    icon: TrophyOutline,
    text: 'Earned "Top Contributor" badge',
    time: '1 day ago'
  },
  {
    id: 3,
    type: 'social',
    icon: PeopleOutline,
    text: 'Connected with 5 new developers',
    time: '2 days ago'
  },
  {
    id: 4,
    type: 'time',
    icon: TimeOutline,
    text: 'Logged 40 hours this week',
    time: '3 days ago'
  }
]

// Activity Filter Options
export const ACTIVITY_OPTIONS: ActivityOption[] = [
  { label: 'All Activities', key: 'all' },
  { label: 'Projects', key: 'project' },
  { label: 'Achievements', key: 'achievement' },
  { label: 'Social', key: 'social' }
]

// Skill Level Colors
export const SKILL_LEVEL_COLORS: Record<string, "default" | "primary" | "info" | "success" | "warning" | "error"> = {
  'Expert': 'success',
  'Advanced': 'primary',
  'Intermediate': 'default',
  'Beginner': 'warning'
}

// Messages
export const PROFILE_MESSAGES = {
  PROFILE_SAVED: 'Profile updated successfully!',
  NAVIGATE_SETTINGS: 'Navigate to settings'
}

// UI Constants
export const PROFILE_UI = {
  DEFAULT_AVATAR: 'https://i.pravatar.cc/150?img=3',
  DEFAULT_COVER: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
}
