import { useEffect, useState } from 'react'
import { archiveDiscount, fetchDashboard, fetchDiscounts, publishDiscount, saveDiscount } from './api/client'
import { DiscountFilters } from './components/DiscountFilters'
import { DiscountForm } from './components/DiscountForm'
import { DiscountTable } from './components/DiscountTable'
import { HeroSection } from './components/HeroSection'
import { InsightsPanel } from './components/InsightsPanel'
import { MetricsStrip } from './components/MetricsStrip'
import type { DashboardMetrics, DiscountFormState, DiscountRecord } from './types'
import './styles.css'

const emptyForm = (): DiscountFormState => ({
  title: '',
  description: '',
  businessName: '',
  comuna: 'Providencia',
  category: 'Comida',
  percentageOff: 20,
  sourceUrl: '',
  tags: '',
  priority: 'medium',
  featured: false,
  startsAt: toDateInput(new Date()),
  expiresAt: toDateInput(new Date(Date.now() + 48 * 60 * 60 * 1000)),
  status: 'draft',
})

function App() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [discounts, setDiscounts] = useState<DiscountRecord[]>([])
  const [selectedDiscountId, setSelectedDiscountId] = useState<string>()
  const [form, setForm] = useState<DiscountFormState>(emptyForm)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string>()
  const [filters, setFilters] = useState({
    comuna: 'Todas',
    category: 'Todas',
    status: 'Todos',
    priority: 'Todas',
    search: '',
  })

  async function loadData() {
    try {
      const [dashboardResponse, discountsResponse] = await Promise.all([
        fetchDashboard(),
        fetchDiscounts({
          comuna: normalizeFilter(filters.comuna),
          category: normalizeFilter(filters.category),
          status: normalizeFilter(filters.status),
          priority: normalizeFilter(filters.priority),
          search: filters.search || undefined,
        }),
      ])

      setMetrics(dashboardResponse)
      setDiscounts(discountsResponse)
      setError(undefined)
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'No se pudo cargar la plataforma.')
    }
  }

  useEffect(() => {
    loadData()
  }, [filters.comuna, filters.category, filters.priority, filters.search, filters.status])

  const selectedDiscount = discounts.find((discount) => discount.id === selectedDiscountId)

  useEffect(() => {
    if (!selectedDiscount) return

    setForm({
      id: selectedDiscount.id,
      title: selectedDiscount.title,
      description: selectedDiscount.description,
      businessName: selectedDiscount.businessName,
      comuna: selectedDiscount.comuna,
      category: selectedDiscount.category,
      percentageOff: selectedDiscount.percentageOff,
      sourceUrl: selectedDiscount.sourceUrl ?? '',
      tags: selectedDiscount.tags.join(', '),
      priority: selectedDiscount.priority,
      featured: selectedDiscount.featured,
      startsAt: toDateInput(selectedDiscount.startsAt),
      expiresAt: toDateInput(selectedDiscount.expiresAt),
      status: selectedDiscount.status,
    })
  }, [selectedDiscount])

  async function handleSave() {
    setBusy(true)
    try {
      await saveDiscount({
        ...form,
        startsAt: new Date(form.startsAt).toISOString(),
        expiresAt: new Date(form.expiresAt).toISOString(),
      })
      setForm(emptyForm())
      setSelectedDiscountId(undefined)
      await loadData()
      setError(undefined)
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'No se pudo guardar el descuento.')
    } finally {
      setBusy(false)
    }
  }

  async function handlePublish(id: string) {
    try {
      await publishDiscount(id)
      await loadData()
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'No se pudo publicar el descuento.')
    }
  }

  async function handleArchive(id: string) {
    try {
      await archiveDiscount(id)
      await loadData()
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'No se pudo archivar el descuento.')
    }
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Cartterr OSS</p>
          <strong>Descuentos Santiago</strong>
        </div>
        <nav>
          <a href="#workspace">Workspace</a>
          <a href="#insights">Insights</a>
          <a href="https://github.com/Cartterr/descuentos-santiago" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </header>

      <HeroSection onPrimaryAction={() => document.getElementById('workspace')?.scrollIntoView()} />
      <MetricsStrip metrics={metrics} />

      {error ? <div className="error-banner">{error}</div> : null}

      <main id="workspace" className="workspace-grid">
        <div className="workspace-main">
          <DiscountFilters
            {...filters}
            onChange={(next) => setFilters((current) => ({ ...current, ...next }))}
          />
          <DiscountTable
            discounts={discounts}
            selectedId={selectedDiscountId}
            onSelect={(discount) => setSelectedDiscountId(discount.id)}
            onPublish={handlePublish}
            onArchive={handleArchive}
          />
        </div>

        <aside className="workspace-side">
          <DiscountForm
            value={form}
            onChange={setForm}
            onSubmit={handleSave}
            onReset={() => {
              setSelectedDiscountId(undefined)
              setForm(emptyForm())
            }}
            busy={busy}
          />
        </aside>
      </main>

      <section id="insights">
        <InsightsPanel metrics={metrics} />
      </section>
    </div>
  )
}

function normalizeFilter(value: string) {
  if (value === 'Todas' || value === 'Todos') {
    return undefined
  }

  return value
}

function toDateInput(value: Date | string) {
  const date = typeof value === 'string' ? new Date(value) : value
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
}

export default App
