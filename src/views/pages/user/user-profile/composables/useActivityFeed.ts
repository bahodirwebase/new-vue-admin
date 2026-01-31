import { ref, computed } from 'vue'
import { RECENT_ACTIVITIES, ACTIVITY_OPTIONS } from '../constants'
import type { Activity } from '../types'

export function useActivityFeed() {
  // State
  const activities = ref(RECENT_ACTIVITIES)
  const selectedFilter = ref('all')
  
  // Options
  const activityOptions = ACTIVITY_OPTIONS
  
  // Computed: Filtered Activities
  const filteredActivities = computed(() => {
    if (selectedFilter.value === 'all') {
      return activities.value
    }
    return activities.value.filter(activity => activity.type === selectedFilter.value)
  })
  
  // Methods
  const filterActivities = (filter: string) => {
    selectedFilter.value = filter
  }
  
  const clearFilter = () => {
    selectedFilter.value = 'all'
  }
  
  const addActivity = (activity: Activity) => {
    activities.value.unshift(activity)
  }
  
  const removeActivity = (id: number) => {
    const index = activities.value.findIndex(activity => activity.id === id)
    if (index > -1) {
      activities.value.splice(index, 1)
    }
  }
  
  const getActivityById = (id: number): Activity | undefined => {
    return activities.value.find(activity => activity.id === id)
  }
  
  const getActivitiesByType = (type: string): Activity[] => {
    return activities.value.filter(activity => activity.type === type)
  }
  
  return {
    // State
    activities,
    selectedFilter,
    activityOptions,
    
    // Computed
    filteredActivities,
    
    // Methods
    filterActivities,
    clearFilter,
    addActivity,
    removeActivity,
    getActivityById,
    getActivitiesByType
  }
}
