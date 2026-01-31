import { reactive } from 'vue'
import { useMessage } from 'naive-ui'
import type { Preferences } from '../types'
import { ACCOUNT_STATICS, MESSAGES, PREFERENCE_ITEMS } from '../constants'

export function usePreferences() {
  const message = useMessage()
  
  // Preferences State
  const preferences = reactive<Preferences>({ ...ACCOUNT_STATICS.DEFAULT_PREFERENCES })
  
  // Methods
  const updatePreference = (key: keyof Preferences, value: boolean) => {
    preferences[key] = value
  }
  
  const savePreferences = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      message.success(MESSAGES.PREFERENCES_UPDATED)
      
      // Here you would typically make an API call to save preferences
      console.log('Preferences saved:', preferences)
    } catch (error) {
      message.error('Failed to save preferences')
      console.error('Error saving preferences:', error)
    }
  }
  
  const resetPreferences = () => {
    Object.assign(preferences, ACCOUNT_STATICS.DEFAULT_PREFERENCES)
  }
  
  const getPreferenceItems = () => {
    return PREFERENCE_ITEMS.map(item => ({
      ...item,
      value: preferences[item.key as keyof Preferences]
    }))
  }
  
  return {
    preferences,
    updatePreference,
    savePreferences,
    resetPreferences,
    getPreferenceItems
  }
}
