import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { MESSAGES, DELETE_CONFIRMATION } from '../constants'

export function useAccountActions() {
  const message = useMessage()
  
  // Modal States
  const showDeleteModal = ref(false)
  const deleteConfirmation = ref('')
  const isLoading = ref(false)
  
  // Methods
  const saveAllSettings = async () => {
    isLoading.value = true
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      message.success(MESSAGES.SAVE_SUCCESS)
      
      // Here you would typically save all settings
      console.log('All settings saved')
    } catch (error) {
      message.error('Failed to save settings')
      console.error('Error saving settings:', error)
    } finally {
      isLoading.value = false
    }
  }
  
  const openDeleteModal = () => {
    showDeleteModal.value = true
    deleteConfirmation.value = ''
  }
  
  const closeDeleteModal = () => {
    showDeleteModal.value = false
    deleteConfirmation.value = ''
  }
  
  const deleteAccount = async () => {
    if (deleteConfirmation.value !== DELETE_CONFIRMATION.REQUIRED_TEXT) {
      return
    }
    
    isLoading.value = true
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      message.success(MESSAGES.ACCOUNT_DELETED)
      closeDeleteModal()
      
      // Here you would typically redirect to login or home page
      console.log('Account deleted')
    } catch (error) {
      message.error('Failed to delete account')
      console.error('Error deleting account:', error)
    } finally {
      isLoading.value = false
    }
  }
  
  const canDeleteAccount = (): boolean => {
    return deleteConfirmation.value === DELETE_CONFIRMATION.REQUIRED_TEXT
  }
  
  return {
    showDeleteModal,
    deleteConfirmation,
    isLoading,
    saveAllSettings,
    openDeleteModal,
    closeDeleteModal,
    deleteAccount,
    canDeleteAccount
  }
}
