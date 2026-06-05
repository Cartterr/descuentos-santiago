type HeroSectionProps = {
  onPrimaryAction: () => void
}

export function HeroSection({ onPrimaryAction }: HeroSectionProps) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Descuentos Santiago</p>
        <h1>Gestiona descuentos por comuna, prioridad y fecha de vencimiento.</h1>
        <p className="lede">
          Una plataforma editorial-operativa para ordenar promociones en Santiago, publicar con
          ritmo y evitar que las mejores ofertas se pierdan por desorden.
        </p>
        <div className="hero-actions">
          <button className="button button-primary" onClick={onPrimaryAction} type="button">
            Crear descuento
          </button>
          <a className="button button-secondary" href="#workspace">
            Ver workspace
          </a>
        </div>
      </div>

      <div className="hero-panel">
        <div className="panel-header">
          <span>Command center</span>
          <strong>Hoy</strong>
        </div>
        <div className="metric-grid">
          <article>
            <span>Comunas activas</span>
            <strong>6</strong>
          </article>
          <article>
            <span>Bloques urgentes</span>
            <strong>18</strong>
          </article>
          <article>
            <span>Featured listos</span>
            <strong>9</strong>
          </article>
          <article>
            <span>Promedio off</span>
            <strong>34%</strong>
          </article>
        </div>
        <div className="mini-cards">
          <div>
            <span>Providencia</span>
            <strong>2x1 cafe + lunch</strong>
          </div>
          <div>
            <span>Las Condes</span>
            <strong>dermocosmetica flash</strong>
          </div>
          <div>
            <span>Nunoa</span>
            <strong>retail temporada</strong>
          </div>
        </div>
      </div>
    </section>
  )
}
