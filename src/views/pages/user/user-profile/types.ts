export interface UserProfile {
  fullName: string
  title: string
  location: string
  company: string
  joinDate: string
  about: string
  projectsCompleted: number
  experience: string
  rating: number
  avatar: string
  coverImage: string
}

export interface Skill {
  name: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
}

export interface SocialLink {
  platform: string
  url: string
  icon: any
}

export interface Project {
  id: number
  name: string
  description: string
  image: string
  likes: number
  comments: number
}

export interface Activity {
  id: number
  type: 'project' | 'achievement' | 'social' | 'time'
  icon: any
  text: string
  time: string
}

export interface EditForm {
  fullName: string
  title: string
  location: string
  company: string
  about: string
}

export interface ActivityOption {
  label: string
  key: string
}

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
export type ActivityType = 'project' | 'achievement' | 'social' | 'time'
