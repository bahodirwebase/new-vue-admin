export interface FaqItem {
  id: number
  category: string
  question: string
  answer: string
  helpfulCount: number
  notHelpfulCount: number
  userFeedback: boolean | null
  links: RelatedLink[]
}

export interface RelatedLink {
  text: string
  url: string
}

export interface PopularQuestion {
  id: number
  question: string
  views: number
}

export interface FaqCategory {
  name: string
  color: "default" | "primary" | "info" | "success" | "warning" | "error"
}

export interface FaqStats {
  totalQuestions: number
  helpfulVotes: number
  supportAvailable: string
}

export type CategoryType = "default" | "primary" | "info" | "success" | "warning" | "error"
