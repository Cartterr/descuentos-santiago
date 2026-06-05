import type { DiscountDto, DiscountFilters } from '../dto/discount-dto.js'
import type { DiscountRepository } from '../ports/discount-repository.js'

export class ListDiscounts {
  constructor(private readonly repository: DiscountRepository) {}

  async execute(filters?: DiscountFilters): Promise<DiscountDto[]> {
    const discounts = await this.repository.list(filters)
    return discounts.map((discount) => discount.toJSON())
  }
}
