import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function MetricsStrip({ metrics }) {
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
        ];
    return (_jsx("section", { className: "metrics-strip", children: items.map(([label, value]) => (_jsxs("article", { className: "metric-tile", children: [_jsx("strong", { children: value }), _jsx("span", { children: label })] }, label))) }));
}
//# sourceMappingURL=MetricsStrip.js.map