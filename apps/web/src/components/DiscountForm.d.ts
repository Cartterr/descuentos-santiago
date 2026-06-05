import type { DiscountFormState } from '../types';
type DiscountFormProps = {
    value: DiscountFormState;
    onChange: (next: DiscountFormState) => void;
    onSubmit: () => void;
    onReset: () => void;
    busy: boolean;
};
export declare function DiscountForm({ value, onChange, onSubmit, onReset, busy }: DiscountFormProps): import("react").JSX.Element;
export {};
