import type { Discount, DiscountCategory, DiscountPriority, DiscountStatus } from '@descuentos-santiago/domain'

export type DiscountDto = ReturnType<Discount['toJSON']>

export type DiscountFilters = {
  comuna?: string
  category?: DiscountCategory
  status?: DiscountStatus
  priority?: DiscountPriority
  featured?: boolean
  search?: string
}

export type SaveDiscountInput = {
  id?: string
  title: string
  description: string
  businessName: string
  comuna: string
  category: DiscountCategory
  percentageOff: number
  sourceUrl?: string
  tags: string[]
  priority: DiscountPriority
  featured: boolean
  startsAt: string
  expiresAt: string
  status?: DiscountStatus
}

export type DashboardMetricsDto = {
  totalDiscounts: number
  publishedDiscounts: number
  featuredDiscounts: number
  expiringToday: number
  averagePercentageOff: number
  topComunas: Array<{ comuna: string; count: number }>
  categoryBreakdown: Array<{ category: string; count: number }>
}
