import type { DiscountRecord } from '../types';
type DiscountTableProps = {
    discounts: DiscountRecord[];
    selectedId?: string;
    onSelect: (discount: DiscountRecord) => void;
    onPublish: (id: string) => void;
    onArchive: (id: string) => void;
};
export declare function DiscountTable({ discounts, selectedId, onSelect, onPublish, onArchive, }: DiscountTableProps): import("react").JSX.Element;
export {};
