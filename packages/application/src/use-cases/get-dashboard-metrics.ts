import type { DashboardMetricsDto } from '../dto/discount-dto.js'
import type { DiscountRepository } from '../ports/discount-repository.js'

export class GetDashboardMetrics {
  constructor(private readonly repository: DiscountRepository) {}

  async execute(): Promise<DashboardMetricsDto> {
    const discounts = await this.repository.list()
    const published = discounts.filter((discount) => discount.status === 'published')
    const featured = published.filter((discount) => discount.featured)
    const expiringToday = published.filter((discount) => discount.window.urgencyLabel === 'vence-hoy')

    const byComuna = new Map<string, number>()
    const byCategory = new Map<string, number>()

    for (const discount of published) {
      byComuna.set(discount.comuna, (byComuna.get(discount.comuna) ?? 0) + 1)
      byCategory.set(discount.category, (byCategory.get(discount.category) ?? 0) + 1)
    }

    const averagePercentageOff =
      published.length > 0
        ? Number(
            (
              published.reduce((sum, discount) => sum + discount.percentageOff, 0) / published.length
            ).toFixed(1),
          )
        : 0

    return {
      totalDiscounts: discounts.length,
      publishedDiscounts: published.length,
      featuredDiscounts: featured.length,
      expiringToday: expiringToday.length,
      averagePercentageOff,
      topComunas: [...byComuna.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([comuna, count]) => ({ comuna, count })),
      categoryBreakdown: [...byCategory.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([category, count]) => ({ category, count })),
    }
  }
}
