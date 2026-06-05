import { Discount, DomainError } from '@descuentos-santiago/domain'
import type { DiscountDto, SaveDiscountInput } from '../dto/discount-dto.js'
import type { DiscountRepository } from '../ports/discount-repository.js'

export class SaveDiscount {
  constructor(private readonly repository: DiscountRepository) {}

  async execute(input: SaveDiscountInput): Promise<DiscountDto> {
    const existing = input.id ? await this.repository.getById(input.id) : null

    if (input.id && !existing) {
      throw new DomainError(`Discount ${input.id} was not found.`)
    }

    if (existing) {
      existing.update({
        title: input.title,
        description: input.description,
        businessName: input.businessName,
        comuna: input.comuna,
        category: input.category,
        percentageOff: input.percentageOff,
        sourceUrl: input.sourceUrl,
        tags: input.tags,
        priority: input.priority,
        featured: input.featured,
        status: input.status,
        startsAt: new Date(input.startsAt),
        expiresAt: new Date(input.expiresAt),
      })

      await this.repository.save(existing)
      return existing.toJSON()
    }

    const discount = Discount.create({
      id: crypto.randomUUID(),
      title: input.title,
      description: input.description,
      businessName: input.businessName,
      comuna: input.comuna,
      category: input.category,
      percentageOff: input.percentageOff,
      sourceUrl: input.sourceUrl,
      tags: input.tags,
      priority: input.priority,
      featured: input.featured,
      status: input.status ?? 'draft',
      startsAt: new Date(input.startsAt),
      expiresAt: new Date(input.expiresAt),
    })

    await this.repository.save(discount)
    return discount.toJSON()
  }
}
