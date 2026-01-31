import { reactive } from 'vue'
import { FAQ_DATA, POPULAR_QUESTIONS } from '../constants'
import type { FaqItem, PopularQuestion } from '../types'

export function useFaqData() {
  // FAQ Items State
  const faqs = reactive<FaqItem[]>(FAQ_DATA)
  
  // Popular Questions State
  const popularQuestions = reactive<PopularQuestion[]>(POPULAR_QUESTIONS)
  
  // Get FAQ by ID
  const getFaqById = (id: number): FaqItem | undefined => {
    return faqs.find(faq => faq.id === id)
  }
  
  // Get FAQs by category
  const getFaqsByCategory = (category: string): FaqItem[] => {
    if (category === 'All') return faqs
    return faqs.filter(faq => faq.category === category)
  }
  
  // Search FAQs
  const searchFaqs = (query: string): FaqItem[] => {
    if (!query) return faqs
    
    const lowerQuery = query.toLowerCase()
    return faqs.filter(faq => 
      faq.question.toLowerCase().includes(lowerQuery) || 
      faq.answer.toLowerCase().includes(lowerQuery)
    )
  }
  
  // Get total helpful votes
  const getTotalHelpfulVotes = (): number => {
    return faqs.reduce((total, faq) => total + faq.helpfulCount, 0)
  }
  
  return {
    faqs,
    popularQuestions,
    getFaqById,
    getFaqsByCategory,
    searchFaqs,
    getTotalHelpfulVotes
  }
}
