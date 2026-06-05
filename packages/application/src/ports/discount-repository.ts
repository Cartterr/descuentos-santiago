import type { Discount } from '@descuentos-santiago/domain'
import type { DiscountFilters } from '../dto/discount-dto.js'

export interface DiscountRepository {
  list(filters?: DiscountFilters): Promise<Discount[]>
  getById(id: string): Promise<Discount | null>
  save(discount: Discount): Promise<void>
}
