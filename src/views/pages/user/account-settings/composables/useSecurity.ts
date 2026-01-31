import { ref, reactive, computed } from 'vue'
import { useMessage } from 'naive-ui'
import type { SecurityData } from '../types'
import { PASSWORD_STRENGTH_RULES, MESSAGES } from '../constants'

export function useSecurity() {
  const message = useMessage()
  
  // Security Data State
  const securityData = reactive<SecurityData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  
  const isEditing = ref(false)
  
  // Computed Properties
  const passwordStrengthClass = computed((): string => {
    return PASSWORD_STRENGTH_RULES.getClass(securityData.newPassword)
  })
  
  const passwordStrengthText = computed((): string => {
    return PASSWORD_STRENGTH_RULES.getText(securityData.newPassword)
  })
  
  const isPasswordValid = computed((): boolean => {
    return (
      securityData.newPassword.length >= 6 &&
      securityData.newPassword === securityData.confirmPassword &&
      securityData.currentPassword.length > 0
    )
  })
  
  // Methods
  const editSecurity = () => {
    isEditing.value = true
  }
  
  const saveSecuritySettings = async () => {
    if (!isPasswordValid.value) {
      message.error('Please ensure all passwords are valid and match')
      return
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Reset form
      Object.assign(securityData, {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      
      isEditing.value = false
      message.success(MESSAGES.SECURITY_UPDATED)
      
      // Here you would typically make an API call to update password
      console.log('Security settings saved')
    } catch (error) {
      message.error('Failed to update security settings')
      console.error('Error updating security:', error)
    }
  }
  
  const cancelEdit = () => {
    isEditing.value = false
    // Reset form
    Object.assign(securityData, {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  }
  
  const clearPasswords = () => {
    Object.assign(securityData, {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  }
  
  return {
    securityData,
    isEditing,
    passwordStrengthClass,
    passwordStrengthText,
    isPasswordValid,
    editSecurity,
    saveSecuritySettings,
    cancelEdit,
    clearPasswords
  }
}
