import { DomainError } from '../errors/domain-error.js'

export class DiscountWindow {
  readonly startsAt: Date
  readonly expiresAt: Date

  constructor(startsAt: Date, expiresAt: Date) {
    if (expiresAt.getTime() <= startsAt.getTime()) {
      throw new DomainError('Discount expiry must be after the start date.')
    }

    this.startsAt = startsAt
    this.expiresAt = expiresAt
  }

  get urgencyLabel(): 'vence-hoy' | 'vence-pronto' | 'programado' {
    const now = Date.now()
    const expiresIn = this.expiresAt.getTime() - now

    if (expiresIn <= 24 * 60 * 60 * 1000) {
      return 'vence-hoy'
    }

    if (expiresIn <= 72 * 60 * 60 * 1000) {
      return 'vence-pronto'
    }

    return 'programado'
  }
}
