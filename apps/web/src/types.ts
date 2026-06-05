export type DiscountStatus = 'draft' | 'published' | 'archived'
export type DiscountPriority = 'high' | 'medium' | 'low'
export type DiscountCategory =
  | 'Comida'
  | 'Farmacia'
  | 'Retail'
  | 'Belleza'
  | 'Servicios'
  | 'Panorama'

export type DiscountRecord = {
  id: string
  title: string
  description: string
  businessName: string
  comuna: string
  category: DiscountCategory
  percentageOff: number
  sourceUrl?: string
  tags: string[]
  status: DiscountStatus
  priority: DiscountPriority
  featured: boolean
  startsAt: string
  expiresAt: string
  createdAt: string
  updatedAt: string
  urgencyLabel: 'vence-hoy' | 'vence-pronto' | 'programado'
}

export type DashboardMetrics = {
  totalDiscounts: number
  publishedDiscounts: number
  featuredDiscounts: number
  expiringToday: number
  averagePercentageOff: number
  topComunas: Array<{ comuna: string; count: number }>
  categoryBreakdown: Array<{ category: string; count: number }>
}

export type DiscountFormState = {
  id?: string
  title: string
  description: string
  businessName: string
  comuna: string
  category: DiscountCategory
  percentageOff: number
  sourceUrl: string
  tags: string
  priority: DiscountPriority
  featured: boolean
  startsAt: string
  expiresAt: string
  status: DiscountStatus
}
