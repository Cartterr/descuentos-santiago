import { DomainError } from '@descuentos-santiago/domain'
import type { DiscountDto } from '../dto/discount-dto.js'
import type { DiscountRepository } from '../ports/discount-repository.js'

export class PublishDiscount {
  constructor(private readonly repository: DiscountRepository) {}

  async execute(id: string): Promise<DiscountDto> {
    const discount = await this.repository.getById(id)

    if (!discount) {
      throw new DomainError(`Discount ${id} was not found.`)
    }

    discount.publish()
    await this.repository.save(discount)
    return discount.toJSON()
  }
}
