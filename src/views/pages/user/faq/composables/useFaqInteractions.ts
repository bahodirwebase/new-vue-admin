import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { CATEGORY_COLORS, FAQ_MESSAGES, FAQ_UI } from '../constants'
import { useFaqData } from './useFaqData'
import type { CategoryType } from '../types'

export function useFaqInteractions() {
  const message = useMessage()
  const { getFaqById } = useFaqData()
  
  // State
  const expandedItems = ref<number[]>([])
  
  // Methods
  const toggleFaq = (id: number) => {
    const index = expandedItems.value.indexOf(id)
    if (index > -1) {
      expandedItems.value.splice(index, 1)
    } else {
      expandedItems.value.push(id)
    }
  }
  
  const markHelpful = (id: number, helpful: boolean) => {
    const faq = getFaqById(id)
    if (faq) {
      faq.userFeedback = helpful
      if (helpful) {
        faq.helpfulCount++
        message.success(FAQ_MESSAGES.FEEDBACK_HELPFUL)
      } else {
        faq.notHelpfulCount++
        message.info(FAQ_MESSAGES.FEEDBACK_NOT_HELPFUL)
      }
    }
  }
  
  const getCategoryColor = (category: string): CategoryType => {
    return CATEGORY_COLORS[category] || 'default'
  }
  
  const goToQuestion = (id: number) => {
    const faq = getFaqById(id)
    if (faq) {
      // Expand the FAQ
      if (!expandedItems.value.includes(id)) {
        expandedItems.value.push(id)
      }
      
      // Scroll to the FAQ item
      setTimeout(() => {
        const element = document.querySelector(`.faq-item[data-faq-id="${id}"]`)
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, FAQ_UI.SCROLL_DELAY)
    }
  }
  
  const contactSupport = () => {
    message.info(FAQ_MESSAGES.CONTACT_SUPPORT)
  }
  
  const startLiveChat = () => {
    message.info(FAQ_MESSAGES.START_LIVE_CHAT)
  }
  
  return {
    // State
    expandedItems,
    
    // Methods
    toggleFaq,
    markHelpful,
    getCategoryColor,
    goToQuestion,
    contactSupport,
    startLiveChat
  }
}
