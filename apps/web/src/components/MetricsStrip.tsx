import type { DashboardMetrics } from '../types'

type MetricsStripProps = {
  metrics: DashboardMetrics | null
}

export function MetricsStrip({ metrics }: MetricsStripProps) {
  const items = metrics
    ? [
        ['descuentos totales', String(metrics.totalDiscounts)],
        ['publicados', String(metrics.publishedDiscounts)],
        ['featured', String(metrics.featuredDiscounts)],
        ['vencen hoy', String(metrics.expiringToday)],
      ]
    : [
        ['descuentos totales', '--'],
        ['publicados', '--'],
        ['featured', '--'],
        ['vencen hoy', '--'],
      ]

  return (
    <section className="metrics-strip">
      {items.map(([label, value]) => (
        <article key={label} className="metric-tile">
          <strong>{value}</strong>
          <span>{label}</span>
        </article>
      ))}
    </section>
  )
}
