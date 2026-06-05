import { DomainError } from '../errors/domain-error.js'
import { DiscountWindow } from '../value-objects/discount-window.js'

export type DiscountStatus = 'draft' | 'published' | 'archived'
export type DiscountPriority = 'high' | 'medium' | 'low'
export type DiscountCategory =
  | 'Comida'
  | 'Farmacia'
  | 'Retail'
  | 'Belleza'
  | 'Servicios'
  | 'Panorama'

export type DiscountProps = {
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
  startsAt: Date
  expiresAt: Date
  createdAt: Date
  updatedAt: Date
}

export type DiscountUpdate = Partial<
  Pick<
    DiscountProps,
    | 'title'
    | 'description'
    | 'businessName'
    | 'comuna'
    | 'category'
    | 'percentageOff'
    | 'sourceUrl'
    | 'tags'
    | 'priority'
    | 'featured'
    | 'status'
    | 'startsAt'
    | 'expiresAt'
  >
>

export class Discount {
  private props: DiscountProps

  constructor(props: DiscountProps) {
    this.assertPercentage(props.percentageOff)
    this.props = {
      ...props,
      title: props.title.trim(),
      description: props.description.trim(),
      businessName: props.businessName.trim(),
      comuna: props.comuna.trim(),
      tags: props.tags.map((tag) => tag.trim()).filter(Boolean),
    }
    this.window
  }

  static create(input: Omit<DiscountProps, 'createdAt' | 'updatedAt'>) {
    const now = new Date()
    return new Discount({
      ...input,
      createdAt: now,
      updatedAt: now,
    })
  }

  get id() {
    return this.props.id
  }

  get title() {
    return this.props.title
  }

  get status() {
    return this.props.status
  }

  get comuna() {
    return this.props.comuna
  }

  get category() {
    return this.props.category
  }

  get priority() {
    return this.props.priority
  }

  get featured() {
    return this.props.featured
  }

  get percentageOff() {
    return this.props.percentageOff
  }

  get window() {
    return new DiscountWindow(this.props.startsAt, this.props.expiresAt)
  }

  publish() {
    if (this.props.status === 'archived') {
      throw new DomainError('Archived discounts cannot be published.')
    }

    this.props.status = 'published'
    this.touch()
  }

  archive() {
    this.props.status = 'archived'
    this.touch()
  }

  update(input: DiscountUpdate) {
    if (input.percentageOff !== undefined) {
      this.assertPercentage(input.percentageOff)
    }

    const nextStartsAt = input.startsAt ?? this.props.startsAt
    const nextExpiresAt = input.expiresAt ?? this.props.expiresAt
    new DiscountWindow(nextStartsAt, nextExpiresAt)

    this.props = {
      ...this.props,
      ...input,
      tags: input.tags ? input.tags.map((tag) => tag.trim()).filter(Boolean) : this.props.tags,
      updatedAt: new Date(),
    }
  }

  toJSON() {
    return {
      ...this.props,
      startsAt: this.props.startsAt.toISOString(),
      expiresAt: this.props.expiresAt.toISOString(),
      createdAt: this.props.createdAt.toISOString(),
      updatedAt: this.props.updatedAt.toISOString(),
      urgencyLabel: this.window.urgencyLabel,
    }
  }

  private assertPercentage(value: number) {
    if (value <= 0 || value > 100) {
      throw new DomainError('Discount percentage must be between 1 and 100.')
    }
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
