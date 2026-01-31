import { reactive } from 'vue'
import { 
  DEFAULT_USER_DATA, 
  DEFAULT_SKILLS, 
  SOCIAL_LINKS, 
  RECENT_PROJECTS 
} from '../constants'
import type { UserProfile, Skill, SocialLink, Project } from '../types'

export function useUserProfile() {
  // User Profile State
  const userData = reactive<UserProfile>(DEFAULT_USER_DATA)
  
  // Skills State
  const skills = reactive<Skill[]>(DEFAULT_SKILLS)
  
  // Social Links State
  const socialLinks = reactive<SocialLink[]>(SOCIAL_LINKS)
  
  // Recent Projects State
  const recentProjects = reactive<Project[]>(RECENT_PROJECTS)
  
  // Methods
  const updateProfile = (updates: Partial<UserProfile>) => {
    Object.assign(userData, updates)
  }
  
  const updateSkills = (newSkills: Skill[]) => {
    skills.splice(0, skills.length, ...newSkills)
  }
  
  const addSkill = (skill: Skill) => {
    skills.push(skill)
  }
  
  const removeSkill = (skillName: string) => {
    const index = skills.findIndex(skill => skill.name === skillName)
    if (index > -1) {
      skills.splice(index, 1)
    }
  }
  
  const updateSocialLinks = (newLinks: SocialLink[]) => {
    socialLinks.splice(0, socialLinks.length, ...newLinks)
  }
  
  const getSkillByName = (name: string): Skill | undefined => {
    return skills.find(skill => skill.name === name)
  }
  
  const getProjectById = (id: number): Project | undefined => {
    return recentProjects.find(project => project.id === id)
  }
  
  return {
    // State
    userData,
    skills,
    socialLinks,
    recentProjects,
    
    // Methods
    updateProfile,
    updateSkills,
    addSkill,
    removeSkill,
    updateSocialLinks,
    getSkillByName,
    getProjectById
  }
}
