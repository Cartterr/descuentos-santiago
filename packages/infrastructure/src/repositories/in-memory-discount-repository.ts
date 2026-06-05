import type { Discount } from '@descuentos-santiago/domain'
import type { DiscountFilters, DiscountRepository } from '@descuentos-santiago/application'
import { seedDiscounts } from '../seed/seed-discounts.js'

export class InMemoryDiscountRepository implements DiscountRepository {
  private readonly discounts = new Map<string, Discount>()

  constructor(seed: Discount[] = seedDiscounts) {
    for (const discount of seed) {
      this.discounts.set(discount.id, discount)
    }
  }

  async list(filters?: DiscountFilters): Promise<Discount[]> {
    const normalizedSearch = filters?.search?.trim().toLowerCase()

    return [...this.discounts.values()]
      .filter((discount) => {
        if (filters?.comuna && discount.comuna !== filters.comuna) return false
        if (filters?.category && discount.category !== filters.category) return false
        if (filters?.status && discount.status !== filters.status) return false
        if (filters?.priority && discount.priority !== filters.priority) return false
        if (filters?.featured !== undefined && discount.featured !== filters.featured) return false

        if (normalizedSearch) {
          const haystack = JSON.stringify(discount.toJSON()).toLowerCase()
          return haystack.includes(normalizedSearch)
        }

        return true
      })
      .sort((a, b) => b.toJSON().updatedAt.localeCompare(a.toJSON().updatedAt))
  }

  async getById(id: string): Promise<Discount | null> {
    return this.discounts.get(id) ?? null
  }

  async save(discount: Discount): Promise<void> {
    this.discounts.set(discount.id, discount)
  }
}
