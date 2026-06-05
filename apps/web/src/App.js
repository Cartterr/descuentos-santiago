import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { archiveDiscount, fetchDashboard, fetchDiscounts, publishDiscount, saveDiscount } from './api/client';
import { DiscountFilters } from './components/DiscountFilters';
import { DiscountForm } from './components/DiscountForm';
import { DiscountTable } from './components/DiscountTable';
import { HeroSection } from './components/HeroSection';
import { InsightsPanel } from './components/InsightsPanel';
import { MetricsStrip } from './components/MetricsStrip';
import './styles.css';
const emptyForm = () => ({
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
});
function App() {
    const [metrics, setMetrics] = useState(null);
    const [discounts, setDiscounts] = useState([]);
    const [selectedDiscountId, setSelectedDiscountId] = useState();
    const [form, setForm] = useState(emptyForm);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState();
    const [filters, setFilters] = useState({
        comuna: 'Todas',
        category: 'Todas',
        status: 'Todos',
        priority: 'Todas',
        search: '',
    });
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
            ]);
            setMetrics(dashboardResponse);
            setDiscounts(discountsResponse);
            setError(undefined);
        }
        catch (nextError) {
            setError(nextError instanceof Error ? nextError.message : 'No se pudo cargar la plataforma.');
        }
    }
    useEffect(() => {
        loadData();
    }, [filters.comuna, filters.category, filters.priority, filters.search, filters.status]);
    const selectedDiscount = discounts.find((discount) => discount.id === selectedDiscountId);
    useEffect(() => {
        if (!selectedDiscount)
            return;
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
        });
    }, [selectedDiscount]);
    async function handleSave() {
        setBusy(true);
        try {
            await saveDiscount({
                ...form,
                startsAt: new Date(form.startsAt).toISOString(),
                expiresAt: new Date(form.expiresAt).toISOString(),
            });
            setForm(emptyForm());
            setSelectedDiscountId(undefined);
            await loadData();
            setError(undefined);
        }
        catch (nextError) {
            setError(nextError instanceof Error ? nextError.message : 'No se pudo guardar el descuento.');
        }
        finally {
            setBusy(false);
        }
    }
    async function handlePublish(id) {
        try {
            await publishDiscount(id);
            await loadData();
        }
        catch (nextError) {
            setError(nextError instanceof Error ? nextError.message : 'No se pudo publicar el descuento.');
        }
    }
    async function handleArchive(id) {
        try {
            await archiveDiscount(id);
            await loadData();
        }
        catch (nextError) {
            setError(nextError instanceof Error ? nextError.message : 'No se pudo archivar el descuento.');
        }
    }
    return (_jsxs("div", { className: "page-shell", children: [_jsxs("header", { className: "topbar", children: [_jsxs("div", { children: [_jsx("p", { className: "eyebrow", children: "Cartterr OSS" }), _jsx("strong", { children: "Descuentos Santiago" })] }), _jsxs("nav", { children: [_jsx("a", { href: "#workspace", children: "Workspace" }), _jsx("a", { href: "#insights", children: "Insights" }), _jsx("a", { href: "https://github.com/Cartterr/descuentos-santiago", target: "_blank", rel: "noreferrer", children: "GitHub" })] })] }), _jsx(HeroSection, { onPrimaryAction: () => document.getElementById('workspace')?.scrollIntoView() }), _jsx(MetricsStrip, { metrics: metrics }), error ? _jsx("div", { className: "error-banner", children: error }) : null, _jsxs("main", { id: "workspace", className: "workspace-grid", children: [_jsxs("div", { className: "workspace-main", children: [_jsx(DiscountFilters, { ...filters, onChange: (next) => setFilters((current) => ({ ...current, ...next })) }), _jsx(DiscountTable, { discounts: discounts, selectedId: selectedDiscountId, onSelect: (discount) => setSelectedDiscountId(discount.id), onPublish: handlePublish, onArchive: handleArchive })] }), _jsx("aside", { className: "workspace-side", children: _jsx(DiscountForm, { value: form, onChange: setForm, onSubmit: handleSave, onReset: () => {
                                setSelectedDiscountId(undefined);
                                setForm(emptyForm());
                            }, busy: busy }) })] }), _jsx("section", { id: "insights", children: _jsx(InsightsPanel, { metrics: metrics }) })] }));
}
function normalizeFilter(value) {
    if (value === 'Todas' || value === 'Todos') {
        return undefined;
    }
    return value;
}
function toDateInput(value) {
    const date = typeof value === 'string' ? new Date(value) : value;
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}
export default App;
//# sourceMappingURL=App.js.map