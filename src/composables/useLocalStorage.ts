import { ref, watch } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const storedValue = ref<T>(defaultValue)

  // Load from localStorage
  const loadValue = () => {
    try {
      const item = window.localStorage.getItem(key)
      if (item !== null) {
        storedValue.value = JSON.parse(item)
      }
    } catch (error) {
      console.warn(`Error loading localStorage key "${key}":`, error)
      storedValue.value = defaultValue
    }
  }

  // Save to localStorage
  const saveValue = (value: T) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`Error saving localStorage key "${key}":`, error)
    }
  }

  // Watch for changes and save
  watch(
    storedValue,
    (newValue) => {
      saveValue(newValue)
    },
    { deep: true }
  )

  // Initialize
  loadValue()

  return storedValue
}
