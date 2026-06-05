import type { DiscountRecord } from '../types'

type DiscountTableProps = {
  discounts: DiscountRecord[]
  selectedId?: string
  onSelect: (discount: DiscountRecord) => void
  onPublish: (id: string) => void
  onArchive: (id: string) => void
}

export function DiscountTable({
  discounts,
  selectedId,
  onSelect,
  onPublish,
  onArchive,
}: DiscountTableProps) {
  return (
    <section className="card">
      <div className="section-header">
        <div>
          <p className="eyebrow">Pipeline</p>
          <h2>Descuentos activos y borradores</h2>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Comuna</th>
              <th>Categoria</th>
              <th>Estado</th>
              <th>Prioridad</th>
              <th>%</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount) => (
              <tr
                key={discount.id}
                className={selectedId === discount.id ? 'is-selected' : undefined}
                onClick={() => onSelect(discount)}
              >
                <td>
                  <strong>{discount.title}</strong>
                  <span>{discount.businessName}</span>
                </td>
                <td>{discount.comuna}</td>
                <td>{discount.category}</td>
                <td>{discount.status}</td>
                <td>{discount.priority}</td>
                <td>{discount.percentageOff}%</td>
                <td>
                  <div className="table-actions">
                    {discount.status !== 'published' ? (
                      <button
                        type="button"
                        className="inline-action"
                        onClick={(event) => {
                          event.stopPropagation()
                          onPublish(discount.id)
                        }}
                      >
                        Publicar
                      </button>
                    ) : null}
                    {discount.status !== 'archived' ? (
                      <button
                        type="button"
                        className="inline-action inline-action-muted"
                        onClick={(event) => {
                          event.stopPropagation()
                          onArchive(discount.id)
                        }}
                      >
                        Archivar
                      </button>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
