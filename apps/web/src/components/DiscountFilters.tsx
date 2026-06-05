type DiscountFiltersProps = {
  comuna: string
  category: string
  status: string
  priority: string
  search: string
  onChange: (next: {
    comuna?: string
    category?: string
    status?: string
    priority?: string
    search?: string
  }) => void
}

const comunas = ['Todas', 'Providencia', 'Las Condes', 'Nunoa', 'Santiago Centro', 'La Florida']
const categories = ['Todas', 'Comida', 'Farmacia', 'Retail', 'Belleza', 'Servicios', 'Panorama']
const statuses = ['Todos', 'draft', 'published', 'archived']
const priorities = ['Todas', 'high', 'medium', 'low']

export function DiscountFilters(props: DiscountFiltersProps) {
  return (
    <section className="filters-panel">
      <div className="search-box">
        <label htmlFor="search">Buscar</label>
        <input
          id="search"
          value={props.search}
          onChange={(event) => props.onChange({ search: event.target.value })}
          placeholder="negocio, comuna, categoria"
        />
      </div>

      <div className="filter-grid">
        <SelectField
          label="Comuna"
          value={props.comuna}
          options={comunas}
          onChange={(value) => props.onChange({ comuna: value })}
        />
        <SelectField
          label="Categoria"
          value={props.category}
          options={categories}
          onChange={(value) => props.onChange({ category: value })}
        />
        <SelectField
          label="Estado"
          value={props.status}
          options={statuses}
          onChange={(value) => props.onChange({ status: value })}
        />
        <SelectField
          label="Prioridad"
          value={props.priority}
          options={priorities}
          onChange={(value) => props.onChange({ priority: value })}
        />
      </div>
    </section>
  )
}

type SelectFieldProps = {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}

function SelectField({ label, value, options, onChange }: SelectFieldProps) {
  return (
    <label className="field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}
