import type { DashboardMetrics, DiscountFormState, DiscountRecord } from '../types';
type ListFilters = {
    comuna?: string;
    category?: string;
    status?: string;
    priority?: string;
    search?: string;
};
export declare function fetchDashboard(): Promise<DashboardMetrics>;
export declare function fetchDiscounts(filters: ListFilters): Promise<DiscountRecord[]>;
export declare function saveDiscount(input: DiscountFormState): Promise<DiscountRecord>;
export declare function publishDiscount(id: string): Promise<DiscountRecord>;
export declare function archiveDiscount(id: string): Promise<DiscountRecord>;
export {};
