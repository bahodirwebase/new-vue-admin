import { ref, reactive } from 'vue'
import { useMessage } from 'naive-ui'
import type { PersonalInfo } from '../types'
import { ACCOUNT_STATICS, MESSAGES } from '../constants'

export function usePersonalInfo() {
  const message = useMessage()
  
  // Personal Information State
  const personalInfo = reactive<PersonalInfo>({ ...ACCOUNT_STATICS.DEFAULT_PERSONAL_INFO })
  const isEditing = ref(false)
  
  // Methods
  const editPersonalInfo = () => {
    isEditing.value = true
  }
  
  const savePersonalInfo = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      isEditing.value = false
      message.success(MESSAGES.PERSONAL_INFO_SAVED)
      
      // TODO: Make API call to save personal info
      // await updatePersonalInfo(personalInfo)
    } catch (error) {
      message.error('Failed to save personal information')
      // TODO: Implement proper error logging service
      // logError('Personal info save failed', error)
    }
  }
  
  const cancelEdit = () => {
    isEditing.value = false
    // Reset to original values
    Object.assign(personalInfo, ACCOUNT_STATICS.DEFAULT_PERSONAL_INFO)
  }
  
  const updatePersonalInfo = (data: Partial<PersonalInfo>) => {
    Object.assign(personalInfo, data)
  }
  
  return {
    personalInfo,
    isEditing,
    editPersonalInfo,
    savePersonalInfo,
    cancelEdit,
    updatePersonalInfo
  }
}
