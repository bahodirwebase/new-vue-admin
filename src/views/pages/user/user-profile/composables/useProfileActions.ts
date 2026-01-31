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
    console.log(PROFILE_MESSAGES.NAVIGATE_SETTINGS)
  }
  
  const editAbout = () => {
    editProfile()
  }
  
  const editSkills = () => {
    console.log('Edit skills functionality')
  }
  
  const editSocial = () => {
    console.log('Edit social links functionality')
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
