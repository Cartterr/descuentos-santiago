import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const comunas = ['Todas', 'Providencia', 'Las Condes', 'Nunoa', 'Santiago Centro', 'La Florida'];
const categories = ['Todas', 'Comida', 'Farmacia', 'Retail', 'Belleza', 'Servicios', 'Panorama'];
const statuses = ['Todos', 'draft', 'published', 'archived'];
const priorities = ['Todas', 'high', 'medium', 'low'];
export function DiscountFilters(props) {
    return (_jsxs("section", { className: "filters-panel", children: [_jsxs("div", { className: "search-box", children: [_jsx("label", { htmlFor: "search", children: "Buscar" }), _jsx("input", { id: "search", value: props.search, onChange: (event) => props.onChange({ search: event.target.value }), placeholder: "negocio, comuna, categoria" })] }), _jsxs("div", { className: "filter-grid", children: [_jsx(SelectField, { label: "Comuna", value: props.comuna, options: comunas, onChange: (value) => props.onChange({ comuna: value }) }), _jsx(SelectField, { label: "Categoria", value: props.category, options: categories, onChange: (value) => props.onChange({ category: value }) }), _jsx(SelectField, { label: "Estado", value: props.status, options: statuses, onChange: (value) => props.onChange({ status: value }) }), _jsx(SelectField, { label: "Prioridad", value: props.priority, options: priorities, onChange: (value) => props.onChange({ priority: value }) })] })] }));
}
function SelectField({ label, value, options, onChange }) {
    return (_jsxs("label", { className: "field", children: [_jsx("span", { children: label }), _jsx("select", { value: value, onChange: (event) => onChange(event.target.value), children: options.map((option) => (_jsx("option", { value: option, children: option }, option))) })] }));
}
//# sourceMappingURL=DiscountFilters.js.map