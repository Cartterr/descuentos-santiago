type DiscountFiltersProps = {
    comuna: string;
    category: string;
    status: string;
    priority: string;
    search: string;
    onChange: (next: {
        comuna?: string;
        category?: string;
        status?: string;
        priority?: string;
        search?: string;
    }) => void;
};
export declare function DiscountFilters(props: DiscountFiltersProps): import("react").JSX.Element;
export {};
