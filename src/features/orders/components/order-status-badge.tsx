import type { LucideIcon } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import type { TStatusVariant } from '@/shared/lib/utils/order-status.utils';

const VARIANT_CLASSES: Record<TStatusVariant, string> = {
    success: 'bg-green-100 text-green-700',
    info: 'bg-blue-100 text-blue-700',
    danger: 'bg-red-100 text-red-700',
    warning: 'bg-amber-100 text-amber-700',
    neutral: 'bg-gray-100 text-gray-700',
};

type OrderStatusBadgeProps = {
    label: string;
    variant: TStatusVariant;
    icon?: LucideIcon;
    className?: string;
};

export default function OrderStatusBadge({ label, variant, icon: Icon, className }: OrderStatusBadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium',
                VARIANT_CLASSES[variant],
                className,
            )}
        >
            {Icon && <Icon className="size-3.5" aria-hidden="true" />}
            {label}
        </span>
    );
}