import { ref, reactive } from 'vue'
import { useMessage } from 'naive-ui'
import { PROFILE_MESSAGES } from '../constants'
import { useUserProfile } from './useUserProfile'
import type { EditForm } from '../types'

export function useProfileActions() {
  const message = useMessage()
  const { userData, updateProfile } = useUserProfile()
  
  // Modal State
  const showEditModal = ref(false)
  const editForm = reactive<EditForm>({
    fullName: userData.fullName,
    title: userData.title,
    location: userData.location,
    company: userData.company,
    about: userData.about
  })
  
  // Methods
  const editProfile = () => {
    // Reset form with current data
    Object.assign(editForm, {
      fullName: userData.fullName,
      title: userData.title,
      location: userData.location,
      company: userData.company,
      about: userData.about
    })
    showEditModal.value = true
  }
  
  const saveProfile = () => {
    updateProfile(editForm)
    showEditModal.value = false
    message.success(PROFILE_MESSAGES.PROFILE_SAVED)
  }
  
  const cancelEdit = () => {
    showEditModal.value = false
  }
  
  const viewSettings = () => {
    // TODO: Navigate to settings page
    // Router navigation to be implemented
  }
  
  const editAbout = () => {
    editProfile()
  }
  
  const editSkills = () => {
    // TODO: Implement skills editing functionality
    // Will open skills modal or navigate to skills section
  }
  
  const editSocial = () => {
    // TODO: Implement social links editing functionality
    // Will open social links modal
  }
  
  return {
    // State
    showEditModal,
    editForm,
    
    // Methods
    editProfile,
    saveProfile,
    cancelEdit,
    viewSettings,
    editAbout,
    editSkills,
    editSocial
  }
}
