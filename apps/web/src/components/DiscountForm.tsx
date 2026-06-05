import type { DiscountFormState } from '../types'

type DiscountFormProps = {
  value: DiscountFormState
  onChange: (next: DiscountFormState) => void
  onSubmit: () => void
  onReset: () => void
  busy: boolean
}

const categories = ['Comida', 'Farmacia', 'Retail', 'Belleza', 'Servicios', 'Panorama'] as const
const priorities = ['high', 'medium', 'low'] as const
const statuses = ['draft', 'published', 'archived'] as const

export function DiscountForm({ value, onChange, onSubmit, onReset, busy }: DiscountFormProps) {
  const update = <K extends keyof DiscountFormState>(key: K, next: DiscountFormState[K]) => {
    onChange({ ...value, [key]: next })
  }

  return (
    <section className="card form-card">
      <div className="section-header">
        <div>
          <p className="eyebrow">Editor</p>
          <h2>{value.id ? 'Actualizar descuento' : 'Crear descuento'}</h2>
        </div>
      </div>

      <div className="form-grid">
        <Field label="Titulo">
          <input value={value.title} onChange={(event) => update('title', event.target.value)} />
        </Field>
        <Field label="Negocio">
          <input
            value={value.businessName}
            onChange={(event) => update('businessName', event.target.value)}
          />
        </Field>
        <Field label="Comuna">
          <input value={value.comuna} onChange={(event) => update('comuna', event.target.value)} />
        </Field>
        <Field label="Porcentaje">
          <input
            type="number"
            min={1}
            max={100}
            value={value.percentageOff}
            onChange={(event) => update('percentageOff', Number(event.target.value))}
          />
        </Field>
        <Field label="Categoria">
          <select value={value.category} onChange={(event) => update('category', event.target.value as DiscountFormState['category'])}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Prioridad">
          <select value={value.priority} onChange={(event) => update('priority', event.target.value as DiscountFormState['priority'])}>
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Estado">
          <select value={value.status} onChange={(event) => update('status', event.target.value as DiscountFormState['status'])}>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Destacado">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={value.featured}
              onChange={(event) => update('featured', event.target.checked)}
            />
            <span>Mostrar como featured</span>
          </label>
        </Field>
        <Field label="Inicio">
          <input
            type="datetime-local"
            value={value.startsAt}
            onChange={(event) => update('startsAt', event.target.value)}
          />
        </Field>
        <Field label="Vencimiento">
          <input
            type="datetime-local"
            value={value.expiresAt}
            onChange={(event) => update('expiresAt', event.target.value)}
          />
        </Field>
        <Field label="URL fuente">
          <input value={value.sourceUrl} onChange={(event) => update('sourceUrl', event.target.value)} />
        </Field>
        <Field label="Tags">
          <input value={value.tags} onChange={(event) => update('tags', event.target.value)} placeholder="flash, cafe, 2x1" />
        </Field>
        <Field label="Descripcion" fullWidth>
          <textarea
            rows={4}
            value={value.description}
            onChange={(event) => update('description', event.target.value)}
          />
        </Field>
      </div>

      <div className="form-actions">
        <button className="button button-primary" disabled={busy} onClick={onSubmit} type="button">
          {busy ? 'Guardando...' : value.id ? 'Guardar cambios' : 'Crear descuento'}
        </button>
        <button className="button button-secondary" onClick={onReset} type="button">
          Limpiar editor
        </button>
      </div>
    </section>
  )
}

type FieldProps = {
  label: string
  children: React.ReactNode
  fullWidth?: boolean
}

function Field({ label, children, fullWidth }: FieldProps) {
  return (
    <label className={fullWidth ? 'field field-full' : 'field'}>
      <span>{label}</span>
      {children}
    </label>
  )
}
