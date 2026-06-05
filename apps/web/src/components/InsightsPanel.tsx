import type { DashboardMetrics } from '../types'

type InsightsPanelProps = {
  metrics: DashboardMetrics | null
}

export function InsightsPanel({ metrics }: InsightsPanelProps) {
  return (
    <section className="insights-grid">
      <article className="card">
        <div className="section-header">
          <div>
            <p className="eyebrow">Top comunas</p>
            <h2>Donde se concentra la oferta</h2>
          </div>
        </div>
        <div className="stack-list">
          {metrics?.topComunas.map((item) => (
            <div key={item.comuna} className="stack-row">
              <span>{item.comuna}</span>
              <strong>{item.count}</strong>
            </div>
          )) ?? <p className="muted">Cargando...</p>}
        </div>
      </article>

      <article className="card">
        <div className="section-header">
          <div>
            <p className="eyebrow">Breakdown</p>
            <h2>Categorias con mayor peso</h2>
          </div>
        </div>
        <div className="stack-list">
          {metrics?.categoryBreakdown.map((item) => (
            <div key={item.category} className="stack-row">
              <span>{item.category}</span>
              <strong>{item.count}</strong>
            </div>
          )) ?? <p className="muted">Cargando...</p>}
        </div>
      </article>
    </section>
  )
}
